window.addEventListener("load", async () => {
  /* This code is checking the value of the "userRole" key in the sessionStorage object and setting the
"checked" property of the corresponding radio button element to true. If the value is
"receptionist", the radio button with id "receptionist" will be checked, and if the value is
"warden", the radio button with id "warden" will be checked. */
  const Role = sessionStorage.getItem("userRole");
  if (Role == "receptionist") {
    document.getElementById("receptionist").checked = true;
  } else if (Role == "warden") {
    document.getElementById("warden").checked = true;
  }

  /**
   * This function sends a POST request to a local API endpoint to retrieve a list of patient IDs based
   * on a given name.
   * @param name - The name of the patient for whom you want to retrieve the patient IDs.
   * @returns the patient IDs for a given name.
   */
  async function getPatientIDs(name) {
    const raw = JSON.stringify({
      requestedId: "Hello",
      Name: name,
    });

    var result = await requestor(
      "POST",
      raw,
      "https://ayur.vercel.app//api/Receptionist/get-patientid-list"
    );

    return JSON.parse(result).data;
  }
  var patientsList = [];

  const name = document.getElementById("name");
  name.addEventListener("input", async () => {
    const IDs = await getPatientIDs(name.value);
    patientsList = IDs;
    const PatientID = document.getElementById("pid");

    PatientID.innerHTML = "";
    IDs.forEach((id) => {
      const option = document.createElement("option");
      option.value = id.PatientID;
      option.textContent = id.PatientID;
      PatientID.appendChild(option);
    });
  });
  const PID = document.getElementById("pid");
  PID.addEventListener("change", async () => {
    const filteredPatients = patientsList.filter(
      (patient) => patient.PatientID === PID.value
    );
    name.value =
      filteredPatients[0].Basic["Fname"] +
      " " +
      filteredPatients[0].Basic["Mname"] +
      " " +
      filteredPatients[0].Basic["Fname"];
  });
  async function preappointmentForm() {
    const PatientID = document.getElementById("pid").value;
    const name = document.getElementById("name").value;
    const Role = sessionStorage.getItem("userRole");
    location.href =
      "/views/" + Role + "/book-appointment/" + PatientID + "&" + name;
  }
  const preAppointmentForm = document.getElementById("preappointmentForm");
  preAppointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");
    preappointmentForm();
  });
});
