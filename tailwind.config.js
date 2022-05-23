module.exports = {
  content: [
    "src/pages/**/*.tsx",
    "src/view/**/*.tsx",
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
