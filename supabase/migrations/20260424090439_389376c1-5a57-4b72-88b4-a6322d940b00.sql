-- Leads table for the landing page contact form
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  pain_point TEXT,
  language TEXT NOT NULL DEFAULT 'es',
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public inserts (anyone can submit the contact form)
CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) > 0 AND char_length(name) <= 120
    AND char_length(email) > 0 AND char_length(email) <= 255
    AND (pain_point IS NULL OR char_length(pain_point) <= 1000)
  );

-- No SELECT policy: leads are private. Owner reads them via Cloud dashboard / service role.

-- Helpful index
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);