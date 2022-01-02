const supabase = require("@supabase/supabase-js");

const supabaseConn = supabase.createClient(
  process.env.supabaseConnString,
  process.env.supabaseKey
);

module.exports = supabaseConn;
