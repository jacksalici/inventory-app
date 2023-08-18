module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],

  plugins: [
      require('daisyui')
  ],
  theme: {
    fontFamily:{
      'sans': ['Ubuntu', 'ui-sans-serif'],
      'serif': ['DM Serif Display', 'ui-serif'],
      'mono': ['Ubuntu Mono', 'ui-monospace'],
    }
  },
  daisyui: {
    themes: [{
      inventory: {
        ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
        "--rounded-box": "0.5rem", // border radius rounded-box utility class, used in card and other large boxes
        "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        "--rounded-badge": "0.5rem", // border radius rounded-badge utility class, used in badges and similar
        "--animation-btn": "0.25s", // duration of animation when you click on button
        "--animation-input": "0.25s", // duration of animation for inputs like checkbox, toggle, radio, etc
        "--btn-text-case": "uppercase", // set default text transform for buttons
        "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
        "--border-btn": "1px", // border width of buttons
        "--tab-border": "1px", // border width of tabs
        "--tab-radius": "0.5rem", // border radius of tabs
      }


    }],


  },
}

