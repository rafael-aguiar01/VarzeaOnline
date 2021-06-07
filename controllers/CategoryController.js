const Category = require("../categories/Categories")
const News = require("../news/News")

class CategoryController {
    async index(req,res){
        let slug = req.params.slug
        let category = await Category.findBySlug(slug)
        let news = await News.findByCategoryIndex(category.id)
        let categories = await Category.findAll()
        res.render("news/index",{news: news, categories: categories, slug:slug})
    }
    async pages(req,res){
        let slug = req.params.slug
        let page = req.params.num
        var offset = 0

        if (isNaN(page) || page==1){
            offset=0
        }else {
            offset = (parseInt(page) -1) * 10
        }

        let category = await Category.findBySlug(slug)

        let news = await News.findByCategoryPage(category.id, offset)
        let next

        if (offset + 10 >= news.count) {
            next = false
        } else {
            next = true
        }
        let result = {
            page: parseInt(page),
            next: next,
            news: news
        }
        let categories = await Category.findAll()
        res.render("news/indexOfCategory", {result: result, categories: categories, slug:slug})
    }

    async listCategories(req,res){
        let categories = await Category.findAll()
        res.render("admin/categories/index", {categories: categories})
    }
    async createCategory(req,res){
        res.render("admin/categories/new")
    }
    async saveCategory(req,res){
        let title = req.body.title
        await Category.saveCategory(title)
        res.redirect("/admin/categorias")
    }
    async editCategory(req,res){
        let id = req.params.id
        let category = await Category.findById(id)
        res.render("admin/categories/edit",{category: category})   
    }
    async updateCategory(req,res){
        let id = req.body.id
        let title = req.body.title
        await Category.updateCategory(id, title)
        res.redirect("/admin/categorias")
    }
    async delCategory(req,res){
        let id = req.body.id
        await Category.delCategory(id)
        res.redirect("/admin/categorias")
    }

}

module.exports = new CategoryController()


