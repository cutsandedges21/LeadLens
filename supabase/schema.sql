-- Supabase Schema for LeadLens MVP

-- Table to store analysis reports
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  platform TEXT NOT NULL,
  report JSONB NOT NULL,
  email TEXT, -- This gets updated when the lead is captured
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index for faster lookups when capturing lead
CREATE INDEX idx_analyses_id ON analyses(id);

-- Optional Table for leads if you want them separated
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  analysis_id UUID REFERENCES analyses(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Table for users who opt into automated marketing emails
CREATE TABLE marketing_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  opted_in_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Set Row Level Security (RLS) policies
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_emails ENABLE ROW LEVEL SECURITY;

-- Allow public inserts and reads for MVP (In production, restrict to authenticated service role / API)
CREATE POLICY "Allow public insert on analyses" ON analyses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on analyses" ON analyses FOR SELECT USING (true);
CREATE POLICY "Allow public update on analyses" ON analyses FOR UPDATE USING (true);

CREATE POLICY "Allow public insert on leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on marketing_emails" ON marketing_emails FOR INSERT WITH CHECK (true);
