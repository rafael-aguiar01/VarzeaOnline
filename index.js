const express = require("express")
const app = express()
const session = require("express-session")
const connection = require("./database/database")
// const Category = require("./categories/Category")
// const New = require("./news/New")
// const User = require("./user/User")
// const Sequelize = require("sequelize")
// const adminAuth = require("./middlewares/adminAuth")
const { authSecret } = require("./database/.env")

const router = require("./routes/routes")


// const categoriesController = require("./categories/CategoriesController")
// const newsController = require("./news/NewsController")
// const usersController = require("./user/UsersController")
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

// app.use("/", categoriesController)
// app.use("/", newsController)
// app.use("/", usersController)

app.use("/",router)

// app.get("/admin", adminAuth, (req,res) => {
//     console.log("oi")
//     res.render("admin/index")
// })


app.listen(8080, () => {
    console.log("O Servidor está rodando!")
})