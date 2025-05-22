/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": "url('assets/images/bg_dots_grey.png')",
      },
      boxShadow: {
        "textarea-shadow": "0 0 4px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
