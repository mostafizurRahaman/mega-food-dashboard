/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   daisyui: {
      themes: ["light"],
   },
   theme: {
      extend: {
         colors: {
            primary: "#0C2556",
            secodary: "#ffffff",
            accent: "#0084B4",
            warn: "#0C2556",
            info: "#6B7280",
         },
      },
   },
   plugins: [require("daisyui")],
};
