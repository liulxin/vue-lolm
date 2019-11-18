const koa = require('koa')
const cors = require('koa2-cors') // 跨域
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')

const app = new koa()

app.context.secret = 'ads12dfsuyt' // token 签名

app.use(
  cors({
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS']
  })
)
app.use(bodyParser())
app.use(static(path.join(__dirname, './public/'))) // 静态资源访问

// mongo
require('./mongo/db')(app)

// routes
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('serve is running at: http://localhost:3000')
})
