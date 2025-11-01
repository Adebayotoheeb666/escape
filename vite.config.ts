import { defineConfig, Plugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const coinGeckoApi = env.VITE_COINGECKO_API;

  return defineConfig({
    server: {
      host: "::",
      port: 8080,
      fs: {
        allow: [".", "./client", "./shared"],
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
      },
    },
    build: {
      outDir: "dist/spa",
    },
    plugins: [react(), expressPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
    define: {
      "process.env": { ...process.env, ...env },
      // You can also expose coinGeckoApi if needed:
      // "process.env.VITE_COINGECKO_API": JSON.stringify(coinGeckoApi),
    },
    // If you use coinGeckoApi in config, use the variable here
  });
};

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
