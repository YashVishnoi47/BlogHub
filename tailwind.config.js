/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      boxShadow: {
        'shadow-1': '10px 0 15px -3px rgba(0, 0, 0, 0.1), -10px 0 15px -3px rgba(0, 0, 0, 0.8)', // Custom shadow
      },
    },
  },
  plugins: [],
};
