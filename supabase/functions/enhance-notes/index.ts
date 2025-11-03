import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { subject, topics, text } = body ?? {} as { subject?: string; topics?: string[]; text?: string };

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userPrompt = text
      ? `Create enriched, exam-ready notes from the following syllabus text. Keep accuracy high, no hallucinations.\n\nSubject: ${subject ?? "Unknown"}\n\nSyllabus text:\n${text}`
      : `Create enriched, exam-ready notes for the subject using these topics. Keep accuracy high, no hallucinations.\n\nSubject: ${subject ?? "General Studies"}\n\nTopics:\n- ${(topics ?? []).join("\n- ")}`;

    const systemPrompt = `You are an expert educator creating comprehensive, exam-ready study notes. Your notes must be 100% accurate based on standard academic knowledge.

CRITICAL RULES:
- Create DETAILED, CONTENT-RICH notes with real academic information
- Include TABLES where appropriate (comparison tables, concept tables, etc.)
- Add PREVIOUS YEAR QUESTION examples for each major topic
- Include practical TIPS and IMPORTANT points
- Use REAL formulas, definitions, and concepts - NO generic placeholders
- Structure content for maximum exam preparation value

Output ONLY valid JSON matching this schema:
{
  "subject": "string",
  "modules": [
    {
      "name": "Module/Unit name",
      "description": "2-3 sentence overview",
      "chapters": [
        {
          "name": "Chapter/Topic name",
          "description": "Detailed 6-8 sentence explanation with real content",
          "definition": "Precise academic definition (required)",
          "keyPoints": ["8-12 specific, detailed points with real information"],
          "applications": "Real-world applications with concrete examples and use cases",
          "formulas": ["All relevant formulas with notation explained"],
          "tables": [{"title": "table name", "headers": ["col1", "col2"], "rows": [["data1", "data2"]]}],
          "importantConcepts": ["Critical concepts that appear in exams"],
          "commonMistakes": ["Specific mistakes students make with explanations"],
          "studyTips": ["Practical, actionable study tips for this topic"],
          "previousYearQuestions": ["2-4 sample exam questions with brief answer hints"],
          "relatedTopics": ["Connected topics for comprehensive understanding"],
          "isImportant": boolean (true for high-weightage exam topics)
        }
      ]
    }
  ]
}`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("enhance-notes AI error:", aiResp.status, t);
      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add credits to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const content = data.choices?.[0]?.message?.content as string | undefined;
    if (!content) throw new Error("No AI content returned");

    let jsonObj: any;
    try {
      const match = content.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonStr = match ? match[1] : content;
      jsonObj = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse AI JSON:", e);
      return new Response(JSON.stringify({ error: "Failed to parse AI output" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: true, subject: jsonObj.subject, modules: jsonObj.modules }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("enhance-notes error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});