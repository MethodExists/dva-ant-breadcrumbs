module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: false,
  },
  babel: {
    cherryPick: ['lodash'],
    plugins: [
      ['import', { libraryName: 'antd', style: 'css' }],
    ],
  },
};
