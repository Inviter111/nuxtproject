const Router = require('koa-router')

const checkAuth = require('../../middleware/auth')
const Products = require('../../models/products')

const router = new Router()

router.post('/create', async ctx => {
  Products(ctx.request.body).save()
  ctx.body = ctx.request.body
})

router.get('/', async ctx => {
  const productsQuery = await Products.find()
  ctx.body = productsQuery
})

router.get('/:id', async ctx => {
  const product = await Products.findById(ctx.params.id)
  ctx.body = product
})

router.put('/:id', checkAuth, async ctx => {
  await Products.findOne({ _id: ctx.request.body._id }, async (err, doc) => {
    if (err) ctx.throw(403)
    doc.name = ctx.request.body.name
    doc.description = ctx.request.body.description
    doc.save()
  })
  ctx.body = 200
})

router.delete('/:id', checkAuth, async ctx => {
  await Products.findOne({ _id: ctx.params.id }, async (err, doc) => {
    if (err) ctx.throw(403)
    doc.delete()
  })
  ctx.body = 200
})

module.exports = router