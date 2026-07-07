
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px', // Custom breakpoint for extra small screens
      },
      colors:{
        darkGreen:"#224F34",
        lightGreen:"#C2EFD4",
        darkGray:"#373737",
        grayGreen:"#A9D4BA",
        skyBlue:"#DDECE2",
        textLightGray:"#454545",
        whiteGray:"#EAEBF0",
        whiteDarkGray:"#D9D9D9",
        // gray:"#2b2d2e",



      },
      fontFamily:{
        // Bree:["Bree Serif"]
        Bree:["Bree"],
        Elephant:["Elephant"],
        Roboto: ["Roboto","sans-serif"],
        Poppins:["Poppins","sans-serif"]


      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
