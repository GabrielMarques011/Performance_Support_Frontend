import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hxrydkrvfvyxzsjwhylz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cnlka3J2ZnZ5eHpzandoeWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMDc3NjAsImV4cCI6MjA3Mzg4Mzc2MH0.J8JD3inQVvU_T0eGgryWq5H0KJOiBQfmTua1FvmNjsc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
