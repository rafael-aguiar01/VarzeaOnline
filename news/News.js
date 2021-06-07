const New = require("./New")
const Sequelize = require("sequelize");
const Category = require("../categories/Category");
const slugify = require("slugify")
const Op = Sequelize.Op;

class News {
    async findAll(){
        try {
            let result = await New.findAll({
                include: [{model: Category}],
                order:[['id','DESC']]
            })
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async findHome(){
        try{
            let result = await New.findAll({
                order: [
                    ['id', 'DESC']
                ],
                limit: 13
            })
            return result
        }
        catch (err) {
            console.log(err)
            return []
        }
    }
    async findBySlug(slug){
        try {
            let result = await New.findOne({
                where: {
                    slug: slug
                }           
            })
            return result
        } catch (err) {
            console.log(err)
            return[]
        }
    }
    async findById(id){
        try {
            let result = await New.findByPk(id)
            return result
        } catch (err) {
            console.log(err)
            return[]
        }
    }
    async findByCategoryId(CategoryId, articleId){
        try {
            let result = await New.findAll({
                where: {
                    CategoryId: CategoryId,
                    id:{[Op.notLike]: articleId},
                },
                order: [
                    ['id', 'DESC']
                ],
                limit: 4               
            })
            return result
            
        } catch (err) {
            console.log(err)
            return[]
        }
    }

    async saveNews(title, caption, body, image_url, author, views, category) {
        try {
            await New.create({
                title: title,
                slug: slugify(title),
                caption: caption,
                image_url: image_url,
                author: author,
                views: views,
                body: body,
                categoryId: category
            })
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async updateNews(id,title, caption, body, image_url, author, views, category) {
        try {
            await New.update({
                title: title,
                slug: slugify(title),
                caption: caption,
                image_url: image_url,
                author: author,
                views: views,
                body: body,
                categoryId: category
            },{
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async delNews(id){
        try {
            if(id != undefined){
                if(!isNaN(id)){
                   await New.destroy({
                        where: {
                            id: id
                        }
                    })
                }
            }
        } catch (err) {
            console.log(err)
            return []
        }
    }
}

module.exports = new News()
