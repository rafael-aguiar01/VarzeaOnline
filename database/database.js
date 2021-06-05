const Sequelize = require("sequelize")
const { db } = require("./.env")

const connection = new Sequelize(db.database,db.user,db.password,{
    host: db.host,
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection