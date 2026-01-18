export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        primaryHover: "#1D4ED8",
        dark: "#0F172A",
        body: "#334155",
        muted: "#64748B",
        surface: "#F8FAFC",
        border: "#E2E8F0",
      },
    },
  },
};
