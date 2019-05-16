const mysql = require('mysql');
const MYSQL_CONFIG = require('../config/mysql_config');

const pool = mysql.createPool(MYSQL_CONFIG);
let query = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, val, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.end()
                })
            }
        })
    })
}

module.exports = {
    query: query
}