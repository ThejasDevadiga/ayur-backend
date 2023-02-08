const asyncHandler = require("express-async-handler");
const path = require("path");
const requestor = require("../../utils/requestor");

const receptHome = asyncHandler(async (req, res, next) => {
  var today = new Date();
  // today.setDate(today.getDate() -3)
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  res.render("Receptionist/receptionist", {
    title: "Receptionist",
    user: "Thejas Devadiga",
    controlles: {
      1: {
        linkName: "Patient Details",
        linkUrl: "/views/Receptionist/patientDetails.pug",
      },
      2: {
        linkName: "Appointments",
        linkUrl: "/views/Receptionist/viewAppointment/" + today,
      },
      3: {
        linkName: "Doctor Details",
        linkUrl: "/views/Receptionist/doctorDetails.pug",
      },
      4: {
        linkName: "Addmission",
        linkUrl: "/views/Receptionist/admission-patient.pug",
      },
      5:{
        linkName: "Book Appointment",
        linkUrl: "/views/Receptionist/preAppointment.pug",
      }
    },
  });
});

const PatientDetails =  asyncHandler(async (req, res, next)=> {
  res.render("Components/table", {
    heading: "Patient List",
    headName: ["Date", "Time", "Name", "Number", "Description"],
    appointments: [
      {
        date: "30",
        time: 16,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },
      {
        date: "21",
        time: 8,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },
      {
        date: "21",
        time: 16,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },
      {
        date: "30",
        time: 8,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },
      {
        date: "30",
        time: 16,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },
      {
        date: "21",
        time: 8,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },

      {
        date: "21",
        time: 16,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },
      {
        date: "30",
        time: 8,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },
      {
        date: "30",
        time: 16,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },
      {
        date: "21",
        time: 8,
        name: "Name of patient",
        number: 0987651234,
        description: "Description of patient",
      },
    ],
  });
});

const DoctorDetails = asyncHandler(async (req, res, next) => {
  res.render("Components/table", {
    heading: "Patient List",
    headName: ["Date", "Time", "Name", "Number", "Description"],
    appointments: [
      {
        date: "30",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },
      {
        date: "21",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },

      {
        date: "21",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },
      {
        date: "30",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },
      {
        date: "30",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },
      {
        date: "21",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },

      {
        date: "21",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },
      {
        date: "30",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },
      {
        date: "30",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },
      {
        date: "21",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        description: "Description of doctor",
      },
    ],
  });
});

const AppointmentTable =  asyncHandler(async (req, res, next) => {
  const fmDate = new Date(req.params["id"]);
  const toDate = new Date(req.params["id"]);
  toDate.setDate(toDate.getDate() + 10);
  let dates = [];
  const count = new Date(req.params["id"]);
  while (count.getTime() <= toDate.getTime()) {
    dates.push(count.getDate());
    count.setDate(count.getDate() + 1);
  }
  // var raw = JSON.stringify({
  //   requestedId: "Hello",
  //   filter:{},
  //   projection:{}
  // });
  // var result = await requestor(
  //   "POST",
  //   raw,
  //   "http://localhost:5000/api/Receptionist/make-Appointments"
  // );

  // data = JSON.parse(result);
  // console.log(data);
  // if (data.acknowledged) {
  //   document.getElementById("term").innerHTML = data;
  //   location.href = "/views/Receptionist/receptionist.pug";
  // }

  res.render("Components/scheduleTable", {
    title: "Schedules",
    heading:
      "Appointments from " +
      fmDate.getDate() +
      "-" +
      (fmDate.getMonth() + 1) +
      "-" +
      fmDate.getFullYear() +
      " to " +
      toDate.getDate() +
      "-" +
      (toDate.getMonth() + 1) +
      "-" +
      toDate.getFullYear(),
    listOfDates: dates,
    date: fmDate,
    month: fmDate.getMonth() + 1,
    year: fmDate.getFullYear(),
    frmDate: fmDate.getDate(),

    
    appointments: [
      {
        date: "21",
        time: 8,
        name: "Name of user",
        imgUrl: "/images/img_avatar.png",
        number: 0987651234,
        description: "Description of user",
      },

      {
        date: "21",
        time: 16,
        name: "Name of user",
        imgUrl: "/images/img_avatar.png",
        number: 0987651234,
        description: "Description of user",
      },
      {
        date: "30",
        time: 8,
        name: "Name of user",
        imgUrl: "/images/img_avatar.png",
        number: 0987651234,
        description: "Description of user",
      },
      {
        date: "30",
        time: 16,
        name: "Name of user",
        imgUrl: "/images/img_avatar.png",
        number: 0987651234,
        description: "Description of user",
      },
    ],
  });
});

const bookAppointment =  asyncHandler(async (req, res, next) => {
  const patientID =req.params["pid"];
  const patientName = req.params["name"];
  res.render("receptionist/bookAppointment", {
    title:"Appointments",
    patientId:patientID,
    patientName:patientName
  });
});

const patientAddmission =  asyncHandler(async (req, res, next) => {
  res.render("Components/form", {});
});

const preAppointment =  asyncHandler(async (req, res, next)=>{
  res.render("Receptionist/pre-Appointment",{})
})

module.exports = {
  receptHome,
  PatientDetails,
  AppointmentTable,
  DoctorDetails,
  patientAddmission,
  bookAppointment,
  preAppointment
};
