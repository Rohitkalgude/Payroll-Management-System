import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // default dev port
    open: true, // opens browser automatically
    proxy: {
      // only if you want to call localhost backend without changing URLs
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    "process.env": process.env, // makes process.env available in frontend
  },
});
