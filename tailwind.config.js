module.exports = {
  content: ["./src/frontend/*.{html, js, ts}"],
  theme: {
    extend: {
      flex: {
        '2': '2 1 0%',
        '3': '3 1 0%',
        '4': '4 1 0%',
        '5': '5 1 0%',
        '6': '6 1 0%',
        '7': '7 1 0%',
        '8': '8 1 0%',
        '9': '9 1 0%'
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /container-/
    }
  ]
}