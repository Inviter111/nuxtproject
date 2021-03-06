const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const bodyParser = require('koa-bodyparser')

const router = require('./routes/router')

const mongoose = require('mongoose')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

mongoose.connect('mongodb://localhost:27017/nuxt-koa', {
  useNewUrlParser: true,
  useCreateIndex: true
})

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

start()