const {Router} = require ('express')
const {check} = require('express-validator')
const { getAllUser, getOneUser, createUser, updateUser, deleteUser, loginUser } = require('../controllers/user')
const router = Router()

router.get('/', getAllUser)
router.get('/:id',[
    check('id', 'Formato ID incorrecto').isMongoId()
], getOneUser)

router.post('/register',[
    check('userName', 'campo de USERNAME vacio').notEmpty(),
    check('userName', ' MAX: 50 caracteres').isLength({ max: 50}),
    check('pass', 'campo de CONTRASEÑA vacio').notEmpty(),   
    check('pass', 'MIN: 8 caracteres. MAX: 50 caracteres').isLength({min: 8, max: 50}),  
], createUser)
router.post('/login',[
    check('username', 'campo de USERNAME vacio').notEmpty(),
    check('pass', 'campo de CONTRASEÑA vacio').notEmpty(),
], loginUser)

router.put('/:id',[
    check('id', 'formato Id incorrecto').isMongoId()
], updateUser)
router.delete('/:id',[
    check('id', 'formato Id incorrecto').isMongoId()
], deleteUser)

module.exports = router
