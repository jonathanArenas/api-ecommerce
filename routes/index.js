const { Router } = require('express')
const router = Router()
const categoriesProductController = require('../controllers/categoriesProductoController.js')
const productController = require('../controllers/productController.js')
const addressController = require('../controllers/addressController.js')
const userController = require('../controllers/userController.js')
const loginController = require('../controllers/loginController.js')


router.post('/api/categories', categoriesProductController.store)
router.get('/api/categories', categoriesProductController.list)
router.get('/api/categories/:idCategorie', categoriesProductController.show)
router.put('/api/categories/:idCategorie', categoriesProductController.update)
router.delete('/api/categories/:idCategorie',categoriesProductController.destroy)
//routes Products
router.post('/api/product', productController.store)
router.get('/api/products', productController.list)
router.get('/api/product/:idProduct', productController.show)
router.put('/api/product/:idProduct', productController.update)
router.delete('/api/product/:idProduct', productController.destroy)
//routes Addres
router.post('/api/address', addressController.store)
router.get('/api/address', addressController.list)
router.get('/api/address/:idAddress', addressController.show)
router.put('/api/address/:idAddress', addressController.update)
router.delete('/api/address/:idAddress',addressController.destroy)
//routes User
router.post('/api/user', userController.store)
router.get('/api/users', userController.list)
router.get('/api/user/:idUser', userController.show)
router.put('/api/user/:idUser', userController.update)
router.delete('/api/user/:idUser', userController.destroy)
// routes login
router.post('/api/signup', loginController.signup)
router.post('/api/signin', loginController.signin) 


module.exports = router