CREATE TABLE public.ai_access_state (model text PRIMARY KEY, status integer NOT NULL, message text NOT NULL, blocked_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.ai_access_state TO service_role;
ALTER TABLE public.ai_access_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Server manages AI access state" ON public.ai_access_state FOR ALL TO service_role USING (true) WITH CHECK (true);