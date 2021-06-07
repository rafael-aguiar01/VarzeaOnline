const News = require("../news/News")
const Category = require("../categories/Categories")

class NewController{

    async news(req,res){
        let slug = req.params.slug
        let article = await News.findBySlug(slug)
        let news = await News.findByCategoryId(article.categoryId,article.id)
        let categories = await Category.findAll()      
        res.render("noticia",{article: article, categories: categories, news: news})
    }
    async listNews(req,res){
        let news = await News.findAll()
        console.log(news)
        res.render("admin/news/index", {news: news})
    }
    async createNews (req,res){
        let categories = await Category.findAll()
        res.render("admin/news/new", {categories: categories})
    }
    async saveNews(req,res){
        let {title,caption,body,image_url,author,views,category} = req.body
        await News.saveNews(title,caption,body,image_url,author,views,category)
        res.redirect("/admin/noticias")
    }
    async delNews(req,res){
        let id = req.body.id
        await News.delNews(id)
        res.redirect("/admin/noticias")
    }
    async editNews(req,res){
        let id = req.params.id
        let article = await News.findById(id)
        let categories = await Category.findAll()
        res.render("admin/news/edit", {categories: categories, article: article})
    }
    async updateNews(req,res){
        let {id,title,caption,body,image_url,author,views,category} = req.body
        await News.updateNews(id,title,caption,body,image_url,author,views,category)
        res.redirect("/admin/noticias")
    }

}

module.exports = new NewController()

