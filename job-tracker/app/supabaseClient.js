import { createClient } from "@supabase/supabase-js";

// Hårdkodad Supabase URL och API-nyckel
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Kontrollera att URL och API-nyckel är korrekt definierade
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or API key is missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
