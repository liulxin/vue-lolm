const path = require('path')
module.exports = {
  devServer: {
    // proxy: {
    //   '/admin/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     ws: true
    //   }
    // }
  },
  productionSourceMap: false,
  outputDir: path.join(__dirname, '../server/public/view'),
  publicPath: process.env.NODE_ENV === 'production' ? '/view/' : '/'
}
