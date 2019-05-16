// 创建数据库
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS user();`.replace(/[\r\n]/g, '')

// 查询数据表
const QUERY_TABLE = (tableName) => `SELECT * FROM ${tableName}`

// 插入数据
const INSERT_TABLE = (tableName, { key, val }) => `INSERT INTO ${tableName}(${key}) VALUES (${val})`

// 更新数据
const UPDATE_TABLE = (tableName, { primaryKey, primaryVal }, { key, val }) => `UPDATE ${tableName} SET ${key}=${val} WHERE(${primaryKey}=${primaryVal})`

// 删除数据
const DELETE_TABLE = (tableName, { primaryKey, primaryVal }) => `DELETE FROM user WHERE(${primaryKey}=${primaryVal})`

module.exports = {
    CREATE_TABLE,
    QUERY_TABLE,
    INSERT_TABLE,
    UPDATE_TABLE,
    DELETE_TABLE
}