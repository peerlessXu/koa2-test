const db = require('../utils/db').sequelize

const User = db.import('../schema/user')

User.sync({ force: false });

class UserModel {
    /**
     * 创建用户
     * @param user
     * @returns {Promise<boolean>}
     */
    static async create(user) {
        let { username, password } = user;

        await User.create({
            username,
            password,
        })
        return true
    }

    /**
     * 删除用户
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async delete(id) {
        await User.destroy({
            where: {
                id,
            }
        })
        return true
    }

    /**
     * 查询用户列表
     * @returns {Promise<*>}
     */
    static async findAllUserList() {
        return await User.findAll({
            attributes: ['id', 'username', 'email']
        })
    }

    /**
     * 根据id查询用户
     * @returns {Promise<*>}
     */
    static async findUserById(uid) {
        return await User.findOne({
            where: {
                id: uid
            }
        })
    }
    
    /**
     * 查询用户信息
     * @param username  姓名
      * @returns {Promise.<*>}
     */
    static async username(username) {
        return await User.findOne({
            where: {
                username
            }
        })
        }

        
        };
    
module.exports = UserModel