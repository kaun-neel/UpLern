import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
<<<<<<< HEAD
  server: {
    host: true,
    port: 3001, 
    strictPort: true 
  }
=======
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
});