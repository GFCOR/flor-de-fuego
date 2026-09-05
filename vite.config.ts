import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // ponytail: abre a cualquier host para exponer el dev server por
    // túneles (localtunnel/ngrok) cuyo subdominio cambia en cada corrida.
    allowedHosts: true,
  },
});
