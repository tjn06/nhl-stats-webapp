import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/nhl-stats-webapp/',
  build: {
    target: 'es2015'
  },
  plugins: [vue()]
})
