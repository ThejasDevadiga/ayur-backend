window.addEventListener("load", () => {
  const Role = sessionStorage.getItem("Role");
  if (Role == "Receptionist") {
    document.getElementById("receptionist").checked = true;
  } else if (Role == "Warden") {
     document.getElementById("warden").checked = true;
  }
    async function preappointmentForm() {
        const PatientID = document.getElementById("pid").value;
        const name = document.getElementById("name").value;
         const Role = sessionStorage.getItem("Role") 
        location.href =    "/views/"+Role+"/book-appointment/"+PatientID+"&"+name
      }
      const preAppointmentForm = document.getElementById("preappointmentForm");
      preAppointmentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted");
        preappointmentForm();
      });
})
