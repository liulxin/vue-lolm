module.exports = app => {
  const Router = require('koa-router')
  const router = new Router()
  const restrouter = new Router()
  const multer = require('koa-multer')
  const MAO = require('multer-aliyun-oss')
  const path = require('path')
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  // const assert = require('http-assert')
  const User = require('../../models/admin_user')

  restrouter.post('/', async ctx => {
    const { request: req } = ctx
    const model = await ctx.Model.create(req.body)
    ctx.body = model
  })

  restrouter.put('/:id', async ctx => {
    const { request: req } = ctx
    let id = ctx.params.id
    const model = await ctx.Model.findByIdAndUpdate(id, req.body)
    ctx.body = model
  })

  restrouter.delete('/:id', async ctx => {
    const { request: req } = ctx
    let id = ctx.params.id
    await ctx.Model.findByIdAndDelete(id)
    ctx.body = {
      success: true
    }
  })

  restrouter.get('/', async ctx => {
    let queryOptions = {}
    if (ctx.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await ctx.Model.find()
      // .populate('parent') // 关联查询
      .setOptions(queryOptions)
      // .limit(20)
    ctx.body = items
  })

  restrouter.get('/:id', async ctx => {
    let id = ctx.params.id
    const model = await ctx.Model.findById(id)
    ctx.body = model
  })

  // 加中间件处理
  // 登录授权中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  router.use(
    '/admin/api/rest/:resouce',
    authMiddleware(),
    resourceMiddleware(),
    restrouter.routes(),
    restrouter.allowedMethods()
  )

  // 单独处理上传路由
  const upload = multer({
    dest: path.resolve(__dirname, '../../public/uploads')
    // storage: MAO({
    //   config: {
    //     region: 'oss-cn-shanghai',
    //     accessKeyId: '',
    //     accessKeySecret: '',
    //     bucket: 'lolm-vue'
    //   }
    // })
  })
  router.post(
    '/admin/api/upload',
    upload.single('file'),
    authMiddleware(),
    async ctx => {
      const file = ctx.req.file
      // file.url = `http://lolm.noway.vip/uploads/${file.filename}`
      file.url = `http://lolm.noway.vip/uploads/${file.filename}`
      ctx.body = file
    }
  )

  // 登录路由
  router.post('/admin/api/login', async ctx => {
    const { username, password } = ctx.request.body
    // 1. 找用户
    const user = await User.findOne({
      username
    }).select('+password')
    if (!user) {
      ctx.status = 422
      ctx.body = { message: '用户不存在' }
      return
    }
    // 2. 校验密码
    let isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) {
      ctx.status = 422
      ctx.body = { message: '密码不正确' }
      return
    }
    // 3. 返回token
    const token = jwt.sign({ id: user._id }, ctx.secret)

    // ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
    ctx.body = { token }
  })

  router.get('/admin/api/info', authMiddleware(), async ctx => {
    ctx.body = {
      name: ctx.user.username
    }
  })

  app.use(router.routes()).use(router.allowedMethods())
}
