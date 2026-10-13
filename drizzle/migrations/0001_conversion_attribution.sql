CREATE TABLE public.apk_download_attempts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 click_id uuid REFERENCES public.download_clicks(id),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.apk_download_attempts TO anon, authenticated;
GRANT ALL ON public.apk_download_attempts TO service_role;
ALTER TABLE public.apk_download_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can record download attempts" ON public.apk_download_attempts FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE INDEX apk_attempts_click_idx ON public.apk_download_attempts(click_id);
CREATE TABLE public.app_conversion_events (
 event_id uuid PRIMARY KEY,
 event_type text NOT NULL CHECK (event_type IN ('first_open', 'registration')),
 installation_id uuid NOT NULL,
 click_id uuid REFERENCES public.download_clicks(id),
 registration_key text,
 occurred_at timestamptz NOT NULL,
 received_at timestamptz NOT NULL DEFAULT now(),
 CHECK ((event_type = 'first_open' AND registration_key IS NULL) OR (event_type = 'registration' AND registration_key IS NOT NULL))
);
GRANT ALL ON public.app_conversion_events TO service_role;
ALTER TABLE public.app_conversion_events ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX app_first_open_once ON public.app_conversion_events(installation_id) WHERE event_type = 'first_open';
CREATE UNIQUE INDEX app_registration_once ON public.app_conversion_events(registration_key) WHERE event_type = 'registration';
CREATE INDEX app_conversions_click_idx ON public.app_conversion_events(click_id);
CREATE VIEW public.conversion_placement_report WITH (security_invoker = true) AS
SELECT c.placement,
 count(*) AS clicks,
 count(*) FILTER (WHERE EXISTS (SELECT 1 FROM public.apk_download_attempts d WHERE d.click_id = c.id)) AS clicks_with_download_attempt,
 count(*) FILTER (WHERE EXISTS (SELECT 1 FROM public.app_conversion_events e WHERE e.click_id = c.id AND e.event_type = 'first_open')) AS clicks_with_first_open,
 count(*) FILTER (WHERE EXISTS (SELECT 1 FROM public.app_conversion_events e WHERE e.click_id = c.id AND e.event_type = 'registration')) AS clicks_with_registration,
 round(100.0 * count(*) FILTER (WHERE EXISTS (SELECT 1 FROM public.app_conversion_events e WHERE e.click_id = c.id AND e.event_type = 'first_open')) / nullif(count(*), 0), 2) AS click_to_first_open_pct,
 round(100.0 * count(*) FILTER (WHERE EXISTS (SELECT 1 FROM public.app_conversion_events e WHERE e.click_id = c.id AND e.event_type = 'registration')) / nullif(count(*), 0), 2) AS click_to_registration_pct
FROM public.download_clicks c GROUP BY c.placement;
REVOKE ALL ON public.conversion_placement_report FROM anon, authenticated;
GRANT SELECT ON public.conversion_placement_report TO service_role;