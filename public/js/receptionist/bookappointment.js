 
window.addEventListener("load", () => {
  sessionStorage.setItem((key = "Role"), (value = "warden"));
  sessionStorage.setItem((key = "userName"), (value = "user123455"));
  sessionStorage.setItem((key = "userId"), (value = "user123455"));

  const Role = sessionStorage.getItem("Role");
  if (Role == "receptionist") {
    document.getElementById("receptionist").checked = true;
  } else if (Role == "warden") {
    document.getElementById("warden").checked = true;
  }

  // radioBtn = document.getElementById('warden')
  // radioBtn.onclick=()=>{
  //     console.log('warden radio button is checked');
  //     document.getElementById("term").innerHTML
  // }
  // radioBtn = document.getElementById('receptionist')
  // radioBtn.onclick=()=>{
  //     console.log('receptionist radio button is checked');
  // }

  async function appointmentPatient() {
    const PatientID = document.getElementById("pid").value;
    const PatientName = document.getElementById("name").value;
    const date = document.getElementById("apntDate").value;
    const time = document.getElementById("apntTime").value;
    const department = document.getElementById("department").value;
    const doctorName = document.getElementById("doctorName").value;
    const Description = document.getElementById("description").value;
    const Symptoms = document.getElementById("symptoms").value;
    const doctorID = document.getElementById("doctorID").value;
    const WardenName = sessionStorage.getItem("userName");
    const WardenID = sessionStorage.getItem("userId");
    const AppointmentID = GenerateId("APNT")

    // document.getElementById("term").innerHTML = [
    //   PatientID, //
    //   PatientName,
    //   AppointmentID, //
    //   date, //
    //   time, //
    //   doctorID, //
    //   doctorName, //
    //   department, //
    //   Symptoms, //
    //   Description,
    //   WardenName, //
    //   WardenID, //
    // ];


    var raw = JSON.stringify({
      requestedId: "Hello",
      PatientID, 
      AppointmentID, 
      date, 
      time, 
      doctorID, 
      Symptoms, 
      Description,
      WardenID, 
    });
    var result = await requestor(
      "POST",
      raw,
      "http://localhost:5000/api/Receptionist/make-Appointments"
    );

    data = JSON.parse(result);
    console.log(data);
    if (data.acknowledged) {
      document.getElementById("term").innerHTML = data;
      location.href = "/views/Receptionist/receptionist.pug";
    } else {
      alert("Error while fetching the details!!!");
    }
  }

  const appointmentForm = document.getElementById("appointmentForm");
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");
    appointmentPatient();
  });
});
