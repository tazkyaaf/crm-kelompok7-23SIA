import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nzhrprpfnierqlcrkuff.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56aHJwcnBmbmllcnFsY3JrdWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NTg3MjAsImV4cCI6MjA2NjIzNDcyMH0._T7bINQHu0PSdL-wqI--TPCyoiYNH4yFP9dVx7mO4NU'

export const supabase = createClient(supabaseUrl, supabaseKey)