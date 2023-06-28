const asyncHandler = require("express-async-handler");
const path = require("path");
const requestor = require("../../utils/requestor");

const managerHome = asyncHandler(async (req, res, next) => {
  res.render("Manager/manager", {
    title: "Manager",
    user: "Thejas Devadiga",
    cardHeading:"Card testing",
    cardTagline:"Card tagline is good",
    cardDescription:"lorem gipsum doloro sit amet",
    cardImg:"/images/classes-1.jpg",
    cardBtnName:"Get details",
    controlles: {
      1: {
        linkName: "Patient Details",
        linkUrl: "/views/Manager/patient-details.pug",
      },
      2: {
        linkName: "Appointments",
        linkUrl: "/views/Manager/pre-appointment.pug",
      },
      // 3: {
      //   linkName: "Drugs",
      //   linkUrl: "/views/Manager/drug-details",
      // },
      4: {
        linkName: "Addmission",
        linkUrl: "/views/Manager/patient-addmission",
      },
    }
  })
})

const drugDetails = asyncHandler(async (req, res, next) => {
  var raw = JSON.stringify({
    requestedId: "Hello",
    filter: {},
    projection: { PatientID: 0 },
  });
  
  const patData = await requestor(
    "POST",
    raw,
    "http:localhost:5000/api/manager/get-drug-details"
  );
  result = JSON.parse(patData).data;
 
  function extractBasicData(data) {
    return data.map((item) => {
      const {
       drugID,drugName
      } = item;

      return {
        Name: drugName,
       ID: drugID
      };
    });
  }

  const resp = extractBasicData(result);
  res.render("Components/table", {
    heading: "Patient List",
    headName: Object.keys(resp[0]),
    appointments: resp,
  });
});




module.exports = {
  managerHome,drugDetails
};
