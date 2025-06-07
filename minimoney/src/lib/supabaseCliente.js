import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://opjvblglyrsjznlvoswv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wanZibGdseXJzanpubHZvc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDYyNjgsImV4cCI6MjA2MzY4MjI2OH0.M76gRIHCgItn-0MjE2ie2utFL2qIAA9fydovF7fe8oo'
export const supabase = createClient(supabaseUrl, supabaseKey)
