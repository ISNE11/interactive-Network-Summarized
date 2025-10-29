import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Use a dynamic base so GitHub Pages project sites work out of the box.
  // Set BASE_PATH in CI to `/<repo>/` for project pages, or leave `/` for user/org pages.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
