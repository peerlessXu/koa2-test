const router = require('koa-router')()
const query = require('../utils/query')
const sql = require('../utils/sql')


router.get('/', async (ctx, next) => {

  let mysql = sql.QUERY_TABLE('user'), val = ['username', 'password']
  // query.query(mysql,val).then(res=>{
  //   console.log(res)
  //   ctx.body=res[0];
  // }).catch(err=>{
  //   console.log(err)
  // })

  ctx.body = await query.query(mysql, val)


  // await ctx.render('index', {
  //   title: 'Hello Koa 2!'
  // })

})

router.get('/addUser', async (ctx, next) => {
  ctx.body = JSON.stringify(ctx.request);
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/postSomeThing', async (ctx, next) => {
  ctx.body = JSON.stringify(ctx.request);
})

router.post('/upload', async (ctx) => {
  console.log(ctx.request.files);
  console.log(ctx.request.body);
  ctx.body = JSON.stringify(ctx.request.files);
});


module.exports = router
