const express=require('express')
const router=express.Router()
const {
    registerUser,
    loginUser,
    currentUser
}=require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')


router.get('/current',validateToken,currentUser)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)




module.exports=router