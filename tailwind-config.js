module.exports = {
  important: true,
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    fontFamily: {
      display: ['Avenir', 'sans-serif'],
      body: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        cyan: '#c9c9c9',
      },
      margin: {
        '96': '24rem',
        '128': '32rem',
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover'],
  },
};
