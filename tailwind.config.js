/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        // 将 Nunito 设置为默认 sans 字体，提供圆润卡通风格
        'sans': [
          'Nunito',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        // 可以添加其他卡通字体作为选项
        'comic': [
          'Comic Neue',
          'Nunito',
          'cursive'
        ],
        'baloo': [
          'Baloo 2',
          'Nunito',
          'cursive'
        ],
        'fredoka': [
          'Fredoka',
          'Nunito', 
          'cursive'
        ]
      },
      // 为卡通风格优化字重
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900'
      }
    },
  },
  plugins: [],
}