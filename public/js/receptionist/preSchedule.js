window.addEventListener("load", () => {
  const Role = sessionStorage.getItem("Role");
  if (Role == "Receptionist") {
    document.getElementById("receptionist").checked = true;
  } else if (Role == "Doctor") {
     document.getElementById("warden").checked = true;
  }
    async function prescheduleForm() {

        const doctorID = document.getElementById("did").value;
        const today = new Date();
        // today.setDate(today.getDate() -3)
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      var date =  yyyy + '-' + mm + '-' +dd;
      const Role = sessionStorage.getItem("Role")
        location.href = "/views/"+Role+"/viewAppointment/"+date+"&"+doctorID
      }

      
      const preScheduleForm = document.getElementById("preScheduleForm");
      preScheduleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted");
        prescheduleForm();
      });
})
