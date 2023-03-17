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
        linkUrl: "/views/Receptionist/preSchedule.pug",
      },
      3: {
        linkName: "Doctor Details",
        linkUrl: "/views/Receptionist/doctorDetails.pug",
      },
      4: {
        linkName: "Addmission",
        linkUrl: "/views/Receptionist/admission-patient.pug",
      },
      5: {
        linkName: "Book Appointment",
        linkUrl: "/views/Receptionist/preAppointment.pug",
      },
    },
  });
});

const PatientDetails = asyncHandler(async (req, res, next) => {
  var raw = JSON.stringify({
    requestedId: "Hello",
    filter: {},
    projection: { PatientID: 0 },
  });
  const patData = await requestor(
    "POST",
    raw,
    "http://localhost:5000/api/Receptionist/get-patient-details"
  );
  result = patData
  if (result==null){
    res.render("Receptionist/receptionist", {})
  }
  function extractBasicData(data) {
    return data.map((item) => {
      const {
        Basic: { Fname, Mname, Lname, DateOfBirth, Gender, Phone, Age, City },
        PatientID,
        Status,
        Appointments,
      } = item;

      return {
        Name: Fname + " " + Mname + " " + Lname,
        Sex: Gender,
        "Ph.No": Phone,
        DOB: DateOfBirth.slice(0, 10),
        Age,
        City: City,
        ID: PatientID,
        Status,
        Appointments: Appointments.length,
      };
    });
  }
  const resp = extractBasicData(result);

  res.render("Components/table", {
    heading: "Patient List",
    headName: Object.keys(resp[0]),
    appointments: resp,
    buttonName:"Book Appointment",
    buttonClass:"pat-list"
  });
});

const DoctorDetails = asyncHandler(async (req, res, next) => {
  res.render("Components/table", {
    heading: "Patient List",
    buttonName:"Appointment",
    buttonClass:"doc-list",
    headName: ["Date", "Time", "Name", "Number", "Description"],
    appointments: [
      {
        date: "30",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },
      {
        date: "21",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },

      {
        date: "21",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },
      {
        date: "30",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },
      {
        date: "30",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },
      {
        date: "21",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },

      {
        date: "21",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },
      {
        date: "30",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },
      {
        date: "30",
        time: 16,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },
      {
        date: "21",
        time: 8,
        name: "Name of doctor",
        number: 0987651234,
        EmployeeID:"EMP-2018-120293",
        description: "Description of doctor",
      },
    ],
  });
});

const AppointmentTable = asyncHandler(async (req, res, next) => {
  const fmDate = new Date(req.params["date"]);
  const toDate = new Date(req.params["date"]);
  const doctorID = req.params["docId"]
  toDate.setDate(toDate.getDate() + 10);
  let dates = [];
  const count = new Date(req.params["date"]);
  while (count.getTime() <= toDate.getTime()) {
    dates.push(count.getDate());
    count.setDate(count.getDate() + 1);
  }

  function extractedData(data) {
    return data.map((item) => {
      const {
        Timing:{date,time},
        PatientID:{Basic: { Fname, Mname, Lname, Gender, Phone, Age },PatientID,Status},
      } = item;
      return {
        Name: Fname + " " + Mname + " " + Lname,
        Sex: Gender,
        PhoneNo: Phone,
        Age:Age,
        ID: PatientID,
        Status:Status,
        date:date.slice(8,10),
        month:date.slice(5,7),
        year:date.slice(0,4),
        time:parseInt(time),
        imgUrl: "/images/img_avatar.png"
      };
    });
  }

  var raw = JSON.stringify({
    requestedId: "Hello",
    DoctorId:doctorID
  });
  var result = await requestor(
    "POST",
    raw,
    "http://localhost:5000/api/Receptionist/get-appointment-details"
  );
  // result  =  JSON.parse(result)
  console.log("res",result);
  if ( result!=null) {
    
    data =extractedData( result)
    
  
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
    
    appointments:data
  });
}
else{
  
  res.render("Components/scheduleTable", {
    title: "Schedules",
    heading:
      "Something went wrong!!!" ,
     
    listOfDates: dates,
    date: fmDate,
    month: fmDate.getMonth() + 1,
    year: fmDate.getFullYear(),
    frmDate: fmDate.getDate(),

    appointments:[]
  });
}
});


// imgUrl: "/images/img_avatar.png",
const bookAppointment = asyncHandler(async (req, res, next) => {
  const patientID = req.params["pid"];
  const patientName = req.params["name"];
  res.render("receptionist/bookAppointment", {
    title: "Appointments",
    patientId: patientID,
    patientName: patientName,
  });
});

const patientAddmission = asyncHandler(async (req, res, next) => {
  res.render("Components/form", {});
});

const preAppointment = asyncHandler(async (req, res, next) => {
  res.render("Receptionist/pre-Appointment", {});
});

const preSchedule = asyncHandler(async (req, res, next) => {
  res.render("Receptionist/doctor-Schedule", {});
});

module.exports = {
  receptHome,
  PatientDetails,
  AppointmentTable,
  DoctorDetails,
  patientAddmission,
  bookAppointment,
  preAppointment,
  preSchedule
};
