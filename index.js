const express = require("express")
const app = express()
const session = require("express-session")
const connection = require("./database/database")
const Category = require("./categories/Category")
const New = require("./news/New")
const User = require("./user/User")
const Sequelize = require("sequelize")
const adminAuth = require("./middlewares/adminAuth")
const { authSecret } = require("./database/.db")


const categoriesController = require("./categories/CategoriesController")
const newsController = require("./news/NewsController")
const usersController = require("./user/UsersController")
app.set ('view engine', 'ejs')

app.use(session({
    secret:authSecret, cookie:{maxAge: 3000000}
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))//Static

//Database
connection 
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com sucesso!")
    }).catch((error) => {
        console.log(error)
    })

app.use("/", categoriesController)
app.use("/", newsController)
app.use("/", usersController)
app.get("/", (req,res) =>{
    New.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 13
    }).then (news => {
        Category.findAll().then(categories => {
            res.render("index", {news: news, categories: categories })
        })
    })   
})

app.get("/admin", adminAuth, (req,res) => {
    res.render("admin/index")
})

app.get("/category/:slug", (req,res) => {
    var slug = req.params.slug
    Category.findOne({
        limit: 10,
        where: {
            slug: slug
        },
        include: [{model: New}]
    }).then(category => {
        if (category != undefined){
            Category.findAll().then(categories => {
                res.render("news/index",{news: category.news, categories: categories, slug:slug})
            })
        }
    })
})

app.get("/:slug", (req,res) => {
    var slug = req.params.slug
    const Op = Sequelize.Op;
    New.findOne({
        where: {
            slug: slug
        }
    }).then(noticia => {
        if(noticia != undefined){
            let categoriaDaNotica = noticia.categoryId
            let idDaNoticia = noticia.id
            console.log(idDaNoticia)
            Category.findAll().then(categories => {
                return(categories)
            }).then(categories => {
                New.findAll({
                    where: {
                        categoryId: categoriaDaNotica,
                        id:{[Op.notLike]: idDaNoticia},
                    },
                    order: [
                        ['id','DESC']
                    ],
                    limit: 4
                }).then(noticias =>{
                    
                    res.render("noticia",{noticia: noticia, categories: categories, noticias: noticias})
                })
            })

        } else {
        res.send("/ ARTIGO INDEFINIDO")
        }
    }).catch (err => {
        res.send(err)
    })
})


app.listen(8080, () => {
    console.log("O Servidor está rodando!")
})