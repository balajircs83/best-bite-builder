import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { restaurantName, menuType } = await req.json();

    const prompt = `Generate 5-8 realistic dishes for ${restaurantName} restaurant's ${menuType} menu. For each dish, provide:
    - A realistic dish name
    - A detailed, appetizing description (2-3 sentences)
    - An average rating between 3.5 and 5.0 (realistic distribution)
    - Number of reviews (between 15-120)
    - A brief review summary highlighting what customers like about the dish

    Return the response as a JSON array with this exact structure:
    [
      {
        "id": "unique_id",
        "name": "Dish Name",
        "description": "Detailed description of the dish",
        "averageRating": 4.2,
        "reviewCount": 87,
        "reviewSummary": "Summary of customer reviews"
      }
    ]

    Make the dishes authentic and appropriate for the restaurant name and menu type. Ensure variety in cuisines, ratings, and review counts.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that generates realistic restaurant menu recommendations. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    // Parse the JSON response from OpenAI
    let dishes;
    try {
      dishes = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', generatedText);
      throw new Error('Invalid JSON response from AI');
    }

    return new Response(JSON.stringify({ dishes }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-menu-recommendations function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});