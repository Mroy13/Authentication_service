const StatusCode=require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {userService}=require('../services');

async function createUser(req, res) {
    try {
           const userInfo = await userService.createUser({
                  firstName: req.body.firstName,
                  lastName:req.body.lastName,
                  email: req.body.email,
                  password:req.body.password
           });
           SuccessResponse.data = userInfo;
           return res
                  .status(StatusCode.CREATED)
                  .json(SuccessResponse);
    }
    catch (error) {
           //console.log(error);
           ErrorResponse.error = error;
           return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }


}
async function userSignin(req, res) {
    try {
           const userInfo = await userService.userSignin({
                  email: req.body.email,
                  password:req.body.password
           },res);
           SuccessResponse.data = userInfo;
           return res
                  .status(StatusCode.CREATED)
                  .json(SuccessResponse);
    }
    catch (error) {
          console.log(error);
           ErrorResponse.error = error;
           return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }


}

async function userLogout(req,res){
       try {
       const response=await userService.userLogout(res);
           SuccessResponse.message="logout successfully"
            return res
                  .status(StatusCode.CREATED)
                  .json(SuccessResponse);
    }
    catch (error) {
          console.log(error);
           ErrorResponse.error = error;
           return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }
}
module.exports={
    createUser,
    userSignin,
    userLogout
}