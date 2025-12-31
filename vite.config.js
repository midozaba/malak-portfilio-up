import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Set the base to your GitHub repo name so built assets use the correct path on GitHub Pages
  base: '/malak-portfilio-up/',
  plugins: [react()],
})