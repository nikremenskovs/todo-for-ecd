/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "todo-primary": "#4C4B16",
        "todo-secondary": "#898121",
        "todo-yellow": "#E7B10A",
        "todo-white": "#F7F1E5",
        "todo-green": "#BFDB38",
        "todo-red": "#CD1818",
      },
      fontFamily: {
        marmelad: ["Marmelad"],
        "yeseva-one": ["YesevaOne"],
      },
    },
  },
  plugins: [],
};
