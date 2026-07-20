import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite" // <-- Fixed spelling here

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // <-- Fixed spelling here
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})