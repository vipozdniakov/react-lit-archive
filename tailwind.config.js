/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb", // Light background (gray-50)
        header: "#f5f5f4", // Soft stone-paper color (stone-100)
        textMain: "#1f2937", // Main text color (gray-800)
        textSecondary: "#6b7280", // Secondary text color (gray-500)
        tagBg: "#dbeafe", // Tag background (blue-100)
        tagText: "#1d4ed8", // Tag text (blue-700)
        buttonPrimary: "#2563eb", // Primary button bg (blue-600)
        buttonPrimaryHover: "#1d4ed8", // On hover (blue-700)
        alertError: "#dc2626", // Red for error text (red-600)
        alertErrorHover: "#b91c1c", // Red hover
      },
      fontFamily: {
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
