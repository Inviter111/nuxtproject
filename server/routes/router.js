var KoaRouter = require('koa-router')

var products = require('./admin/products')
var auth = require('./auth')

var router = new KoaRouter()

router.use('/api/products', products.routes())
router.use('/api/auth', auth.routes())

module.exports = router