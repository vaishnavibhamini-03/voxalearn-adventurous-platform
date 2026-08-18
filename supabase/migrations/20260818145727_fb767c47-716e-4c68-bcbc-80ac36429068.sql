-- 1. World preference on profiles
CREATE TYPE public.game_world AS ENUM ('fantasy', 'sci_fi', 'mystery', 'real_world');

ALTER TABLE public.profiles ADD COLUMN selected_game_world public.game_world;

-- keep protect trigger semantics: users may update their own world, xp/email/id still locked

-- 2. Courses
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  is_available boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Course catalog is publicly readable" ON public.courses FOR SELECT TO anon, authenticated USING (true);

-- 3. Course modules
CREATE TABLE public.course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  module_number integer NOT NULL,
  title text NOT NULL,
  description text,
  is_final_assessment boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (course_id, module_number)
);
GRANT SELECT ON public.course_modules TO anon, authenticated;
GRANT ALL ON public.course_modules TO service_role;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Course modules are publicly readable" ON public.course_modules FOR SELECT TO anon, authenticated USING (true);

-- 4. Module topics
CREATE TABLE public.module_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  topic_name text NOT NULL,
  topic_order integer NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (module_id, topic_order)
);
GRANT SELECT ON public.module_topics TO anon, authenticated;
GRANT ALL ON public.module_topics TO service_role;
ALTER TABLE public.module_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Module topics are publicly readable" ON public.module_topics FOR SELECT TO anon, authenticated USING (true);

-- 5. Module levels
CREATE TABLE public.module_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  level_name text NOT NULL,
  level_order integer NOT NULL,
  purpose text,
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (module_id, level_order)
);
GRANT SELECT ON public.module_levels TO anon, authenticated;
GRANT ALL ON public.module_levels TO service_role;
ALTER TABLE public.module_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Module levels are publicly readable" ON public.module_levels FOR SELECT TO anon, authenticated USING (true);

-- 6. Seed Python course
INSERT INTO public.courses (name, category, slug, description, is_available)
VALUES ('Python', 'Programming', 'python', 'Explore Python through interactive learning challenges and progressive skill development.', true);

INSERT INTO public.course_modules (course_id, module_number, title, description, is_final_assessment)
SELECT c.id, m.n, m.title, m.descr, m.finalflag
FROM public.courses c,
(VALUES
  (1, 'Python Fundamentals', 'Meet Python, its syntax and how programs run.', false),
  (2, 'Variables, Data Types & Operators', 'Store values, choose types and combine them with operators.', false),
  (3, 'Conditional Statements', 'Make decisions in code with conditions and branching.', false),
  (4, 'Loops & Iteration', 'Repeat work efficiently with loops and iteration patterns.', false),
  (5, 'Functions & Collections', 'Structure code with functions and organise data in collections.', false),
  (6, 'Practical Python', 'Bring everything together through practical problem solving.', false),
  (7, 'Final Assessment', 'A single decisive challenge covering Modules 1 to 6.', true)
) AS m(n, title, descr, finalflag)
WHERE c.slug = 'python';

-- Topics
INSERT INTO public.module_topics (module_id, topic_name, topic_order)
SELECT cm.id, t.topic_name, t.topic_order
FROM public.course_modules cm
JOIN public.courses c ON c.id = cm.course_id AND c.slug = 'python'
JOIN (VALUES
  (1, 'Introduction to Python', 1),
  (1, 'Features of Python', 2),
  (1, 'Python syntax', 3),
  (1, 'Running Python programs', 4),
  (1, 'Basic input/output', 5),
  (2, 'Variables', 1),
  (2, 'Naming rules', 2),
  (2, 'Integer', 3),
  (2, 'Float', 4),
  (2, 'String', 5),
  (2, 'Boolean', 6),
  (2, 'Type conversion', 7),
  (2, 'Arithmetic operators', 8),
  (2, 'Comparison operators', 9),
  (2, 'Logical operators', 10),
  (3, 'if', 1),
  (3, 'if/else', 2),
  (3, 'elif', 3),
  (3, 'Nested conditions', 4),
  (3, 'Conditional expressions', 5),
  (3, 'Decision-making problems', 6),
  (4, 'for loop', 1),
  (4, 'while loop', 2),
  (4, 'range()', 3),
  (4, 'Nested loops', 4),
  (4, 'break', 5),
  (4, 'continue', 6),
  (4, 'Loop-based problem solving', 7),
  (5, 'Functions', 1),
  (5, 'Parameters', 2),
  (5, 'Arguments', 3),
  (5, 'Return values', 4),
  (5, 'Lists', 5),
  (5, 'Tuples', 6),
  (5, 'Dictionaries', 7),
  (5, 'Sets', 8),
  (6, 'Combining Python concepts', 1),
  (6, 'Problem solving', 2),
  (6, 'Debugging basics', 3),
  (6, 'Code tracing', 4),
  (6, 'Practical programming challenges', 5),
  (6, 'Small real-world programming tasks', 6),
  (7, 'Covers topics from Modules 1 to 6', 1)
) AS t(module_number, topic_name, topic_order) ON t.module_number = cm.module_number;

-- Levels for modules 1-6
INSERT INTO public.module_levels (module_id, level_name, level_order, purpose)
SELECT cm.id, l.level_name, l.level_order, l.purpose
FROM public.course_modules cm
JOIN public.courses c ON c.id = cm.course_id AND c.slug = 'python'
CROSS JOIN (VALUES
  ('Beginner', 1, 'Concept understanding'),
  ('Intermediate', 2, 'Application'),
  ('Advanced', 3, 'Problem solving')
) AS l(level_name, level_order, purpose)
WHERE cm.is_final_assessment = false;

-- Final assessment level for module 7
INSERT INTO public.module_levels (module_id, level_name, level_order, purpose, is_available)
SELECT cm.id, 'Final Assessment', 1, 'Mastery across every module', false
FROM public.course_modules cm
JOIN public.courses c ON c.id = cm.course_id AND c.slug = 'python'
WHERE cm.is_final_assessment = true;