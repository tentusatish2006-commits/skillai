/*
# Skill Gap Analyzer — initial schema

1. New Tables
- `profiles` — extends auth.users with full name and target job role.
  - `id` (uuid, PK, references auth.users)
  - `full_name` (text)
  - `target_role` (text, the job the user is aiming for)
  - `updated_at` (timestamptz)
- `resumes` — stores uploaded resume text and AI-extracted skills analysis.
  - `id` (uuid, PK)
  - `user_id` (uuid, FK -> auth.users, defaults to auth.uid())
  - `raw_text` (text, the resume content)
  - `target_role` (text, role being compared against)
  - `extracted_skills` (jsonb, skills found in the resume)
  - `required_skills` (jsonb, skills required for the target role)
  - `missing_skills` (jsonb, skills the user needs to learn)
  - `match_percentage` (integer, 0-100)
  - `created_at` (timestamptz)
- `quiz_attempts` — records each quiz a user takes.
  - `id` (uuid, PK)
  - `user_id` (uuid, FK -> auth.users, defaults to auth.uid())
  - `skill_name` (text, the skill the quiz covers)
  - `score` (integer, correct answers)
  - `total` (integer, total questions)
  - `answers` (jsonb, per-question results)
  - `created_at` (timestamptz)
- `roadmap_progress` — tracks which skills the user has started/completed.
  - `id` (uuid, PK)
  - `user_id` (uuid, FK -> auth.users, defaults to auth.uid())
  - `skill_name` (text)
  - `status` (text: 'pending' | 'in_progress' | 'completed')
  - `updated_at` (timestamptz)

2. Security
- Enable RLS on all tables.
- Owner-scoped CRUD: each authenticated user can only access their own rows.
- All user_id columns default to auth.uid() so inserts omitting user_id succeed.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  target_role text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  raw_text text DEFAULT '',
  target_role text DEFAULT '',
  extracted_skills jsonb DEFAULT '[]'::jsonb,
  required_skills jsonb DEFAULT '[]'::jsonb,
  missing_skills jsonb DEFAULT '[]'::jsonb,
  match_percentage integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_resumes" ON resumes;
CREATE POLICY "select_own_resumes" ON resumes FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_resumes" ON resumes;
CREATE POLICY "insert_own_resumes" ON resumes FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_resumes" ON resumes;
CREATE POLICY "update_own_resumes" ON resumes FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_resumes" ON resumes;
CREATE POLICY "delete_own_resumes" ON resumes FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name text NOT NULL DEFAULT '',
  score integer DEFAULT 0,
  total integer DEFAULT 0,
  answers jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "select_own_quiz_attempts" ON quiz_attempts FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "insert_own_quiz_attempts" ON quiz_attempts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "delete_own_quiz_attempts" ON quiz_attempts FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS roadmap_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE roadmap_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_roadmap_progress" ON roadmap_progress;
CREATE POLICY "select_own_roadmap_progress" ON roadmap_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_roadmap_progress" ON roadmap_progress;
CREATE POLICY "insert_own_roadmap_progress" ON roadmap_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_roadmap_progress" ON roadmap_progress;
CREATE POLICY "update_own_roadmap_progress" ON roadmap_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_roadmap_progress" ON roadmap_progress;
CREATE POLICY "delete_own_roadmap_progress" ON roadmap_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
