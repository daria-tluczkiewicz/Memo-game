import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Memo-game",
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})
