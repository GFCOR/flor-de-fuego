import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

// Cabeceras globales ("/*") de public/_headers, para que `npm run preview`
// sirva lo mismo que Cloudflare Pages y los errores de CSP salgan en local.
function productionHeaders() {
  const headers: Record<string, string> = {};
  let inGlobalBlock = false;
  for (const line of fs.readFileSync("public/_headers", "utf8").split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      inGlobalBlock = line.trim() === "/*";
      continue;
    }
    if (!inGlobalBlock) continue;
    const i = line.indexOf(":");
    headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  // HSTS en localhost hace que el navegador fuerce https para ese host.
  delete headers["Strict-Transport-Security"];
  return headers;
}

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
  preview: {
    headers: productionHeaders(),
  },
});
