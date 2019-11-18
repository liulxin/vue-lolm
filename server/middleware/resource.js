module.exports = options => async (ctx, next) => {
  // 获取当前Model,并设置给ctx
  const ModelName = ctx.params.resouce
  const Model = require(`../models/${ModelName}`)
  ctx.Model = Model
  await next()
}
