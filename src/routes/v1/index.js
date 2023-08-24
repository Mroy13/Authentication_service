const express=require('express');
const {authMiddleware}=require('../../middlewares');
const { infoController} = require('../../controllers');
const Routes=require('./auth-routes');
const router=express.Router();
router.use('/user',Routes);
router.get('/info',infoController.info);
module.exports=router;
