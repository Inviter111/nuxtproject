const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const checkAuth = require('../middleware/auth')
const User = require('../models/user')

const router = new Router()

router.post('/register', async ctx => {
  await User(ctx.request.body).save()
  ctx.body = ctx.request.body
})

router.post('/login', async ctx => {
  const user = await User.findOne({login: ctx.request.body.login})
  if (!user) ctx.status = 401
  const result = await user.verifyPassword(ctx.request.body.password)
  if (!result) ctx.status = 401
  const token = jwt.sign({
    login: user.login,
    userId: user._id
  }, 'secretKey', {
    expiresIn: '24h'
  })
  ctx.body = {
    token
  }
})

router.get('/user', async ctx => {
  const token = ctx.req.headers.authorization.split(' ')[1]
  const userId = jwt.decode(token).userId
  const user = await User.findOne({ _id: userId })
  ctx.body = {
    login: user.login,
    email: user.email
  }
})

router.put('/user', checkAuth, async ctx => {
  const pass = ctx.request.body.password
  await User.findOne({ _id: ctx.req.userData.userId }, async (err, doc) => {
    if (err) ctx.body = 403
    doc.login = ctx.request.body.login,
    doc.email = ctx.request.body.email,
    doc.password = (pass) ? pass : doc.password
    doc.save()
  })
  ctx.body = 200
})

module.exports = router