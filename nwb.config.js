module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    rules: {
      css: {
        modules: true,
        localIdentName: '[local]__[hash:base64:5]',
      },
      'less-css': {
        modules: true,
        localIdentName: '[local]__[hash:base64:5]',
      }
    }
  },
}
