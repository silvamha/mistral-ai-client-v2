import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export the Vite configuration
export default defineConfig({
  server: {
    open: true, // Opens the browser when running the server
  },
  define: {
    'process.env': process.env,
  },
});
