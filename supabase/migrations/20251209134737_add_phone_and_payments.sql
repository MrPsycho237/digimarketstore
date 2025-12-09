/*
  # Add phone number to profiles and create flutterwave payments table

  ## Changes
  
  ### 1. Profiles Table
  - Add `phone_number` (text, nullable) - User phone number for contact/payment info
  
  ### 2. New Table: flutterwave_payments
  - `id` (uuid, primary key)
  - `profile_id` (uuid, foreign key to profiles)
  - `amount` (numeric) - Payment amount
  - `currency` (text) - Currency code (e.g., USD, NGN)
  - `tx_ref` (text) - Flutterwave transaction reference (unique)
  - `status` (text) - Payment status (pending, completed, failed)
  - `created_at` (timestamptz) - Payment timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ## Security
  - Enable RLS on flutterwave_payments
  - Users can only view their own payment records
  - Admins can view all payment records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone_number text;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS flutterwave_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount numeric(10, 2) NOT NULL CHECK (amount > 0),
  currency text NOT NULL DEFAULT 'USD',
  tx_ref text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_flutterwave_payments_profile_id ON flutterwave_payments(profile_id);
CREATE INDEX IF NOT EXISTS idx_flutterwave_payments_tx_ref ON flutterwave_payments(tx_ref);
CREATE INDEX IF NOT EXISTS idx_flutterwave_payments_status ON flutterwave_payments(status);

ALTER TABLE flutterwave_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payment records"
  ON flutterwave_payments FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own payment records"
  ON flutterwave_payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Admins can view all payment records"
  ON flutterwave_payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update payment records"
  ON flutterwave_payments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE TRIGGER update_flutterwave_payments_updated_at
  BEFORE UPDATE ON flutterwave_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();