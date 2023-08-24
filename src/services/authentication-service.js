const StatusCode=require('http-status-codes');
const bcrypt = require('bcrypt');
const {userRepository}=require('../repositories');
const {ServerConfig}=require('../config');
const {Auth}=require('../utils/common')
const Apperror=require('../utils/error/App-error');
const UserRepository= new userRepository();

async function createUser(data){
  try {
    const user=await UserRepository.create(data);
    return user.firstName;
  } catch (error) {
   // console.log(error.name);
    if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
        let errorRes=[];
        error.errors.forEach((err)=> {
            errorRes.push(err.message);
        });
        throw new Apperror(errorRes,StatusCode.BAD_REQUEST)
    }
    console.log(error);
    throw new Apperror("request not resolved due to server side problem",StatusCode.INTERNAL_SERVER_ERROR);

  }
}

async function userSignin(data,res){
  try {
    const userData=await UserRepository.findUser(data.email);
    if(!userData){
      throw new Apperror("user not found",StatusCode.NOT_FOUND);
    }
    const response=bcrypt.compareSync(data.password,userData.password);
    if(!response){
      throw new Apperror("invalid password",StatusCode.UNAUTHORIZED);
    }
    const jwtToken = Auth.createJwttoken({ id: userData.id, email: userData.email }, ServerConfig.SECRET_KEY);
    // console.log(jwtToken);
    let options = {
      maxAge: 5 * 60 * 1000, // would expire in 5minutes
      httpOnly: true, // The cookie is only accessible by the web server
      secure: true,
      sameSite: 'None',
    };

    res.cookie('SessionID', jwtToken, options);
    return userData.firstName;
   // return jwtToken;
  } catch (error) {
     console.log(error);
      throw error;
  }
}

async function isAuthenticated(token) {
  try {
      const res=Auth.verifyToken(token, ServerConfig.SECRET_KEY);
      if (res) {
          const user = await UserRepository.get(res.data.id);
          if (!user) {
              throw new Apperror("user not found", StatusCode.BAD_REQUEST);
          }
          return user.id;
      }

  } catch (error) {
      //console.log(error);
      throw error;
  }
}

async function userLogout(res){
     try {
     res.clearCookie("SessionID",{ path: '/' });
     // res.setHeader('Clear-Site-Data', '"cookies", "storage"');
      console.log("logout successfully logout");
     } catch (error) {
      throw error;
     }
}

module.exports={
  createUser,
  userSignin,
  isAuthenticated,
  userLogout
}