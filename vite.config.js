import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_PROJECT_URL": JSON.stringify(process.env.VITE_PROJECT_URL),
    "process.env.VITE_SUPABASE_KEY": JSON.stringify(process.env.VITE_SUPABASE_KEY),
  },
})
