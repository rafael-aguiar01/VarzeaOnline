const User = require('../user/User')
const bcrypt = require('bcryptjs')

class Users {
    async findAll(){
        try {
            let result = await User.findAll()
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async findById(id){
        try {
            let result = await User.findByPk(id)
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async findByEmail(email){
        try {
            let result = await User.findOne({
                where: {
                    email: email
                }
            })
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async saveUser(email, password){
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        try {
            await User.create({
                email: email,
                password: password,
                password: hash,
            })
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async updateUser(id, email,password){
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        try {
            await User.update({
                email: email,
                password: hash
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
    async delUser(id){
        try {
            User.destroy({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err)
            return []  
        }
    }
    
}

module.exports = new Users()