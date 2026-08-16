-- 1. Extend profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS xp integer NOT NULL DEFAULT 0;

-- Students must not change their own XP
CREATE OR REPLACE FUNCTION public.protect_profile_columns()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.xp IS DISTINCT FROM OLD.xp THEN
    NEW.xp := OLD.xp;
  END IF;
  IF NEW.email IS DISTINCT FROM OLD.email THEN
    NEW.email := OLD.email;
  END IF;
  IF NEW.id IS DISTINCT FROM OLD.id THEN
    NEW.id := OLD.id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_protect_columns ON public.profiles;
CREATE TRIGGER profiles_protect_columns
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_columns();

-- 2. student_progress
CREATE TABLE IF NOT EXISTS public.student_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  overall_progress integer NOT NULL DEFAULT 0,
  levels_completed integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.student_progress TO authenticated;
GRANT ALL ON public.student_progress TO service_role;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students read their own progress" ON public.student_progress;
CREATE POLICY "Students read their own progress"
ON public.student_progress FOR SELECT TO authenticated
USING (auth.uid() = student_id);

DROP TRIGGER IF EXISTS student_progress_set_updated_at ON public.student_progress;
CREATE TRIGGER student_progress_set_updated_at
BEFORE UPDATE ON public.student_progress
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. rewards
CREATE TABLE IF NOT EXISTS public.rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reward_name text NOT NULL,
  description text,
  earned_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.rewards TO authenticated;
GRANT ALL ON public.rewards TO service_role;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students read their own rewards" ON public.rewards;
CREATE POLICY "Students read their own rewards"
ON public.rewards FOR SELECT TO authenticated
USING (auth.uid() = student_id);

CREATE INDEX IF NOT EXISTS rewards_student_id_idx ON public.rewards(student_id);

-- 4. achievements
CREATE TABLE IF NOT EXISTS public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_name text NOT NULL,
  description text,
  earned_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.achievements TO authenticated;
GRANT ALL ON public.achievements TO service_role;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students read their own achievements" ON public.achievements;
CREATE POLICY "Students read their own achievements"
ON public.achievements FOR SELECT TO authenticated
USING (auth.uid() = student_id);

CREATE INDEX IF NOT EXISTS achievements_student_id_idx ON public.achievements(student_id);

-- 5. Auto-create a progress row for every profile
CREATE OR REPLACE FUNCTION public.init_student_progress()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.student_progress (student_id)
  VALUES (NEW.id)
  ON CONFLICT (student_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_init_progress ON public.profiles;
CREATE TRIGGER profiles_init_progress
AFTER INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.init_student_progress();

INSERT INTO public.student_progress (student_id)
SELECT p.id FROM public.profiles p
ON CONFLICT (student_id) DO NOTHING;

-- 6. Safe leaderboard: only public ranking fields
CREATE OR REPLACE FUNCTION public.get_leaderboard(_limit integer DEFAULT 50)
RETURNS TABLE (
  rank bigint,
  user_id uuid,
  username text,
  avatar_url text,
  xp integer,
  achievement_count bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    RANK() OVER (ORDER BY p.xp DESC, p.username ASC) AS rank,
    p.id AS user_id,
    p.username,
    p.avatar_url,
    p.xp,
    (SELECT count(*) FROM public.achievements a WHERE a.student_id = p.id) AS achievement_count
  FROM public.profiles p
  ORDER BY p.xp DESC, p.username ASC
  LIMIT LEAST(GREATEST(COALESCE(_limit, 50), 1), 100);
$$;

REVOKE ALL ON FUNCTION public.get_leaderboard(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(integer) TO authenticated;