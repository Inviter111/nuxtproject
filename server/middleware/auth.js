const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
  try {
    const token = ctx.req.headers.authorization.split(' ')[1]
    const decodedToken = await jwt.verify(token, 'secretKey')
    ctx.req.userData = { login: decodedToken.login, userId: decodedToken.userId }
    return next()
  }
  catch (err) {
    ctx.throw(401, { err })
  }
} 