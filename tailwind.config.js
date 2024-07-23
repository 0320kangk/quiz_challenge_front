module.exports = {
  // purge: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        128: "32rem", // 새로운 높이 값을 추가합니다.
        144: "36rem", // 또 다른 높이 값을 추가합니다.
        160: "40rem",
        // 필요에 따라 더 많은 높이 값을 추가할 수 있습니다.
      },
      colors: {
        'wood-dark': '#8B4513', // 다크 브라운 색상 추가
      },
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
