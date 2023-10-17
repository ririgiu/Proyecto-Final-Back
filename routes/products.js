const express = require('express')
const { check } = require ('express-validator')
const router = express.Router()
const { getAllProducts, getOneProducts, createProduct, 
    updateProduct, deleteProduct } = require('../controllers/products')

router.get('/', getAllProducts)
router.get('/:id',[
    check('id', 'formato ID incorrecto').isMongoId(),
], getOneProducts)
router.post('/',
[check('nombre', 'campo nombre esta vacio').notEmpty(),
check('precio', 'campo precio esta vacio').notEmpty(),
check('codigo', 'campo codigo esta vacio').notEmpty()
] , createProduct)
router.put('/:id',[
    check('id', 'formato ID incorrecto').isMongoId(),    
], updateProduct)
router.delete('/:id',[check('id', 'formato ID incorrecto').isMongoId()
], deleteProduct)

module.exports = router