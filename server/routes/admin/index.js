module.exports = app => {
  const Router = require('koa-router')
  const router = new Router()
  const restrouter = new Router()

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
      .limit(10)
    ctx.body = items
  })

  restrouter.get('/:id', async ctx => {
    let id = ctx.params.id
    const model = await ctx.Model.findById(id)
    ctx.body = model
  })

  // 加中间件处理 --记得 return next()
  router.use(
    '/admin/api/rest/:resouce',
    (ctx, next) => {
      // 获取当前Model,并设置给ctx
      const ModelName = ctx.params.resouce
      const Model = require(`../../models/${ModelName}`)
      ctx.Model = Model
      return next()
    },
    restrouter.routes(),
    restrouter.allowedMethods()
  )

  app.use(router.routes()).use(router.allowedMethods())
}
