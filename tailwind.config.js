// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        jetbrains: ['"JetBrains Mono"', "monospace"],
        poppins: ["SF Pro", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
