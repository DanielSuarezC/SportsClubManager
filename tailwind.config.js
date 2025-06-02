/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors:{
        'sports':{
          bluedark: '#3C5775',
          blue: '#3585BA',
          bluelight: '#9AC6DF',
          gray: '#8F99A3',
          graylight: '#D2D1CF'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ],
}

