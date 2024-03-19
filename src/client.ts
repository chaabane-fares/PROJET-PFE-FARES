import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://zavdredegakmawytncmi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphdmRyZWRlZ2FrbWF3eXRuY21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1NDk2OTUsImV4cCI6MjAyNjEyNTY5NX0.BlW7U4BAaf7_uxW-63z-fS4sfiqNEJBXgLxkrfsRXY8'
)
export { supabase }
