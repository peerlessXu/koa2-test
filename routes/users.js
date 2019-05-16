const router = require('koa-router')()
const db = require('../utils/query')
const dbsql = require('../utils/sql')

router.prefix('/users')

router.get('/', async function (ctx, next) {
  let sql = dbsql.QUERY_TABLE('user');
  ctx.body = await db.query(sql)
})

router.post('/add', async function (ctx, next) {
  let sql = dbsql.QUERY_TABLE('user');
  ctx.body = await db.query(`insert into user (username,mobile,password,open_id,wallet,email,truename,gender) VALUES ('zyh','18703600885','123456','',999,'18703600885@qq.com','赵艳红','女');`)
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})



module.exports = router
