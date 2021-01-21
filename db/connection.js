const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    port: 3306,
    user: 'sql10388337',
    password: 'b3wTCvb3ks',
    database: 'sql10388337'
})

module.exports = conn