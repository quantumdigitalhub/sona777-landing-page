CREATE TABLE public.download_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  placement text NOT NULL CHECK (placement IN ('hero','sticky_mobile','header','other')),
  page text NOT NULL DEFAULT '/' CHECK (char_length(page) <= 200),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.download_clicks TO anon, authenticated;
GRANT ALL ON public.download_clicks TO service_role;
ALTER TABLE public.download_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log a download click" ON public.download_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);