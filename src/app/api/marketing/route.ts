import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, agreed } = await req.json();

    if (!email || agreed === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (agreed && supabase) {
      const { error } = await supabase.from('marketing_emails').upsert({
        email,
        opted_in_at: new Date().toISOString()
      }, { onConflict: 'email' });
      
      if (error) {
        console.error('Failed to insert into marketing_emails:', error);
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Marketing API Error:', error);
    return NextResponse.json({ error: 'Failed to update marketing preferences' }, { status: 500 });
  }
}
