const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');


class User {
    /**
     * 创建用户
     * @param ctx username     用户名字
     * @param ctx password     用户密码
     * @param ctx email        用户邮箱
     * @param ctx roles_id     用户权限组 （未写）
     *
     * @returns 创建成功返回用户信息，失败返回错误信息
     */
    static async create(ctx) {
        let { username, password } = ctx.request.body;

        let params = {
            username,
            password,
        }

        // 检测参数是否存在为空
        let errors = [];
        for (let item in params) {
            if (params[item] === undefined || params[item] === '') {
                let index = errors.length + 1;
                errors.push("错误" + index + ": 参数: " + item + "不能为空")
            }
        }

        if (errors.length > 0) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: errors
            }
            return false;
        }

        // 查询用户名是否重复
        const existUser = await UserModel.username(params.username)

        if (existUser) {
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                message: "用户已经存在"
            }

        } else {

            try {

                // 加密密码
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(params.password, salt);
                params.password = hash;

                // 创建用户
                await UserModel.create(params);
                const newUser = await UserModel.username(params.username)

                // 签发token
                const userToken = {
                    username: newUser.username,
                    id: newUser.id
                }

                // 储存token失效有效期1小时
                const token = jwt.sign(userToken, secret.sign, { expiresIn: '1h' });

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    message: `创建用户成功`,
                    data: token
                }

            } catch (err) {
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    message: err
                }
            }
        }

    }

    /**
     * 查询用户信息
     * @param ctx token 分发的用户token
     *
     * @returns 查询成功返回用户信息，失败返回错误原因
     */
    static async info(ctx) {

        let { id } = ctx.params;
        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `ID不能为空`
            }

            return false;
        }
        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的ID`
            }

            return false;
        }


        try {
            const userInfo = await UserModel.findUserById(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "查询成功",
                data: userInfo
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }

    /**
     * 删除用户
     * @param ctx id 用户ID
     * @returns  删除成功返回true，失败返回错误原因
     */
    static async delete(ctx) {
        let { id } = ctx.params;

        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `ID不能为空`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的ID`
            }

            return false;
        }

        try {
            await UserModel.delete(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "删除成功"
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }

    /**
     * 登录
     * @param ctx username     用户名字
     * @param ctx password     用户密码
     *
     * @returns 登录成功返回用户信息，失败返回错误原因
     */
    static async login(ctx) {
        const { username, password } = ctx.request.body
        // 查询用户
        const userDetail = await UserModel.username(username)

        if (!userDetail) {
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                message: "用户不存在"
            }

            return false;
        }


        // 判断前端传递的用户密码是否与数据库密码一致
        if (bcrypt.compareSync(password, userDetail.password)) {

            // 用户token
            const userToken = {
                username: userDetail.username,
                id: userDetail.id
            }
            // 签发token
            const token = jwt.sign(userToken, secret.sign, { expiresIn: '1h' });

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "登录成功",
                data: {
                    id: userDetail.id,
                    username: userDetail.username,
                    email: userDetail.email,
                    token: token
                }
            }

        } else {
            ctx.response.status = 401;
            ctx.body = {
                code: 401,
                message: "用户名或密码错误"
            }
        }
    }

    /**
     * 获取用户列表
     * @param ctx
     *
     * @returns 用户列表数据
     */
    static async list(ctx) {
        try {
            const data = await UserModel.findAllUserList();

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "获取成功",
                data
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }


    /**
     * 编辑用户信息
     * @param ctx
     *
     * @returns 用户信息
     */


    static async update(ctx) {
        let { id } = ctx.params;
        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `ID不能为空`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的ID`
            }

            return false;
        }
        let { mobile, email, truename, gender } = ctx.request.body;
        let params = {
            mobile,
            email,
            truename,
            gender
        }
        try {
            await UserModel.update(id, params);
            const userInfo = await UserModel.findUserById(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "编辑成功",
                data: userInfo
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }

    }


}

module.exports = User