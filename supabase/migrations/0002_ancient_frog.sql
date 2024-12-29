/*
  # Create mood entries table

  1. New Tables
    - `mood_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `mood` (text)
      - `result_type` (text)
      - `guidance` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `mood_entries` table
    - Add policies for users to:
      - Read their own entries
      - Create new entries
*/

CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  mood text NOT NULL,
  result_type text NOT NULL,
  guidance text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own mood entries"
  ON mood_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own mood entries"
  ON mood_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX mood_entries_user_id_idx ON mood_entries(user_id);
CREATE INDEX mood_entries_created_at_idx ON mood_entries(created_at);