const asyncHandler = require("express-async-handler");
const path = require("path");
const requestor = require("../../utils/requestor");


const consultHome = asyncHandler(async (req, res, next) => {
  var today = new Date();
  // today.setDate(today.getDate() -3)
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
const docID = req.params["id"]
today =  yyyy + '-' + mm + '-' +dd;
  res.render("Consultant/consultant", {
    title: "Consultant",
    user: "Thejas Devadiga",
    controlles: {
      1: {
        linkName: "Patient Details",
        linkUrl: '/views/Consultant/patientDetails.pug',
      },
      // 2: {
      //   linkName: "view Appointments",
      //   linkUrl: "/views/Consultant/viewAppointment/"+today+"&"+docID,
      // },
      // 3: {
      //   linkName: "Drugs",
      //   linkUrl: "#",
      // },
      4: {
        linkName: "Upload report",
        linkUrl: "/views/Consultant/Prescribe.pug",
      },
    }
  })
})


 
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

  // console.log(fmDate);
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
    result  =  JSON.parse(result)
    if (result.acknowledged) {
       
      data = result.data
      data =extractedData( data)
      
    
      // console.log(data);
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
  
      appointments:[]
    });
  }
  });

const PatientDetails = asyncHandler(async(req,res) =>{
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
    res.render("/", {})
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
    buttonName:"Appointment",
    buttonClass:"prescription"
  });
})

const addPrescription = asyncHandler(async(req,res)=>{
  const PatientID =  req.params['id'];
  // console.log(PatientID); 
  var raw = JSON.stringify({
    requestedId: "Hello",
    patientID:PatientID
  });
  const result = await requestor(
    "POST",
    raw,
    "http://localhost:5000/api/consultant/patient-Appointments"
  );
    // console.log(result);
  if (result==null){
    console.log("Data not found!");
    // location.href = "/views/Consultant/consultant.pug"
  }
    const {
      Basic: { Fname, Mname, Lname,Email, DateOfBirth, Gender, Phone, Age,Address, City,State },  
      Appointments,

    } = result;

    const history = {
      patientFName: Fname,
      patientMName: Mname,
      patientLName: Lname,
      Sex: Gender,
      PhNo: Phone,
      DOB: DateOfBirth.slice(0, 10),
      Age,
      Email,
      Address,
      City: City,
      State,
      ID: PatientID,
      Appointments: Appointments,
    };
    // console.log(history);
   
  res.render('Consultant/uploadReport',{
    patientFName: history.patientFName,
      patientMName: history.patientMName,
      patientLName: history.patientLName,
      Sex:history.Sex,
      Age:history.Age,
      DateOfBirth:history.DOB,
    email:history.Email,
    phoneNumber:history.PhNo,
    patientID:PatientID,
    Appointments:history.Appointments
  })
})

const examinDate = asyncHandler(async(req,res)=>{
  const PatientID =  req.params['patid'];
  const appointmentID =  req.params['aptid'];
  // console.log(PatientID); 
  var raw = JSON.stringify({
    requestedId: "Hello",
    patientID:PatientID
  });
  const result = await requestor(
    "POST",
    raw,
    "http://localhost:5000/api/consultant/patient-Appointments"
  );
    // console.log(result);
  if (result==null){
    console.log("Data not found!");
    // return
    // location.href = "/views/Consultant/consultant.pug"
  }
    const {
      Basic: { Fname, Mname, Lname,Email, DateOfBirth, Gender, Phone, Age,Address, City,State },  
      Appointments,

    } = result;

    const history = {
      patientFName: Fname,
      patientMName: Mname,
      patientLName: Lname,
      Sex: Gender,
      PhNo: Phone,
      DOB: DateOfBirth.slice(0, 10),
      Age,
      Email,
      Address,
      City: City,
      State,
      ID: PatientID,
      Appointments: Appointments,
    };
    
  res.render('Consultant/examin',{
    patientFName: history.patientFName,
      patientMName: history.patientMName,
      patientLName: history.patientLName,
      Sex:history.Sex,
      Age:history.Age,
      DateOfBirth:history.DOB,
    email:history.Email,
    phoneNumber:history.PhNo,
    patientID:PatientID,
    appointmentID:appointmentID,
    Appointments:history.Appointments
  })
})

module.exports = {
  consultHome,AppointmentTable,PatientDetails,addPrescription,examinDate
};
