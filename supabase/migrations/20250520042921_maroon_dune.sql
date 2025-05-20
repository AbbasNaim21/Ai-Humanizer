/*
  # Initial schema setup for AI Text Humanizer

  1. New Tables
    - `profiles` - Stores user profile information including credits and plan details
      - `id` (uuid, primary key, references auth.users)
      - `created_at` (timestamptz, default now())
      - `email` (text, not null)
      - `credits` (integer, default 10)
      - `plan` (text, default 'free')
    
    - `humanized_texts` - Stores the original and humanized text for each conversion
      - `id` (uuid, primary key)
      - `created_at` (timestamptz, default now())
      - `user_id` (uuid, references profiles.id)
      - `original_text` (text, not null)
      - `humanized_text` (text, not null)

  2. Security
    - Enable RLS on both tables
    - Add policies to allow users to:
      - Select their own profile
      - Update their own profile (only certain fields)
      - Insert humanized texts (for themselves)
      - Select their own humanized texts
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  email TEXT NOT NULL,
  credits INTEGER DEFAULT 10,
  plan TEXT DEFAULT 'free'
);

-- Create humanized_texts table
CREATE TABLE IF NOT EXISTS humanized_texts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  original_text TEXT NOT NULL,
  humanized_text TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE humanized_texts ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for humanized_texts table
CREATE POLICY "Users can insert own texts"
  ON humanized_texts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own texts"
  ON humanized_texts
  FOR SELECT
  USING (auth.uid() = user_id);