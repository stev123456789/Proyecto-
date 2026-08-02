import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import', 
          'if-function', 
          'global-builtin', 
          'function-units', 
          'color-functions', 
          'slash-div'
        ],
      },
    },
  },
})