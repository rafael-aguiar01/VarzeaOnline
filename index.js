const express = require("express")
const app = express()
const session = require("express-session")
const connection = require("./database/database")
const { authSecret } = require("./.env")

const router = require("./routes/routes")

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


app.use("/",router)



app.listen(8080, () => {
    console.log("O Servidor está rodando!")
})