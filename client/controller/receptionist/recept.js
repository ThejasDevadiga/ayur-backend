const asyncHandler = require("express-async-handler");
const path = require("path");

const receptHome = asyncHandler(async (req, res, next) => {
  res.render("Receptionist/receptionist", {
    title: "Receptionist",
    user: "Thejas Devadiga",
    controlles: {
      1: {
        linkName: "Patient Details",
        linkUrl: "#",
      },
      2: {
        linkName: "Appointments",
        linkUrl: "#",
      },
      3: {
        linkName: "Doctor Details",
        linkUrl: "#",
      },
      4: {
        linkName: "Available doctor",
        linkUrl: "#",
      },
    }
  })
})

module.exports = {
    receptHome,
};
