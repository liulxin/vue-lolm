const koa = require('koa')
const cors = require('koa2-cors') // 跨域
const bodyParser = require('koa-bodyparser')

const app = new koa()

app.use(cors())
app.use(bodyParser())

// mongo
require('./mongo/db')(app)

// routes
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('serve is running at: http://localhost:3000')
})
