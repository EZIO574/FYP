import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Transform env into process.env pattern for compatibility
  const processEnv: Record<string, string> = {};
  Object.keys(env).forEach((key) => {
    if (key.startsWith("REACT_APP_") || key === "GOOGLE_API_KEY") {
      processEnv[`process.env.${key}`] = JSON.stringify(env[key]);
    }
  });

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
      strictPort: true,
    },
    plugins: [react()],
    define: {
      ...processEnv,
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
