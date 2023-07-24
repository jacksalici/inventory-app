module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],

  plugins: [
      require('daisyui')
  ],
  theme: {},
  daisyui: {
    themes: [{
      inventory: {
        ...require("daisyui/src/theming/themes")["[data-theme=garden]"],
        "primary": "#345665" 
      }


    }],


  },
}

