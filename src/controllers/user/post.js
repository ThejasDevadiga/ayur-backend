const generateId = require('../../utils/GenerateId')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
const user = require('../../models/admin/users')


const validateUser = asyncHandler(async(req,res)=>{
    const {requestedId} = req.body;
    if(!requestedId){
      throw new Error("Request ID required")
    }
  try{
      const { 
        username,
        password,
      } = req.body;
    const findUser = await user.findOne({Username:username});
    if (!findUser) {
      throw new Error("Invalid username!!!")
    }
    else{
        if (findUser.Password==password ){
            res.status(200).json({
                acknowledged : true,
                token:generateToken(username),
                userROle:"",
                userName:username,
                message : "Successfully logged in"
              })
        }
        else{
            throw new Error("Invalid password!!!")
        }
    }
    }
    catch(err){
      res.status(400).json({
        acknowledged : false,
        message : err.message
      })
    }
  })


  const insertUser = asyncHandler(async(req,res)=>{
    const {requestedId} = req.body;
    if(!requestedId){
      throw new Error("Request ID required")
    }
    try{
      const { 
        username,
        password,
      } = req.body;
    const findUser = await user.findOne({Username:username});
    if (findUser) {
      throw new Error("username already exist")
    }
    else{
        const createUser = await user.create({Username:username,Password:password});
        if (createUser){
            res.status(200).json({
                acknowledged : true,
                message : "Successfully created user"
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
        message : err.message
      })
    }
  })


module.exports = {validateUser,insertUser}