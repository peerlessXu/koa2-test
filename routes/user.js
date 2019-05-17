const router = require('koa-router')()
const db = require('../utils/db')
var Sequelize = require('sequelize');

router.prefix('/user')

router.get('/', async function (ctx, next) {
  let sql = dbsql.QUERY_TABLE('user');
  ctx.body = await db.query(sql)
})

router.post('/login', async function (ctx, next) {
  const Nuser = db.sequelize.define('nuser', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },

  });
  
  Nuser.sync({force: true}).then(() => {
    // 表已创建
    return Nuser.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });


  // if (result.length) {
  //   ctx.body = { code: 200, msg: '登录成功', data: result[0] }
  // } else {
  //   ctx.body = { code: 300, msg: '用户名密码错误', data: null }
  // }
})

router.post('/register', async function (ctx, next) {
  
})

// router.post('/register', async function (ctx, next) {
//   let sql = dbsql.QUERY_TABLE('user');
//   ctx.body = await db.query(`insert into user (username,mobile,password,open_id,wallet,email,truename,gender) VALUES ('zyh','18703600885','123456','',999,'18703600885@qq.com','赵艳红','女');`)
// })

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})



module.exports = router
