const asyncHandler = require("express-async-handler");
const path = require("path");

const managerHome = asyncHandler(async (req, res, next) => {
  res.render("Manager/manager", {
    title: "Manager",
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
  managerHome,
};
