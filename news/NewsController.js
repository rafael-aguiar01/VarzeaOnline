const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const New = require ("./New")
const slugify = require("slugify")
const adminAuth = require("../middlewares/adminAuth")


// router.get("/news", (req,res) =>{
//     New.findAll({
//         order: [
//             ['id', 'DESC']
//         ],
//         limit: 9
//     }).then (news => {
//         Category.findAll().then(categories => {
//             res.render("news/index", {news: news, categories: categories })
//         })
//     })   
// })

// router.get("/admin/news",adminAuth, (req,res) =>{
//    New.findAll({
//        include: [{model: Category}],
//        order:[['id','DESC']]
//    }).then( news =>{
//        res.render("admin/news/index", {news: news})
//    })
// })

// router.get("/admin/news/create",adminAuth, (req,res) =>{
//     Category.findAll().then(categories => {
//         res.render("admin/news/new", {categories: categories})
//     })
// })

// router.post("/articles/save",adminAuth, (req,res) => {
//     var title = req.body.title
//     var caption = req.body.caption
//     var body = req.body.body
//     var imageUrl = req.body.image_url
//     var author = req.body.author
//     var views = req.body.views
//     var category = req.body.category

//     New.create({
//         title: title,
//         slug: slugify(title),
//         caption: caption,
//         image_url: imageUrl,
//         author: author,
//         views: views,
//         body: body,
//         categoryId: category
//     }).then(() =>{
//         res.redirect("/admin/news/")
//     })
// })

// router.post("/news/delete",adminAuth, (req,res)=>{
//     var id = req.body.id
//     if(id != undefined){
//         if(!isNaN(id)){
//             New.destroy({
//                 where:{
//                     id: id
//                 }
//             }).then(() => {
//                 res.redirect("/admin/news")
//             })
//         }else{
//             res.redirect("/admin/news")
//         }
//     } else {
//         res.redirect("/admin/news")
//     }
// })

// router.get("/admin/news/edit/:id",adminAuth, (req,res) => {
//     var id = req.params.id
//     New.findByPk(id).then(noticia => {
//         if (noticia != undefined){
//             Category.findAll().then(categories => {
//                 res.render("admin/news/edit", {categories: categories, noticia: noticia})
//             })
//         }else {
//             res.redirect("/")
//         }
//     }).catch(err => {
//         res.redirect("/")
//     })
// })

// router.post("/news/update",adminAuth, (req,res) => {
//     var id = req.body.id
//     var title= req.body.title
//     var caption = req.body.caption
//     var body= req.body.body
//     var imageUrl = req.body.image_url
//     var author = req.body.author
//     var views = req.body.views
//     var category = req.body.category

//     New.update({title: title, caption: caption, body:body,
//         image_url: imageUrl, author: author, views: views,
//         categoryId: category, slug:slugify(title)},{
//              where: {
//                 id: id
//                     }
//     }).then(() => {
//         res.redirect("/admin/news")
//     }).catch(err => {
//         res.redirect ("/")
//     })

// })

router.get("/category/:slug/:num", (req,res)=>{
    let slug = req.params.slug
    let page = req.params.num
    var offset = 0

    if (isNaN(page) || page==1){
        offset=0
    }else {
        offset = (parseInt(page) -1) * 10
    }
    
    Category.findOne({
        where:{
            slug: slug
        }
    }).then(categoryId =>{
        New.findAndCountAll({
            where:{
                categoryId: categoryId.id
            },
            limit: 10,
            offset: offset,
            order: [
                ['id','DESC']
            ],
        }).then(news => {
            var next
            if(offset +10 >= news.count){
                next = false
            } else {
                next = true
            }

            var result = {
                page: parseInt(page),
                next: next,
                news: news
            }
            Category.findAll({
            }).then(categories => {
                res.render("news/indexOfCategory", {result: result, categories: categories, slug:slug})
            })
        })
    
    })
})

module.exports = router