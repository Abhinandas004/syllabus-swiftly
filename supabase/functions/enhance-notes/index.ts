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

    const systemPrompt = `You are an expert academic content writer creating comprehensive, exam-ready study notes from syllabus content.

🎯 PRIMARY OBJECTIVE: Generate EXTENSIVE, DETAILED study notes (30-100 pages worth of content when rendered as PDF)

⚠️ CRITICAL INSTRUCTIONS - FOLLOW EXACTLY:

1. CONTENT VOLUME REQUIREMENTS:
   - Generate AT LEAST 15-25 chapters per module
   - Each chapter MUST contain 300-500 words of detailed content
   - NEVER generate just headings or brief summaries
   - Include comprehensive explanations for EVERY section
   - Think of this as writing a complete textbook chapter, not outline notes

2. STRUCTURE FOR EACH TOPIC/CHAPTER:
   
   A) MEANING (Must be 80-120 words):
      - Explain the basic concept in simple terms
      - Provide context and background
      - Include 2-3 relatable examples
      Example: "Cost accounting refers to the process of recording, classifying, analyzing, and allocating costs associated with production. It helps businesses understand where money is being spent and identify areas for cost reduction. Unlike financial accounting which focuses on external reporting, cost accounting is primarily used for internal management decision-making. For instance, a manufacturing company uses cost accounting to determine the cost per unit of production, helping managers set appropriate pricing strategies."

   B) DEFINITION (Must be 40-60 words):
      - Provide precise academic/textbook definition
      - Include key terminology
      - Cite the fundamental principle
      Example: "Cost accounting is a systematic method of accounting that aims to capture a company's total cost of production by assessing variable costs at each stage and fixed costs such as depreciation. It is a form of managerial accounting used to make informed business decisions by management."

   C) FEATURES (Must generate 10-15 features, EACH 60-80 words):
      - Title each feature clearly
      - Explain the feature in 3-4 complete sentences
      - Provide real-world examples
      - Explain practical implications
      Example format: "Feature 1: Detailed Cost Analysis - Cost accounting provides in-depth analysis of all expenses incurred during production, including direct materials, direct labor, and manufacturing overhead. This granular level of detail allows managers to identify cost drivers and implement targeted cost-reduction strategies. For example, if material costs are rising, management can negotiate better supplier contracts or find alternative materials without compromising quality."

   D) IMPORTANCE/SCOPE (Must generate 8-10 points, EACH 60-80 words):
      - Explain why this topic matters
      - Discuss real-world applications
      - Connect to broader concepts
      Example: "Importance 1: Informed Decision Making - Cost accounting provides crucial data that management needs to make strategic decisions about pricing, budgeting, and resource allocation. Without accurate cost information, businesses risk underpricing products leading to losses, or overpricing leading to loss of market share. Companies like Toyota have successfully used cost accounting principles to implement lean manufacturing and reduce waste."

   E) ADVANTAGES (Must generate 8-10 advantages, EACH 60-80 words):
      - State the advantage clearly
      - Explain how it benefits users/organizations
      - Provide concrete examples
      Example: "Advantage 1: Enhanced Profitability Analysis - Cost accounting enables businesses to analyze profitability at multiple levels including product, department, and customer segments. This detailed profitability insight helps identify which products generate the most profit and which ones should be discontinued or repriced. For instance, a retail chain might discover that while a product has high sales volume, its low margins make it less profitable than lower-volume items."

   F) DISADVANTAGES/LIMITATIONS (Must generate 5-8 points, EACH 60-80 words):
      - Identify genuine limitations
      - Explain challenges in implementation
      - Discuss when the concept might not work well
      Example: "Disadvantage 1: Time and Resource Intensive - Implementing a comprehensive cost accounting system requires significant investment in terms of time, money, and human resources. Small businesses may find the cost of implementation outweighs the benefits. Additionally, maintaining the system requires continuous data entry and analysis, which can strain limited resources in smaller organizations."

   G) APPLICATIONS (Must be 150-200 words):
      - Write a comprehensive paragraph
      - Include multiple real-world scenarios
      - Mention specific industries and use cases
      - Provide concrete examples
      Example: "Cost accounting finds extensive applications across various industries and business functions. In manufacturing, it is used to determine the cost of goods sold, optimize production processes, and set competitive pricing. Retail businesses use cost accounting to manage inventory costs, analyze vendor contracts, and determine markup percentages. Service industries apply cost accounting principles to project costing, resource allocation, and billing rate determination. Healthcare organizations utilize cost accounting to manage patient care costs, optimize resource utilization, and comply with regulatory requirements. Construction companies rely on job costing methods to bid on projects, track project expenses, and ensure profitability. In the hospitality sector, cost accounting helps in menu pricing, portion control, and identifying cost-saving opportunities. Government agencies use cost accounting for budget preparation, performance evaluation, and ensuring taxpayer money is spent efficiently. The versatility of cost accounting makes it an indispensable tool for any organization seeking to understand and control its costs."

   H) RECENT TRENDS/DEVELOPMENTS (Must generate 5-7 trends, EACH 60-80 words):
      - Discuss current developments in the field
      - Mention technological advances
      - Include recent research or methodologies
      Example: "Recent Trend 1: Integration with Artificial Intelligence - Modern cost accounting systems are increasingly incorporating AI and machine learning algorithms to predict future costs, identify anomalies, and provide real-time insights. Companies like IBM and SAP are developing AI-powered cost accounting solutions that can automatically categorize expenses, detect unusual spending patterns, and suggest cost optimization strategies, significantly reducing manual work and improving accuracy."

   I) COMPARISON TABLES (When applicable):
      - Create detailed comparison tables for related concepts
      - Include 5-8 comparison points
      - Provide clear explanations in each cell

3. WORD COUNT TARGETS (MANDATORY):
   - Description per chapter: 150-250 words
   - Definition: 40-60 words  
   - Each keyPoint: 60-80 words (minimum 10-15 keyPoints per chapter)
   - Applications: 150-200 words
   - Study tips: 40-50 words each (provide 5-6 tips per chapter)
   
4. QUALITY REQUIREMENTS:
   - Use academic but simple English
   - Write in complete, well-structured sentences
   - NO bullet points without detailed explanations
   - NO generic or vague statements
   - Include specific numbers, examples, company names where relevant
   - Ensure 100% accuracy - no hallucinations
   - Every statement must add value

5. JSON OUTPUT STRUCTURE:

{
  "subject": "Subject Name",
  "modules": [
    {
      "name": "Module 1 - [Detailed Module Name]",
      "description": "Comprehensive 100-150 word overview of what this entire module covers, its significance, and learning outcomes",
      "chapters": [
        {
          "name": "Chapter/Topic Name",
          "description": "[150-250 WORDS] Detailed explanation of the concept including meaning, context, background, and significance. Write multiple complete paragraphs with examples.",
          "definition": "[40-60 WORDS] Precise academic definition with key terminology",
          "keyPoints": [
            "[60-80 WORDS] Feature 1: Clear title - Detailed explanation in 3-4 complete sentences with specific examples and practical implications",
            "[60-80 WORDS] Feature 2: Clear title - Another thorough explanation with real-world context",
            "[Continue for 10-15 features]",
            "[60-80 WORDS] Importance 1: Why it matters - Detailed explanation with business/academic context",
            "[Continue for 8-10 importance points]",
            "[60-80 WORDS] Advantage 1: Benefit title - Comprehensive explanation with examples",
            "[Continue for 8-10 advantages]",
            "[60-80 WORDS] Disadvantage 1: Limitation title - Detailed explanation of challenges",
            "[Continue for 5-8 disadvantages]",
            "[60-80 WORDS] Recent Trend 1: Development title - Current advancement with examples",
            "[Continue for 5-7 trends]"
          ],
          "applications": "[150-200 WORDS] Comprehensive paragraph covering multiple industries, specific use cases, real-world examples, and practical scenarios. Include company names and concrete examples.",
          "formulas": ["Formula name: Formula = explanation of variables and usage"],
          "tables": [
            {
              "title": "Comparison: Concept A vs Concept B",
              "headers": ["Aspect", "Concept A", "Concept B"],
              "rows": [
                ["Difference 1", "Detailed explanation", "Detailed explanation"],
                ["Difference 2", "Detailed explanation", "Detailed explanation"]
              ]
            }
          ],
          "importantConcepts": [
            "Related Concept 1: Brief explanation in 30-40 words",
            "Related Concept 2: Brief explanation in 30-40 words"
          ],
          "studyTips": [
            "[40-50 WORDS] Study Tip 1: Practical advice with explanation of how and why it helps",
            "[40-50 WORDS] Study Tip 2: Memory technique with step-by-step approach",
            "[Continue for 5-6 study tips]"
          ],
          "previousYearQuestions": [
            "Question 1: [Full question text] - Approach: [40-50 words explaining how to solve]",
            "Question 2: [Full question text] - Approach: [40-50 words explaining solution strategy]"
          ],
          "relatedTopics": ["Related Topic 1", "Related Topic 2", "Related Topic 3"],
          "isImportant": true
        }
      ]
    }
  ]
}

6. EXAMPLES OF PROPER vs IMPROPER CONTENT:

❌ WRONG (TOO BRIEF):
"Feature 1: Important for decision making"

✅ CORRECT (DETAILED):
"Feature 1: Strategic Decision Support - Cost accounting provides management with detailed financial data that is essential for making strategic business decisions regarding pricing, budgeting, and resource allocation. By analyzing cost behavior patterns and profit margins across different products and departments, managers can identify underperforming areas and allocate resources more efficiently. For example, a manufacturing company might use cost accounting data to decide whether to outsource production or keep it in-house, comparing detailed cost breakdowns of both options."

❌ WRONG (VAGUE):
"Used in many industries for various purposes"

✅ CORRECT (SPECIFIC):
"Cost accounting is extensively used in manufacturing industries like automotive (Toyota, Ford), retail chains (Walmart, Target), healthcare systems (Mayo Clinic, Cleveland Clinic), construction companies (Bechtel, Turner Construction), hospitality businesses (Marriott, Hilton), and service sectors (consulting firms like Deloitte, McKinsey). Each industry adapts cost accounting principles to their specific needs, whether it's job costing in construction, process costing in manufacturing, or activity-based costing in services."

7. FINAL CHECKLIST BEFORE SUBMITTING:
   ✓ Each module has 15-25 detailed chapters
   ✓ Each chapter has 300-500 words of content
   ✓ Every keyPoint is 60-80 words with examples
   ✓ Description is 150-250 words
   ✓ Applications is 150-200 words
   ✓ At least 10-15 features per chapter
   ✓ At least 8-10 importance points per chapter
   ✓ At least 8-10 advantages per chapter
   ✓ At least 5-8 disadvantages per chapter
   ✓ At least 5-7 recent trends per chapter
   ✓ 5-6 study tips per chapter (40-50 words each)
   ✓ NO generic statements - everything is specific
   ✓ Real company names and examples included
   ✓ Total content equals 30-100 pages when rendered

REMEMBER: This is NOT an outline or summary. You are writing a COMPLETE, DETAILED study guide that students can use for comprehensive exam preparation. Every sentence must add educational value. Be thorough, specific, and academic.`;

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
          { role: "system", content: "STYLE: Use bullet points with short, clear sentences. Avoid introductions and summaries. Divide into Module 1, Module 2, etc. For each topic include: Meaning (2–3 lines), Definition, Features (each 2–3 lines), Importance/Scope, Advantages, Disadvantages, Differences (as bullets or table), Recent Trends. Use only the provided syllabus content (no extra topics). Target expansive coverage suitable for a 30–100 page PDF." },
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