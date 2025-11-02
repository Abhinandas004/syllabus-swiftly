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
    const { imageData } = await req.json();
    
    if (!imageData) {
      return new Response(
        JSON.stringify({ error: "Image data is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const OCR_API_KEY = Deno.env.get("OCR_SPACE_API_KEY");
    if (!OCR_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OCR API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const formData = new FormData();
    formData.append("base64Image", imageData);
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");

    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      headers: {
        apikey: OCR_API_KEY,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || data.IsErroredOnProcessing) {
      console.error("OCR API error:", data);
      return new Response(
        JSON.stringify({ error: "OCR processing failed", details: data }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const extractedText = data.ParsedResults?.[0]?.ParsedText || "";

    return new Response(
      JSON.stringify({ success: true, text: extractedText }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ocr-extract:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
