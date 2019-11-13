const koa = require('koa')

const app = new koa()

app.listen(3000, () => {
  console.log('serve is running at: http://localhost:3000')
})