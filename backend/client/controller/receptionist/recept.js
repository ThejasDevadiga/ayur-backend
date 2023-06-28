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
        linkUrl: "/views/Receptionist/appointmentsList.pug",
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
      6: {
        //
        linkName: "File download",
        linkUrl: "/views/download-file.pug",
      },
    },
  });
});

const PatientDetails = asyncHandler(async (req, res, next) => {
  res.render("Components/table", {
    heading: "Patient List",
    buttonName: "Book Appointment",
    buttonClass: "pat-list",
    tableID: "patientlist",
  });
});

const appointmentsList = asyncHandler(async (req, res, next) => {
  res.render("Components/table", {
    heading: "Appointment List",
    buttonName: "Book Appointment",
    buttonClass: "pat-list",
    tableID: "appointments",
  });
});

// appointments
const DoctorDetails = asyncHandler(async (req, res, next) => {
  // var raw = JSON.stringify({
  //   requestedId: "Hello",
  //   filter: {},
  //   projection: {},
  // });
  // const result = await requestor(
  //   "POST",
  //   raw,
  //   "https://ayur.vercel.app/api/Receptionist/get-doctor-list"
  // );

  // if (result==null ){
  //   res.render("Receptionist/receptionist", {})
  // }
  // const headings = Object.keys(result[0])

  res.render("Components/table", {
    heading: "DOCTOR LIST",
    buttonName: "Appointments",
    buttonClass: "doc-list",
    tableID: "doctorlist",
  });
});

const AppointmentTable = asyncHandler(async (req, res, next) => {
  const fmDate = new Date(req.params["date"]);
  const toDate = new Date(req.params["date"]);
  const doctorID = req.params["docId"];

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
        Timing: { date, time },
        PatientID: {
          Basic: { Fname, Mname, Lname, Gender, Phone, Age },
          PatientID,
          Status,
        },
      } = item;
      return {
        Name: Fname + " " + Mname + " " + Lname,
        Sex: Gender,
        PhoneNo: Phone,
        Age: Age,
        ID: PatientID,
        Status: Status,
        date: date.slice(8, 10),
        month: date.slice(5, 7),
        year: date.slice(0, 4),
        time: parseInt(time),
        imgUrl: "/images/img_avatar.png",
      };
    });
  }

  let raw = JSON.stringify({
    requestedId: "Hello",
    DoctorId: doctorID,
  });
  let result = await requestor(
    "POST",
    raw,
    "https://ayur.vercel.app/api/Receptionist/get-appointment-details"
  );
  // result  =  JSON.parse(result)

  if (result != null) {
    let data = extractedData(result);

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

      appointments: data,
    });
  } else {
    res.render("Components/scheduleTable", {
      title: "Schedules",
      heading: "Something went wrong!!!",

      listOfDates: dates,
      date: fmDate,
      month: fmDate.getMonth() + 1,
      year: fmDate.getFullYear(),
      frmDate: fmDate.getDate(),

      appointments: [],
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

const updateAppointment = asyncHandler(async (req, res) => {
  res.render("Receptionist/modal.pug", {});
});

const profilePage = asyncHandler(async (req, res, next) => {
  const patientID = req.params["id"];

  let raw = JSON.stringify({
    requestedId: "Hello",
    patientID: patientID,
  });

  let result = await requestor(
    "POST",
    raw,
    "https://ayur.vercel.app/api/Receptionist/patient-AppointmentList"
  );

  // result  =  JSON.parse(result)

  if (result != null) {
    console.log(result);
    const {
      Basic: { Fname, Mname, Lname, Gender, Phone, Age, Address, City },
      PatientID,
      Status,
      Appointments,
    } = result;
    const LastAppointment = Appointments[Appointments.length - 1];
    console.log(LastAppointment);
    // let weight,height,pulse,respiratoryRate,Date,bloodPressure= {systolic:""};
    if (LastAppointment && LastAppointment["VitalsData"]) {
      const {
        VitalsData: {
          weight,
          height,
          pulse,
          respiratoryRate,
          bloodPressure,
          Date,
        },
      } = LastAppointment;

      res.render("Receptionist/profile", {
        title: " ",
        message: "Hello there!",
        Name: Fname + " " + Mname + " " + Lname,
        patientId: PatientID,
        Status,
        Address: Address + ", " + City,
        Phone,
        Age,
        Gender,
        weight: weight ? weight : "",
        height: height ? height : "",
        pulse: pulse ? pulse : "",
        respiratoryRate,
        bloodPressure: bloodPressure["systolic"],
        Date: Date ? Date.slice(0, 10) : "",
        Appointments,
      });
    } else {
      res.render("Receptionist/profile", {
        title: " ",
        message: "Hello there!",
        Name: Fname + " " + Mname + " " + Lname,
        patientId: PatientID,
        Status,
        Address: Address + ", " + City,
        Phone,
        Age,
        Gender,
        weight: "",
        height: "",
        pulse: "",
        respiratoryRate: "",
        bloodPressure: "",
        Date: "",
        Appointments,
      });
    }
  }
});

const csvFileDownloaderPage = asyncHandler(async (req, res) => {
  res.render("admin/csv-downloader", {});
});
module.exports = {
  receptHome,
  PatientDetails,
  AppointmentTable,
  DoctorDetails,
  patientAddmission,
  bookAppointment,
  preAppointment,
  updateAppointment,
  preSchedule,
  profilePage,
  csvFileDownloaderPage,
  appointmentsList,
};
