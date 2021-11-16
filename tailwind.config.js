const defaultTheme = require("tailwindcss/defaultTheme");

const customColors = {
  ...defaultTheme.colors,
  green: {
    basic: "#006871",
    light: "#24b4bc",
    dark: "#015e65",
    100: "#24b4bc",
    row: "#94b8bb"
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
  important: true
};
