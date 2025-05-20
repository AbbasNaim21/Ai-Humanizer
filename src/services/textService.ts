import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';


export async function humanizeText(userId: string, originalText: string): Promise<string | null> {
  try {
    // Check credits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;
    if (profile.credits <= 0) {
      toast.error('You have no credits left. Please upgrade your plan.');
      return null;
    }

    const apiKey = import.meta.env.VITE_UNDETECTABLE_API_KEY;

    // Step 1: Submit to Undetectable
    const submitResponse = await fetch('https://humanize.undetectable.ai/submit', {
      method: 'POST',
      headers: {
        'apikey': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: originalText,
        readability: 'High School',
        purpose: 'General Writing',
        strength: 'More Human',
        model: 'v11',
      }),
    });

    const submitData = await submitResponse.json();
    const documentId = submitData.id;

    if (!documentId) {
      throw new Error('No document ID returned from Undetectable API.');
    }

    // Step 2: Poll the /document endpoint every 5 seconds
    let humanizedText: string | null = null;
    for (let attempt = 0; attempt < 6; attempt++) {
      await new Promise((res) => setTimeout(res, 10000)); // wait 5 seconds

      const statusResponse = await fetch(`https://humanize.undetectable.ai/document`, {
        method: 'POST',
        headers: {
          'apikey': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: documentId }),
      });

      const statusData = await statusResponse.json();
      if (statusData.status === 'done' && statusData.output) {
        humanizedText = statusData.output;
        break;
      }
    }

    if (!humanizedText) {
      throw new Error('Humanized text not ready. Please try again later.');
    }

    // Step 3: Save to Supabase
    const { error: insertError } = await supabase
      .from('humanized_texts')
      .insert([
        {
          user_id: userId,
          original_text: originalText,
          humanized_text: humanizedText,
        },
      ]);
    if (insertError) throw insertError;

    // Step 4: Decrease user credits
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ credits: profile.credits - 1 })
      .eq('id', userId);
    if (updateError) throw updateError;

    return humanizedText;
  } catch (error: any) {
    console.error('❌ Error humanizing text:', error.message);
    toast.error('Failed to humanize text. Please try again.');
    return null;
  }
}


export async function getUserHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from('humanized_texts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    console.error('Error fetching user history:', error.message);
    toast.error('Failed to load your history.');
    return [];
  }
}

export async function upgradeUserPlan(userId: string, plan: string, credits: number) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        plan: plan,
        credits: credits
      })
      .eq('id', userId);

    if (error) throw error;
    
    toast.success(`Successfully upgraded to ${plan} plan!`);
    return true;
  } catch (error: any) {
    console.error('Error upgrading plan:', error.message);
    toast.error('Failed to upgrade plan. Please try again.');
    return false;
  }
}