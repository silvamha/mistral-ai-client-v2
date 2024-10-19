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


// import { defineConfig } from 'vite';
// import dotenv from 'dotenv';

// dotenv.config();

// export default defineConfig({
//   server: {
//     open: true, // Opens the browser when running the server
//   },
// });
