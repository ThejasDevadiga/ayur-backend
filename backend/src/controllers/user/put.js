const generateId = require('../../utils/GenerateId')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
const user = require('../../models/admin/users')


const updatePassword = asyncHandler(async(req,res)=>{
    try{
      const { 
        requestedId,
        username,
        oldpassword,
        newpassword
      } = req.body;
    const findUser = await user.findOne({Username:username});
    if (!findUser) {
      throw new Error("User does'nt exist")
    }
    else{
        if (findUser.password===oldpassword ){
            const updateUser = await user.updateOne({Username:username},
                {
                    $set:
                        {
                            Password:newpassword  
                        }
                });
            if (!updateUser) {
                throw new Error("error while updating password")
            }
            res.status(200).json({
                acknowledged : true,
                token:generateToken(requestedId),
                message : "Successfully changed password"
              })
        }
        else{
            throw new Error("Invalid password!!!")
        }
    }
    }
    catch(err){
      res.status(400).json({
        acknowledged : true,
        token:generateToken(requestedId),
        message : err.message
      })
    }
  })


module.exports = {updatePassword}