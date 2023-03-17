const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const user = require("../../models/admin/users");
const Employee  = require('../../models/Employee/EmployeeDataScheme')
const { model } = require("mongoose");

const validateUser = asyncHandler(async (req, res) => {
  const { requestedId } = req.body;
  if (!requestedId) {
    throw new Error("Request ID required");
  }
  try {
    const { username, password } = req.body;
    const findUser = await user.find({ Username: username })
    .populate({
      path:"EmployeeData",
      model:Employee
    })
    
    if (!findUser) {
      throw new Error("Invalid username and password !");
    } else {
      if (findUser.Password == password) {
        const updateUser = await user.updateOne(
          { Username: username },
          {
            $set: {
              Status: "ACTIVE",
            },
          }
        );
        if (updateUser.matchedCount) {
          res.status(200).json({
            acknowledged: true,
            token: generateToken(username + findUser.Designation),
            userROle: findUser.Designation,
            userName: username,
            userId: findUser.EmployeeID,
            message: "Successfully logged in",
          });
        }
        else{
          throw new Error("Error while updating user status")
        }
      } else {
        throw new Error("Invalid password !");
      }
    }
  } catch (err) {
    res.status(400).json({
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
