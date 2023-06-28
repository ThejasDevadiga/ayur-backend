const asyncHandler = require("express-async-handler");
const path = require("path");

const adminHome = asyncHandler(async (req, res, next) => {
  res.render("Admin/admin", {
    title: "Admin",
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
        linkName: "Drugs",
        linkUrl: "#",
      },
      4: {
        linkName: "Upload report",
        linkUrl: "#",
      },
    }
  })
})

module.exports = {
  adminHome,
};
