-- Supabase Database Schema for MESTAR Orders
-- Run this SQL in your Supabase SQL Editor to create the orders table

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text UNIQUE NOT NULL,
  customer_email text,
  customer_name text,
  items jsonb DEFAULT '[]'::jsonb,
  amount_total integer,
  currency text DEFAULT 'usd',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'fulfilled', 'cancelled')),
  child_name text,
  child_age text,
  story_theme text,
  photo_urls jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index on session_id for faster lookups
CREATE INDEX IF NOT EXISTS orders_session_id_idx ON orders(session_id);

-- Create index on customer_email
CREATE INDEX IF NOT EXISTS orders_customer_email_idx ON orders(customer_email);

-- Create index on status
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (full access)
CREATE POLICY "Service role has full access to orders"
  ON orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to view their own orders
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (customer_email = auth.jwt() ->> 'email');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update updated_at on row update
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON orders TO service_role;
GRANT SELECT ON orders TO authenticated;

COMMENT ON TABLE orders IS 'Stores customer orders for personalized storybooks';
COMMENT ON COLUMN orders.session_id IS 'Stripe checkout session ID';
COMMENT ON COLUMN orders.items IS 'JSON array of line items from Stripe';
COMMENT ON COLUMN orders.amount_total IS 'Total amount in cents';
COMMENT ON COLUMN orders.status IS 'Order status: pending, paid, fulfilled, cancelled';
COMMENT ON COLUMN orders.photo_urls IS 'JSON array of uploaded photo URLs from S3';

-- ─── Migration: story generation columns ─────────────────────────────────────
-- Run this block if upgrading an existing database (safe to run multiple times).
ALTER TABLE orders ADD COLUMN IF NOT EXISTS story_content text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS pdf_url text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS dedication text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS gender text;

COMMENT ON COLUMN orders.story_content IS 'JSON string of generated story (title, chapters)';
COMMENT ON COLUMN orders.pdf_url IS 'Presigned or public S3 URL for the generated PDF storybook';
COMMENT ON COLUMN orders.dedication IS 'Personal dedication message from the purchaser';
COMMENT ON COLUMN orders.gender IS 'Child gender for pronoun selection (male/female/non-binary)';
