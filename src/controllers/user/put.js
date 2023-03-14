const generateId = require("../../utils/GenerateId");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const user = require("../../models/admin/users");

const updatePassword = asyncHandler(async (req, res) => {
  try {
    const { requestedId, username, oldpassword, newpassword } = req.body;
    const findUser = await user.findOne({ Username: username });
    if (!findUser) {
      throw new Error("User does'nt exist");
    } else {
      if (findUser.password === oldpassword) {
        const updateUser = await user.updateOne(
          { Username: username },
          {
            $set: {
              Password: newpassword,
            },
          }
        );
        if (!updateUser) {
          throw new Error("error while updating password");
        }
        res.status(200).json({
          acknowledged: true,
          token: generateToken(requestedId),
          message: "Successfully changed password",
        });
      } else {
        throw new Error("Invalid password!!!");
      }
    }
  } catch (err) {
    res.status(400).json({
      acknowledged: true,
      token: generateToken(requestedId),
      message: err.message,
    });
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  try {
    const { requestedId, userID } = req.body;
    if (!requestedId, !userID) {
      throw new Error("Constraints not found!");
    }
    const updateUser = await user.findOneAndUpdate(
      { Username: userID },
      {
        $set: {
          Status: "INACTIVE",
        },
      }
    );
    if (updateUser!=null) {
      console.log(updateUser);
      res.status(200).json({
      acknowledged: true,
      userName: userID,
      message: "Successfully logged out",
      });
    }
    else{
      throw new Error("No match found ");
    }
  } catch (err) {
    res.status(500).json({
      acknowledged: false,
      message: err.message,
    });
  }
});

module.exports = { updatePassword, logOutUser };
