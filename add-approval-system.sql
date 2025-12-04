-- Migration: Add Student Approval System
-- Run this in Supabase SQL Editor if you already ran supabase-schema.sql
-- IMPORTANT: Run each section separately if you get errors

-- Step 1: Add approval columns to profiles table
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'approved'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN approved BOOLEAN DEFAULT FALSE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'approved_by'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN approved_by UUID REFERENCES public.profiles(id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'approved_at'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Step 2: Approve all existing learners (grandfather them in)
UPDATE public.profiles 
SET approved = TRUE 
WHERE role = 'learner' AND (approved IS NULL OR approved = FALSE);

-- Step 3: Approve all teachers by default
UPDATE public.profiles 
SET approved = TRUE 
WHERE role = 'teacher';

-- Step 4: Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Teachers can update learner approval status" ON public.profiles;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can insert their own profile on signup" ON public.profiles;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Step 5: Create new policies
CREATE POLICY "Users can insert their own profile on signup"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Teachers can update learner approval status"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'teacher'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'teacher'
    ) AND role = 'learner'
  );

-- Done!
SELECT 'Approval system migration completed successfully!' AS message;
