const router = require('koa-router')()
const db = require('../utils/db').sequelize

// const User = db.import('../schema/user')

const User = require('../controllers/userController')

router.prefix('/user')

router.get('/', async function (ctx, next) {
})


// 登录
router.post('/login', User.login)

// 注册
router.post('/register', User.create)

// 根据Id查询用户
router.get('/:id',User.info)


module.exports = router
