import { createClient } from "@supabase/supabase-js";

const URL = "https://pcwdihvfvoezccxdpwhd.supabase.co";
const API_KEY = "sb_publishable_6-swWJTe1bszqEb2amODiQ_dF6cE2WE";

export const supabase = createClient(URL, API_KEY);