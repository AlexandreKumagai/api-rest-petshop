const mysql = require('mysql')

const conexao = mysql.createConnection(
    {
        host:'localhost',
        port:3306,
        user:'api-rest',
        password:'1234',
        database:'agenda-petshop'
    }
)

module.exports = conexao