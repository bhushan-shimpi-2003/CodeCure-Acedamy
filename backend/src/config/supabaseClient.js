const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Make sure env is loaded
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
// Critical: Always use Service Role Key for backend admin-level operations that bypass RLS
// Important: If using Service Role Key, keep it private and NEVER expose it to the frontend!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase Configuration Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
