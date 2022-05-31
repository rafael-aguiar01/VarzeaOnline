const User = require('../user/Users')
const bcrypt = require('bcryptjs')

class UserController{

    async index (req,res){
        var users = await User.findAll()
        res.render("admin/users/index",{users: users})
    }
    async createUser(req,res){
        res.render("admin/users/create")
    }
    async saveUser(req,res){
        let {email, password} = req.body
        await User.saveUser(email, password)
        res.redirect("/admin/usuarios")
    }
    async editUser(req,res){
        let id = req.params.id
        console.log(id)
        let user = await User.findById(id)
        
        res.render("admin/users/edit", {user: user})
    }
    async updateUser(req,res){
        let {id, email, password} = req.body
        await User.updateUser(id, email,password)
        res.redirect("/admin/usuarios")
    }
    async delUser(req,res){
        let id = req.params.id
        await User.delUser(id)
        res.redirect("/admin/usuarios")
    }
    async login(req,res){
        res.render("admin/users/login")
    }
    async authenticate(req,res){
        let {email, password} = req.body
        let user = await User.findByEmail(email)
        if(user === null){
            res.redirect("/login")
        } else {
           let corret = bcrypt.compareSync(password, user.password)
           if(corret){
                req.session.user ={
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin")
           }else {
                res.redirect("/login")
           }
        }
    } 
    async logout(req,res){
        req.session.user = undefined
        res.redirect("/")
    }
    
}

module.exports = new UserController()

