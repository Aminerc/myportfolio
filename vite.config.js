import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/myportfolio/', // Assurez-vous que ce chemin correspond à ton repo GitHub Pages
  define: {
    'process.env': process.env
  }
});
