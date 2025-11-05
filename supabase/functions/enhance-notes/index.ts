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

    const systemPrompt = `You are an academic content generator that converts syllabus text into detailed, comprehensive, student-friendly notes suitable for exam preparation.

CRITICAL REQUIREMENTS:
1. Generate EXTENSIVE, DETAILED content - NOT just headings or brief points
2. Each topic MUST have 4-8 paragraphs of detailed explanation
3. Write in simple, academic English with complete sentences
4. Include real academic information - NO generic placeholders or vague statements
5. Each feature/point must be explained in 2-3 full sentences minimum
6. Provide concrete examples, real-world applications, and practical explanations

CONTENT STRUCTURE FOR EACH TOPIC:
- Meaning: 2-3 sentences explaining what it is in simple terms
- Definition: Precise academic/textbook definition (1-2 sentences)
- Features: 5-8 features, each explained in 2-3 sentences with examples
- Importance/Scope: 4-6 points explaining why it matters, each in 2-3 sentences
- Advantages: 4-6 advantages with detailed explanations (2-3 sentences each)
- Disadvantages/Limitations: 3-5 disadvantages with explanations (2-3 sentences each)
- Applications/Examples: Real-world use cases with detailed descriptions
- Recent Trends/Developments: Current developments in the field (if applicable)
- Differences: Comparison tables where relevant (e.g., X vs Y)

FORMATTING RULES:
- Write in paragraph form with proper sentences, NOT just bullet points
- Each keyPoint should be a complete, detailed explanation (50-100 words)
- Applications should be a full paragraph (100-150 words)
- Description should be 150-250 words of comprehensive explanation
- Include specific examples, case studies, and practical scenarios

Output ONLY valid JSON matching this schema:
{
  "subject": "string",
  "modules": [
    {
      "name": "Module 1 - [Topic Name]",
      "description": "Comprehensive 2-3 sentence overview of the entire module",
      "chapters": [
        {
          "name": "Topic/Chapter name",
          "description": "Detailed 150-250 word explanation covering meaning, context, and background. Write multiple paragraphs explaining the concept thoroughly with examples.",
          "definition": "Precise academic definition in 1-2 complete sentences",
          "keyPoints": [
            "Feature 1: Detailed explanation in 2-3 complete sentences (50+ words). Include specific examples and practical implications.",
            "Feature 2: Another detailed explanation with examples and context (50+ words).",
            "Feature 3: Continue with thorough explanations for each point (50+ words).",
            "Importance 1: Explain why this matters in 2-3 sentences with real-world context.",
            "Importance 2: Another importance point with detailed explanation.",
            "Advantage 1: Detailed advantage with explanation and examples (50+ words).",
            "Advantage 2: Another advantage thoroughly explained.",
            "Disadvantage 1: Limitation explained with context and examples.",
            "Recent Trend 1: Current development explained in detail with examples."
          ],
          "applications": "Write a comprehensive paragraph (100-150 words) describing real-world applications, use cases, practical examples, and where this concept is applied. Include specific industries, scenarios, or case studies.",
          "formulas": ["formula = explanation (if applicable)"],
          "tables": [{"title": "Comparison: X vs Y", "headers": ["Aspect", "X", "Y"], "rows": [["Difference 1", "explanation", "explanation"]]}],
          "importantConcepts": ["Related concept 1 explained briefly", "Related concept 2 explained briefly"],
          "studyTips": ["Study tip 1: Practical advice with explanation", "Study tip 2: Memory technique or approach"],
          "previousYearQuestions": ["Sample exam question 1 with brief answer approach", "Sample question 2 with solution hint"],
          "relatedTopics": ["Related topic 1", "Related topic 2"],
          "isImportant": true
        }
      ]
    }
  ]
}

EXAMPLE OF PROPER DETAIL LEVEL:
Instead of: "Feature 1: Important aspect"
Write: "Feature 1: Comprehensive Security Framework - The system incorporates multiple layers of security including encryption, authentication, and authorization mechanisms. This ensures that sensitive data remains protected from unauthorized access while maintaining system performance. For example, banks use such frameworks to protect customer financial information across online and mobile platforms."

Generate AT LEAST 8-12 detailed keyPoints per topic, each being 50-100 words.`;

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