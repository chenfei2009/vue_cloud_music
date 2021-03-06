const path = require('path')

module.exports = {
  // baseUrl: './', // 3.0之后废除
  // publicPath: '/src/assets'
  // publicPath: ''
  // publicPath: '/'
  publicPath: './',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/theme/style.less')
      ]
    }
  }
}
