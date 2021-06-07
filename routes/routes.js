const express = require("express")
// var app = express();
const router = express.Router()
const HomeController = require("../controllers/HomeController")
const CategoryController = require("../controllers/CategoryController")
const NewController = require("../controllers/NewController")
const UserController = require("../controllers/UserController")
const adminAuth = require("../middlewares/adminAuth")


router.get('/', HomeController.index);
router.get("/login", UserController.login)
router.post("/authenticate", UserController.authenticate)
router.get('/admin', adminAuth, HomeController.admin)
router.post ("/logout", adminAuth,  UserController.logout)

router.get('/:slug', NewController.news)
router.get('/editoriais/:slug/', CategoryController.index)
router.get('/editoriais/:slug/:num', CategoryController.pages)


router.get('/admin/noticias', adminAuth,  NewController.listNews)
router.get('/noticias/incluir', adminAuth, NewController.createNews)
router.post('/noticias/salvar', adminAuth, NewController.saveNews)
router.get('/noticias/editar/:id', adminAuth, NewController.editNews)
router.post('/noticias/atualizar', adminAuth, NewController.updateNews)
router.post('/noticias/deletar/:id',adminAuth, NewController.delNews)

router.get('/admin/categorias', adminAuth, CategoryController.listCategories)
router.get('/categoria/incluir', adminAuth, CategoryController.createCategory)
router.post('/categories/salvar',adminAuth, CategoryController.saveCategory)
router.get('/editoral/editar/:id',adminAuth, CategoryController.editCategory)
router.post('/editorial/atualizar/',adminAuth, CategoryController.updateCategory)
router.post('/editoral/deletar/:id', adminAuth, CategoryController.delCategory)

router.get('/admin/usuarios', adminAuth, UserController.index)
router.get('/admin/usuarios/incluir', adminAuth, UserController.createUser)
router.post('/usuarios/salvar', adminAuth, UserController.saveUser)
router.get('/usuarios/editar/:id', adminAuth, UserController.editUser)
router.post('/usuarios/atualizar', adminAuth, UserController.updateUser)
router.post('/usuarios/deletar/:id', adminAuth, UserController.delUser)


module.exports = router;
