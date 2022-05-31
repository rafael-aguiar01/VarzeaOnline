const Category = require("../categories/Categories")
const News = require("../news/News")

class HomeController {
    
    async index(req,res){
        let categories = await Category.findAll()
        let news = await News.findHome()
        res.render("index", {news: news, categories: categories })
    }

    async admin(req,res){
        res.render("admin/index")
    }
}
module.exports = new HomeController()

