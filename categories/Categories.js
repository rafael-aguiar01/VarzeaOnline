const Categories = require ("./Category")
const New = require("../news/New")
const slugify = require("slugify")

class Category {
    async findAll(){
        try {
            let result = await Categories.findAll()
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async findBySlug(slug){
        try {
            let result = await Categories.findOne({
                where: {
                    slug: slug
                },
            })
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async findById(id){
        try {
            let result = await Categories.findByPk(id)
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async saveCategory(title){
        try {
            if(title != undefined){
                await Categories.create({
                    title: title,
                    slug: slugify(title) 
                })
            }else{
                return [] 
            }           
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async updateCategory(id, title){
        try {
            await Categories.update({ 
                title: title, 
                slug: slugify(title)},{ 
                    where: {
                    id: id
                }
            })            
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async delCategory(id){
        try {
            if(id != undefined){
                if(!isNaN(id)){
                    Categories.destroy({
                        where:{
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

module.exports = new Category()
