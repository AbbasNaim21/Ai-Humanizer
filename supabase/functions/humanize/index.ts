import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const UNDETECTABLE_API_URL = 'https://humanize.undetectable.ai/submit';
const API_KEY = 'dd410c04-f157-4f4c-9e41-b7d125f2b339';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { content } = await req.json();

    if (!content || content.length < 50) {
      return new Response(
        JSON.stringify({ error: 'Text must be at least 50 characters long' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    const response = await fetch(UNDETECTABLE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY,
      },
      body: JSON.stringify({
        content,
        readability: 'High School',
        purpose: 'General Writing',
        strength: 'More Human',
        model: 'v11',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to call Undetectable API');
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to humanize text' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});