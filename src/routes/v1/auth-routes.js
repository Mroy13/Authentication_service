const express=require('express');
const {authController}=require ('../../controllers');
const {authMiddleware}=require('../../middlewares');
const router=express.Router();
 router.post('/signup',authController.createUser);
 router.post('/signin',authController.userSignin);
 router.get('/signout',authMiddleware.checkAuth,authController.userLogout);
// router.get('/',Controller.get);
// router.get('/:id',Controller.get);
module.exports=router