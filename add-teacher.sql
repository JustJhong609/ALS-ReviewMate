-- Add Teacher Account Manually in Supabase
-- Run this in Supabase SQL Editor after a user registers

-- Step 1: Find the user ID by email
SELECT id, email FROM auth.users WHERE email = 'teacher@example.com';

-- Step 2: Update their role to 'teacher' (replace USER_ID with the ID from step 1)
UPDATE public.profiles 
SET role = 'teacher' 
WHERE id = 'USER_ID_HERE';

-- Step 3: Verify the change
SELECT id, email, role, full_name FROM public.profiles WHERE role = 'teacher';

-- EXAMPLE USAGE:
-- 1. Have the teacher register normally (they'll be created as 'learner')
-- 2. Find their ID: SELECT id FROM auth.users WHERE email = 'teacher@example.com';
-- 3. Run: UPDATE public.profiles SET role = 'teacher' WHERE id = 'abc-123-def';
-- 4. They can now log out and log back in as a teacher
