import { createClient } from "https://esm.sh/@supabase/supabase-js@2"; 

export function createClientSupabase() {
    return createClient(  // 这里应该是 createClient 而不是 window.createClient
        'https://lysuqcspfpugxozttfek.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c3VxY3NwZnB1Z3hvenR0ZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMjM3NTYsImV4cCI6MjA0OTY5OTc1Nn0.LFafqHaLxS5r3yynw8EydY0VjGlVI7jwr7cr4ovg7P4'
    );
}
