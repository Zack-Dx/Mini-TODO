const { default: plugin } = require("tailwindcss");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' ,
    "./node_modules/tw-elements/dist/js/**/.js" ,
    "./src/pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'babyBackground': "linear-gradient(120deg , rgba(118 , 82 , 252 , 0.830) , rgba(226 , 73 , 167 , 0.980)), url('https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGF0dGVybnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')",
        'babyLanding': " url('https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/10/website-pattern-1.jpg')"
      },
      colors:{
        baby_blue : "#4c0ffb",
        baby_gray : "#f7f7fc",
        baby_pink : "#f51767",
        baby_cyan : "#9BF9FF",
        baby_red:"#f14d68d9",
        baby_green:"#15d642d9",
        baby_slate : "#373f49",
        baby_sky:"#f6f6fb",
        baby_light_green:"#32DD88",
        baby_apple : "#f22f46",
        baby_purple:"#5f48ea",
        baby_gradient_purple:"#7b68ee",
        baby_gradient_pink:"#e44ba4",
        baby_gradient_purple_hv : "#5f48ea",
        baby_skyblue : "#dbeafe",
        baby_dark_skyblue : "#1e3a8a"
      },
      fontFamily : {
        "Baby_Barlow": ['Barlow', 'sans-serif'],
        "Baby_Inter": ['Inter', 'sans-serif'],
        "Baby_Nunito": ['Nunito', 'sans-serif'],
        "Baby_PlayFair": ['Playfair Display', 'serif'],
        "Baby_PtSherif": ['PT Serif', 'serif'],
        "Baby_Roboto": ['Roboto', 'sans-serif'],
        "Baby_Urbanist": ['Urbanist', 'sans-serif'],
      }
    }
  },
  fontFamily:{
    "barlow": ['Barlow', 'sans-serif'],
    "inter": ['Inter', 'sans-serif'],
    "nunito": ['Nunito', 'sans-serif'],
    "playfair": ['Playfair Display', "serif"],
    "pt": ['PT Serif', "serif"],
    "roboto": ['Roboto', 'sans-serif'],
    "urbanist": ['Urbanist', 'sans-serif'],
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('tailwind-scrollbar-hide')
  ],
  variants: {
        scrollbar: ['rounded']
    }
}