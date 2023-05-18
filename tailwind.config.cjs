/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        purple:'#8047F8',
        purpleLight: '#EBE5F9',
        purpleDark: '#4B2995',
        yellow: '#DBAC2C',
        yellowLight: '#F1E9C9',
        yellowDark: '#C47F17',
        title: '#272221',
        subtitle: '#403937',
        text: '#574F4D',
        label: '#8D8686',
        input: '#EDEDED',
        card: '#F3F2F2',
        baseButton: '#E6E5E5',
        baseHover: '#D7D5D5'
      },
      backgroundImage:{
        background: "url(/background.png)",
      },
      fontFamily:{
        body: 'Roboto',
        title: 'Baloo 2',
      }
    },
  },
  plugins: [],
}
