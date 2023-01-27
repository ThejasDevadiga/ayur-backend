const asyncHandler = require("express-async-handler");
const path = require("path");

const consultHome = asyncHandler(async (req, res, next) => {
  res.render("Consultant/consultant", {
    title: "Consultant",
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
  consultHome,
};
