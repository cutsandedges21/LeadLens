import { NextResponse } from 'next/server';
import { analysisStore, leadStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { analysisId, email } = await req.json();

    if (!analysisId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let report = null;

    if (supabase) {
      const { data: analysisData, error: fetchError } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', analysisId)
        .single();
        
      if (fetchError || !analysisData) {
        // Fallback to memory if it wasn't in DB (e.g. Supabase was down during analysis)
        const memData = analysisStore.get(analysisId);
        if (!memData) {
          return NextResponse.json({ error: 'Analysis not found or expired' }, { status: 404 });
        }
        report = memData.report;
        
        await supabase.from('leads').insert({ email }); // Best effort
      } else {
        report = analysisData.report;

        // Update the analyses row with the email, and add to leads table
        await supabase.from('analyses').update({ email }).eq('id', analysisId);
        
        const { error: insertError } = await supabase.from('leads').insert({
          email,
          analysis_id: analysisId
        });
        
        if (insertError) {
          console.error('Failed to insert lead into Supabase:', insertError);
        }
        
        console.log(`Lead captured in Supabase: ${email} for URL: ${analysisData.url}`);
      }
    } else {
      // Fallback to memory
      const analysisData = analysisStore.get(analysisId);

      if (!analysisData) {
        return NextResponse.json({ error: 'Analysis not found or expired' }, { status: 404 });
      }

      report = analysisData.report;
      leadStore.add(email);
      console.log(`Lead captured in memory: ${email} for URL: ${analysisData.url}`);
    }

    // Return the full report
    return NextResponse.json({
      status: 'success',
      report
    });
  } catch (error) {
    console.error('Capture Lead API Error:', error);
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
