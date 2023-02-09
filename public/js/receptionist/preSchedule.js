window.addEventListener("load", () => {
    async function prescheduleForm() {

        const doctorID = document.getElementById("did").value;
        const today = new Date();
        // today.setDate(today.getDate() -3)
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      date =  yyyy + '-' + mm + '-' +dd;
        location.href =    "/views/Receptionist/viewAppointment/"+date+"&"+doctorID
      }
      const preScheduleForm = document.getElementById("preScheduleForm");
      preScheduleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted");
        prescheduleForm();
      });
})
