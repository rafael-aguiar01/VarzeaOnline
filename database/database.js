const Sequelize = require("sequelize")
// const { db } = require("../.env")

const db = {
    host : "localhost",
    database : "varzea_online",
    user : "root",
    password : "abc123!@"
}



const connection = new Sequelize(db.database,db.user,db.password,{
    host: db.host,
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection 