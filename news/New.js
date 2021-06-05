const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("../categories/Category")

const New = connection.define('news',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, caption: {
        type: Sequelize.STRING,
        allowNull: false
    }, image_url: {
        type: Sequelize.STRING,
        allowNull: false
    }, author: {
        type: Sequelize.STRING,
        allowNull: false
    }, views: {
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(New) // 1 para N
New.belongsTo(Category) // 1-1

// New.sync({force: true})
module.exports = New