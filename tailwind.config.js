const defaultTheme = require("tailwindcss/defaultTheme");

const customColors = {
  ...defaultTheme.colors,
  green: {
    basic: "#006871",
    dark: "#636363",
    100: "#F4F4F5",
    300: "#D4D4D8",
    500: "#6B7280",
  },
};
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/landbackground.jpg')",
        loginv: "url('/landbackgroundV.jpg')",
      },
    },
    colors: customColors,
    fontFamily: {
      oswald: ["Oswald", ...defaultTheme.fontFamily.sans],
      haas: ["Haas", ...defaultTheme.fontFamily.sans],
      roboto: ["Roboto Sans Serif", ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
