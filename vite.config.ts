import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [
    "favicon.ico",
    "apple-touch-icon.png",
    "icon-512-maskable.png",
  ],
  manifest: {
    name: "Ultra Pocket",
    short_name: "Ultra Pocket",
    description: "Manage your Ultra UOS and Uniqs with ease.",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
    ],
    theme_color: "#312D36",
    background_color: "#312D36",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: { global: "window" },
});
