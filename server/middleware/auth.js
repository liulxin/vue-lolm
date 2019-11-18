module.exports = options => async (ctx, next) => {
  const jwt = require('jsonwebtoken')
  const User = require('../models/admin_user')
  const token = String(ctx.headers.authorization || '')
    .split(' ')
    .pop()
  if (!token) {
    ctx.status = 401
    ctx.body = { message: '请先登录' }
    return
  }
  const { id } = jwt.verify(token, ctx.secret)
  if (!id) {
    ctx.status = 401
    ctx.body = { message: '请先登录' }
    return
  }
  const user = await User.findById(id)
  if (!user) {
    ctx.status = 401
    ctx.body = { message: '请先登录' }
    return
  }
  // 设置信息
  ctx.user = user

  await next()
}
