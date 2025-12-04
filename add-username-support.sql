-- Add Username Support for Students
-- Run this in Supabase SQL Editor

-- Step 1: Add username column (allow NULL for existing users)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS username TEXT;

-- Step 2: Create unique index that allows NULL values
DROP INDEX IF EXISTS idx_profiles_username;
CREATE UNIQUE INDEX idx_profiles_username ON public.profiles(username) WHERE username IS NOT NULL;

-- Step 3: Update the trigger to handle username with conflict handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Get the role from metadata, default to 'learner'
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'learner');
  
  -- Insert or update profile
  INSERT INTO public.profiles (id, email, role, full_name, approved, username)
  VALUES (
    NEW.id,
    NEW.email,
    user_role,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    -- Only teachers are auto-approved, learners need approval
    CASE 
      WHEN user_role = 'teacher' THEN true
      ELSE false
    END,
    -- Store username from metadata
    COALESCE(NEW.raw_user_meta_data->>'username', NULL)
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    username = EXCLUDED.username,
    role = EXCLUDED.role;
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Done!
SELECT 'Username support added successfully!' AS message;
