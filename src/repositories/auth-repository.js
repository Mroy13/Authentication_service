const {User}=require('../models');
const crudRepository=require('./crud-repository');
class userRepository extends crudRepository{
    constructor(){
        super(User);
    }
    async findUser(data){
        try {
            const res=await User.findOne({where:{
                email:data,
            }});
            return res;
        } catch (error) {
            throw error
        }
    }
}

module.exports=userRepository;