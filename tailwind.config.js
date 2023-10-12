/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   daisyui: {
      themes: ["light"],
   },
   theme: {
      extend: {
         colors: {
            primary: "#10B981",
            secondary: "#ffffff",
            accent: "#132043",
         },
      },
   },
   plugins: [require("daisyui")]
};
