import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// null until the env vars are set, so the site still works with the
// bundled local assets/reviews while Supabase isn't configured yet.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
