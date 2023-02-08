window.addEventListener("load", () => {
    async function preappointmentForm() {

        const PatientID = document.getElementById("pid").value;
        const name = document.getElementById("name").value;  
        location.href =    "/views/Receptionist/book-appointment/"+PatientID+"&"+name
      }
      const preAppointmentForm = document.getElementById("preappointmentForm");
      preAppointmentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted");
        preappointmentForm();
      });
})
