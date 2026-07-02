import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseServiceKey && 
         supabaseUrl !== '' && supabaseServiceKey !== '';
};

// Create Supabase client
export const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Helper function to get orders table
export async function getOrder(sessionId) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (error) throw error;
  return data;
}

// Helper function to create order
export async function createOrder(orderData) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Helper function to update order
export async function updateOrder(sessionId, updates) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('session_id', sessionId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
