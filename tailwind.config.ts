import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#111014", violet: "#8b5cf6", lilac: "#c4b5fd" }, boxShadow: { glow: "0 12px 45px rgba(139,92,246,.22)" } } },
  plugins: []
};
export default config;
