import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        content: "#1d2329",
        sidebar: "#16191c",
        primary: "#2749f1",
        wrapper: "#343c43",
        banner: "#2c343a",
        "banner-dark": "#1d2329",
      },
    },
  },
  plugins: [],
};
export default config;
