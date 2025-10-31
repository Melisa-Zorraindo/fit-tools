import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  exports: true,
  format: ["commonjs", "esm", "iife"],
  platform: 'neutral'
})
