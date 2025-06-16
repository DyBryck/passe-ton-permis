import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_supabaseUrl;
const supabaseKey = import.meta.env.VITE_supabaseKey;
export const supabase = createClient(supabaseUrl, supabaseKey);
