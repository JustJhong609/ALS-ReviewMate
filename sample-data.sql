-- Sample Quiz Data for ALS ReviewMate
-- Run this AFTER running supabase-schema.sql

-- Get subject IDs (these will vary, adjust based on your actual IDs)
-- You can find these in Supabase Table Editor → subjects table

-- Sample: English Quiz
INSERT INTO public.quizzes (subject_id, title, description, difficulty, passing_score) 
VALUES (
  (SELECT id FROM public.subjects WHERE name = 'English' LIMIT 1),
  'Basic Grammar Quiz',
  'Test your knowledge of basic English grammar',
  'easy',
  60
);

-- Get the quiz ID we just created
DO $$
DECLARE
  english_quiz_id UUID;
BEGIN
  SELECT id INTO english_quiz_id FROM public.quizzes WHERE title = 'Basic Grammar Quiz' LIMIT 1;

  -- Insert questions for English quiz
  INSERT INTO public.questions (quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_number) VALUES
  (english_quiz_id, 'Which sentence is grammatically correct?', 'multiple_choice', 
   '["She don''t like apples", "She doesn''t like apples", "She didn''t likes apples", "She not like apples"]',
   'She doesn''t like apples',
   'The correct form uses "doesn''t" (does not) with third person singular subjects.',
   1, 1),
  
  (english_quiz_id, 'What is the plural form of "child"?', 'multiple_choice',
   '["childs", "childrens", "children", "childes"]',
   'children',
   'Children is the irregular plural form of child.',
   1, 2),
  
  (english_quiz_id, 'Is this sentence correct: "He can speaks English."?', 'true_false',
   '["True", "False"]',
   'False',
   'After modal verbs like "can", we use the base form of the verb without "s". Correct: "He can speak English."',
   1, 3),
  
  (english_quiz_id, 'Choose the correct pronoun: "_____ is a teacher."', 'multiple_choice',
   '["Him", "His", "He", "Her"]',
   'He',
   'He is the subject pronoun used before a verb.',
   1, 4),
  
  (english_quiz_id, 'Which word is an adjective?', 'multiple_choice',
   '["quickly", "beautiful", "run", "happiness"]',
   'beautiful',
   'Beautiful is an adjective that describes nouns.',
   1, 5);
END $$;

-- Sample: Mathematics Quiz
INSERT INTO public.quizzes (subject_id, title, description, difficulty, passing_score)
VALUES (
  (SELECT id FROM public.subjects WHERE name = 'Mathematics' LIMIT 1),
  'Basic Arithmetic',
  'Test your skills in addition, subtraction, multiplication, and division',
  'easy',
  60
);

DO $$
DECLARE
  math_quiz_id UUID;
BEGIN
  SELECT id INTO math_quiz_id FROM public.quizzes WHERE title = 'Basic Arithmetic' LIMIT 1;

  INSERT INTO public.questions (quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_number) VALUES
  (math_quiz_id, 'What is 15 + 27?', 'multiple_choice',
   '["32", "42", "52", "62"]',
   '42',
   '15 + 27 = 42',
   1, 1),
  
  (math_quiz_id, 'What is 8 × 7?', 'multiple_choice',
   '["54", "56", "64", "72"]',
   '56',
   '8 × 7 = 56',
   1, 2),
  
  (math_quiz_id, 'Is 100 ÷ 4 = 25?', 'true_false',
   '["True", "False"]',
   'True',
   '100 divided by 4 equals 25',
   1, 3),
  
  (math_quiz_id, 'What is 50 - 23?', 'multiple_choice',
   '["27", "37", "17", "33"]',
   '27',
   '50 - 23 = 27',
   1, 4),
  
  (math_quiz_id, 'Which number is even?', 'multiple_choice',
   '["13", "15", "17", "18"]',
   '18',
   'Even numbers are divisible by 2. 18 ÷ 2 = 9',
   1, 5);
END $$;

-- Sample: Science Quiz
INSERT INTO public.quizzes (subject_id, title, description, difficulty, passing_score)
VALUES (
  (SELECT id FROM public.subjects WHERE name = 'Science' LIMIT 1),
  'Basic Science Concepts',
  'Test your understanding of basic scientific principles',
  'easy',
  60
);

DO $$
DECLARE
  science_quiz_id UUID;
BEGIN
  SELECT id INTO science_quiz_id FROM public.quizzes WHERE title = 'Basic Science Concepts' LIMIT 1;

  INSERT INTO public.questions (quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_number) VALUES
  (science_quiz_id, 'What is the main source of energy for Earth?', 'multiple_choice',
   '["Moon", "Stars", "Sun", "Wind"]',
   'Sun',
   'The Sun provides light and heat energy that sustains life on Earth.',
   1, 1),
  
  (science_quiz_id, 'How many legs does a spider have?', 'multiple_choice',
   '["6", "8", "10", "12"]',
   '8',
   'Spiders are arachnids and have 8 legs.',
   1, 2),
  
  (science_quiz_id, 'Water freezes at 0°C. True or False?', 'true_false',
   '["True", "False"]',
   'True',
   'Water freezes at 0 degrees Celsius (32°F).',
   1, 3),
  
  (science_quiz_id, 'What do plants need to make food?', 'multiple_choice',
   '["Sunlight, water, carbon dioxide", "Moonlight, soil, oxygen", "Stars, rain, nitrogen", "Wind, ice, helium"]',
   'Sunlight, water, carbon dioxide',
   'Plants use photosynthesis to make food using sunlight, water, and carbon dioxide.',
   1, 4),
  
  (science_quiz_id, 'Which planet is closest to the Sun?', 'multiple_choice',
   '["Venus", "Earth", "Mercury", "Mars"]',
   'Mercury',
   'Mercury is the closest planet to the Sun.',
   1, 5);
END $$;

-- Sample: Filipino Quiz
INSERT INTO public.quizzes (subject_id, title, description, difficulty, passing_score)
VALUES (
  (SELECT id FROM public.subjects WHERE name = 'Filipino' LIMIT 1),
  'Basic na Gramatika',
  'Subukin ang iyong kaalaman sa pangunahing gramatika ng Filipino',
  'easy',
  60
);

DO $$
DECLARE
  filipino_quiz_id UUID;
BEGIN
  SELECT id INTO filipino_quiz_id FROM public.quizzes WHERE title = 'Basic na Gramatika' LIMIT 1;

  INSERT INTO public.questions (quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_number) VALUES
  (filipino_quiz_id, 'Alin ang wastong pangungusap?', 'multiple_choice',
   '["Ako ay pumunta sa paaralan", "Pumunta ako sa paaralan", "Sa paaralan pumunta ako", "Lahat ng nabanggit"]',
   'Lahat ng nabanggit',
   'Lahat ng pagkakasunod-sunod ay gramatikally tama sa Filipino.',
   1, 1),
  
  (filipino_quiz_id, 'Ano ang panlapi sa salitang "kumain"?', 'multiple_choice',
   '["um", "in", "an", "ma"]',
   'um',
   'Ang "um" ay unlapi na ginagamit para sa aspektong naganap.',
   1, 2),
  
  (filipino_quiz_id, 'Ang "maganda" ay pang-uri. Tama o Mali?', 'true_false',
   '["Tama", "Mali"]',
   'Tama',
   'Ang "maganda" ay pang-uri na naglalarawan sa pangngalan.',
   1, 3),
  
  (filipino_quiz_id, 'Ano ang kahulugan ng salitang "tahanan"?', 'multiple_choice',
   '["Paaralan", "Bahay", "Ospital", "Palengke"]',
   'Bahay',
   'Tahanan ay nangangahulugang bahay o tirahan.',
   1, 4),
  
  (filipino_quiz_id, 'Ilan ang pantig sa salitang "kaibigan"?', 'multiple_choice',
   '["2", "3", "4", "5"]',
   '4',
   'kai-bi-ga-an = 4 na pantig',
   1, 5);
END $$;

-- Sample Topics for English
INSERT INTO public.topics (subject_id, title, content, order_number)
VALUES 
(
  (SELECT id FROM public.subjects WHERE name = 'English' LIMIT 1),
  'Parts of Speech',
  'Parts of speech are the building blocks of English grammar. There are 8 main parts: 1. Nouns - names of people, places, things; 2. Pronouns - words that replace nouns; 3. Verbs - action or state words; 4. Adjectives - describe nouns; 5. Adverbs - describe verbs, adjectives, or other adverbs; 6. Prepositions - show relationships; 7. Conjunctions - connect words or clauses; 8. Interjections - express emotion.',
  1
),
(
  (SELECT id FROM public.subjects WHERE name = 'English' LIMIT 1),
  'Subject-Verb Agreement',
  'Subject-verb agreement means that subjects and verbs must match in number (singular or plural). Rules: 1. Singular subjects take singular verbs (He runs); 2. Plural subjects take plural verbs (They run); 3. Use "doesn''t" with singular, "don''t" with plural; 4. Collective nouns usually take singular verbs.',
  2
);

-- Sample Topics for Mathematics
INSERT INTO public.topics (subject_id, title, content, order_number)
VALUES
(
  (SELECT id FROM public.subjects WHERE name = 'Mathematics' LIMIT 1),
  'Basic Operations',
  'The four basic operations in mathematics are: 1. Addition (+) - combining numbers; 2. Subtraction (-) - taking away; 3. Multiplication (×) - repeated addition; 4. Division (÷) - splitting into equal parts. Order of operations: PEMDAS (Parentheses, Exponents, Multiplication/Division, Addition/Subtraction).',
  1
),
(
  (SELECT id FROM public.subjects WHERE name = 'Mathematics' LIMIT 1),
  'Fractions and Decimals',
  'Fractions represent parts of a whole (1/2, 3/4). Decimals are another way to write fractions (0.5 = 1/2, 0.75 = 3/4). To convert: divide the numerator by the denominator. To add fractions: find common denominator first.',
  2
);

COMMIT;
