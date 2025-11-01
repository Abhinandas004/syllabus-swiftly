import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing syllabus image with AI...');

    // Call AI to analyze the syllabus image
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert educational content analyzer specializing in creating comprehensive study materials. Your task is to:

1. EXTRACT ALL CONTENT from the syllabus image using OCR - don't miss anything
2. Identify the subject/course name and full course details
3. Extract ALL modules, chapters, topics, and sub-topics in complete detail
4. For EACH chapter/topic, provide:
   - Complete, detailed description (4-6 sentences explaining the concept thoroughly)
   - Definition if applicable
   - 6-8 comprehensive key points covering all aspects
   - Real-world practical applications with specific examples
   - Important formulas, theories, or concepts to remember
   - Common mistakes or misconceptions to avoid
   - Study tips specific to that topic
   - Connections to other topics when relevant

5. Identify and mark important/critical topics that need special attention

Return the data in this exact JSON structure:
{
  "subject": "string",
  "courseCode": "string (if available)",
  "modules": [
    {
      "name": "string",
      "description": "string (brief module overview)",
      "chapters": [
        {
          "name": "string",
          "description": "string (detailed 4-6 sentences)",
          "definition": "string (if applicable)",
          "keyPoints": ["string", "string", ...] (6-8 points),
          "applications": "string (detailed with specific examples)",
          "formulas": ["string"] (if applicable),
          "importantConcepts": ["string"] (key theories/concepts),
          "commonMistakes": ["string"] (what to avoid),
          "studyTips": ["string"] (specific tips for this topic),
          "relatedTopics": ["string"] (connections to other topics),
          "isImportant": boolean (true if critical topic)
        }
      ]
    }
  ]
}

Be thorough and comprehensive - extract EVERY detail from the syllabus without missing anything.`,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this syllabus image and extract all modules, chapters, and topics with detailed educational content.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits in Settings.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in AI response');
    }

    console.log('AI analysis complete');

    // Parse the JSON from the AI response
    let analysisData;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      analysisData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback: create structured data from text response
      analysisData = {
        subject: 'General Studies',
        modules: [
          {
            name: 'Extracted Topics',
            chapters: [
              {
                name: 'AI Analysis',
                description: content.substring(0, 200),
                keyPoints: ['See detailed content in PDF'],
                applications: 'Multiple topics identified from syllabus',
              },
            ],
          },
        ],
      };
    }

    return new Response(
      JSON.stringify({ success: true, analysis: analysisData }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in analyze-syllabus function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
