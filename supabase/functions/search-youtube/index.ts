import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper: simple language detection using unicode ranges + keywords
function detectLang(text: string): 'ml' | 'hi' | 'en' | null {
  if (!text) return null;
  const t = text.toLowerCase();
  if (/[\u0D00-\u0D7F]/.test(text) || t.includes('malayalam') || t.includes('മലയാളം')) return 'ml';
  if (/[\u0900-\u097F]/.test(text) || t.includes('hindi') || t.includes('हिंदी')) return 'hi';
  // Default to English if mostly latin
  if (/^[\p{L}\p{N}\p{P}\p{Zs}]*$/u.test(text)) return 'en';
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, maxResults = 8 } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query parameter is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY");
    if (!YOUTUBE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "YouTube API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const mkUrl = (q: string, lang: 'en'|'ml'|'hi') =>
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&order=relevance&safeSearch=moderate&regionCode=IN&relevanceLanguage=${lang}&maxResults=${Math.min(10, maxResults)}` +
      `&key=${YOUTUBE_API_KEY}`;

    // Build 3 language-focused queries and fetch in parallel
    const queries = [
      { q: `${query} Malayalam`, lang: 'ml' as const },
      { q: `${query} English`, lang: 'en' as const },
      { q: `${query} Hindi`, lang: 'hi' as const },
    ];

    const responses = await Promise.all(queries.map(({ q, lang }) => fetch(mkUrl(q, lang))));
    const payloads = await Promise.all(responses.map((r) => r.json()));

    // Merge and normalize
    const allItems: any[] = [];
    for (const data of payloads) {
      if (!data?.items) continue;
      allItems.push(...data.items);
    }

    const map = new Map<string, any>();
    for (const item of allItems) {
      const id = item?.id?.videoId;
      const title: string = item?.snippet?.title || '';
      const description: string = item?.snippet?.description || '';
      if (!id) continue;

      const lang = detectLang(`${title} ${description}`);
      if (!lang) continue; // keep only ml/en/hi

      // Deduplicate keeping the first occurrence
      if (!map.has(id)) {
        map.set(id, {
          id,
          title,
          description,
          thumbnail: item?.snippet?.thumbnails?.medium?.url || item?.snippet?.thumbnails?.default?.url,
          url: `https://www.youtube.com/watch?v=${id}`,
          lang,
        });
      }
    }

    // Sort: Malayalam first, then English, then Hindi
    const priority: Record<string, number> = { ml: 0, en: 1, hi: 2 };
    const videos = Array.from(map.values())
      .sort((a, b) => (priority[a.lang] ?? 3) - (priority[b.lang] ?? 3))
      .slice(0, maxResults)
      .map(({ lang, ...v }) => v); // drop lang from response

    return new Response(
      JSON.stringify({ success: true, videos }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in search-youtube:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
