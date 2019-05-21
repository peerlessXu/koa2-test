const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')

const jwt = require('koa-jwt')
const secret = require('./config/secret')

const index = require('./routes/index')
const user = require('./routes/user')

const cors = require('koa2-cors');

// error handler
onerror(app)

// middlewares
app.use(cors());

// 此接口列表，过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
  path: [
     
      // 注册
      /^\/user\/register/,
      // 登录
      /^\/user\/login/,
      
  ]
}))


app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  console.log('ctx', ctx)
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
