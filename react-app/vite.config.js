import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo is served at https://hassanahmed-15.github.io/13A-LAW-CHAMBERS/
export default defineConfig({
  plugins: [react()],
  base: '/13A-LAW-CHAMBERS/',
})
