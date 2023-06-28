const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const user = require("../../models/admin/users");
const Employee  = require('../../models/Employee/EmployeeDataScheme')
const Warden = require('../../models/wardens/wardensList')
const validateUser = asyncHandler(async (req, res) => {
  const { requestedId } = req.body;
  if (!requestedId) {
    throw new Error("Request ID required");
  }
  try {
    const { username, password } = req.body;
    const userCred = await user.findOne({ Username: username })
    
    // .populate({
    //   path:"EmployeeID",
    //   model:Employee
    // })
   
    
    if (!userCred) {
      throw new Error("Invalid username  !");
    } else {
      
      if (userCred.Password == password) {
        const updateUser = await user.updateOne(
          { Username: username },
          {
            $set: {
              Status: "ACTIVE",
            },
          }
        );
         if (updateUser.matchedCount) {
          if(userCred.Designation=="warden"){
            const foundUser = await user.findOne({ Username: username })
            .populate({
              path:"EmployeeID",
              model:Warden
            })
            const {Hospital,EmpID} = foundUser.EmployeeID;
 
            res.status(200).json({
              acknowledged: true,
              token: generateToken(username + foundUser.Designation),
              userRole: foundUser.Designation,
              userName: username,
              userID: EmpID,
 
              message: "Successfully logged in",
            });
          }
          
          else{
            const foundndUser = await user.findOne({ Username: username })
            .populate({
              path:"EmployeeID",
              model:Employee
            })
            const {Hospital,EmployeeID} = foundndUser.EmployeeID;
           
            res.status(200).json({
              acknowledged: true,
              token: generateToken(username + foundndUser.Designation),
              userRole: foundndUser.Designation,
              userName: username,
              userID: EmployeeID,
              Hospital: Hospital,
              message: "Successfully logged in",
            });
          }
           
         
        
        }
        else{
          throw new Error("Error while updating user status")
        }
      } else {
        throw new Error("Invalid password !");
      }
    }
  } catch (err) {
    res.status(500).json({
      acknowledged: false,
      message: err.message,
    });
  }
});

const insertUser = asyncHandler(async (req, res) => {
  const { requestedId } = req.body;
  if (!requestedId) {
    throw new Error("Request ID required");
  }
  try {
    const { username, password } = req.body;
    const findUser = await user.findOne({ Username: username });
    if (findUser) {
      throw new Error("username already exist");
    } else {
      const createUser = await user.create({
        Username: username,
        Password: password,
      });
      if (createUser) {
        res.status(200).json({
          acknowledged: true,
          message: "Successfully created user",
        });
      } else {
        throw new Error("Invalid password!!!");
      }
    }
  } catch (err) {
    res.status(400).json({
      acknowledged: true,
      message: err.message,
    });
  }
});



module.exports = { validateUser, insertUser };
