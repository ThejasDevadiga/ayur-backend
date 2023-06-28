window.addEventListener("load", () => {
  const Role = sessionStorage.getItem("userRole");
  if (Role == "receptionist") {
    document.getElementById("receptionist").checked = true;
  } else if (Role == "doctor") {
     document.getElementById("doctor").checked = true;
  }
    async function prescheduleForm() {

        const doctorID = document.getElementById("did").value;
        const today = new Date();
        // today.setDate(today.getDate() -3)
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      var date =  yyyy + '-' + mm + '-' +dd;
        location.href = "/views/"+Role+"/viewAppointment/"+date+"&"+doctorID
      }

      
      const preScheduleForm = document.getElementById("preScheduleForm");
      preScheduleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted");
        prescheduleForm();
      });
})
