const koa = require('koa')
const cors = require('koa2-cors') // 跨域
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')
const {  accessLogger,systemLogger, } = require('./logger');
const app = new koa()

app.context.secret = 'ads12dfsuyt' // token 签名

app.use(
  cors({
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT']
  })
)
app.use(bodyParser())
app.use(static(path.join(__dirname, './public/'))) // 静态资源访问

app.use(accessLogger()); //中间件

// mongo
require('./mongo/db')(app)
// routes
require('./routes/admin')(app)
require('./routes/web')(app)

// app.on('error', err => {logger.error(err); });

app.listen(3000, () => {
  console.log('serve is running at: http://localhost:3000')
})
