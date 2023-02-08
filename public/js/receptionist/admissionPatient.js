
// window.addEventListener("load", () => {

//     // document.getElementById("doctorID").innerHTML = "DOC120" ;
//   async function getDoctorsList() {
//     var raw = JSON.stringify({
//       requestedId: "Hello",
//       filter: {},
//       projection: { _id: 0 },
//     });

//     var res = await requestor(
//       "POST",
//       raw,
//       "http://localhost:5000/api/receptionist/doctors-list"
//     );
//     console.log("Doctors " ,res);
//     if (res.statusCode == 200) {
//       res = JSON.parse(res);
//       sessionStorage.setItem("doctorsList", JSON.stringify(res.data));
//     }
//   }
//   getDoctorsList();

//   async function getDepartmentsList() {
//     var raw = JSON.stringify({
//       requestedId: "Hello",
//       filter: {},
//       projection: { _id: 0 },
//     });

//     var res = await requestor(
//       "POST",
//       raw,
//       "http://localhost:5000/api/receptionist/departments-list"
//     );
//     console.log("Departments " ,res);
//     if (res.statusCode == 200) {
//       res = JSON.parse(res);
//       sessionStorage.setItem("Departments", JSON.stringify(res.data));
//     }
//   }
//   getDepartmentsList();
// });

window.addEventListener("load", () => {
  async function admissionPatient() {

    const patientFname = document.getElementById("Fname").value;
    const patientMname = document.getElementById("Mname").value;
    const patientLname = document.getElementById("Lname").value;
    const patientdob = document.getElementById("dob").value;
    const genderM = document.getElementById("gender-male").checked;
    const genderF = document.getElementById("gender-female").checked;
    const gender = genderM ? "male" : genderF ? "female" : "other";
    const phone = document.getElementById("phone").value;
    const age = document.getElementById("age").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const address = document.getElementById("address").value;
    const PatientId = GenerateId("PAT");
    // document.getElementById("term").innerHTML = [
    //   patientFname,
    //   patientMname,
    //   patientLname,
    //   patientdob,
    //   gender,
    //   phone,
    //   age,
    //   city,
    //   state,
    //   country,
    //   address,
    // ];

    // Retrieve the string from session storage
    // var listAsString = sessionStorage.getItem("drugList");
    // Convert the string back to a list of JSON objects
    // const drugList = JSON.parse(listAsString);
    //     console.log(drugList);

    var raw = JSON.stringify({
      requestedId: "Hello",
      PatientId:PatientId,
      Fname: patientFname,
      Mname: patientMname,
      Lname: patientLname,
      DateOfBirth: patientdob,
      Gender: gender,
      Phone: phone,
      Age: age,
      Email: "email",
      Address: address,
      City: city,
      State: state,
      Country: country,
      Zip: 12345,
    
    });
         var result = await requestor(
          "POST",
          raw,
          "http://localhost:5000/api/Receptionist/insert-patient-details"
        );
          data = JSON.parse(result);
        console.log(data);
        if (data.acknowledged) {
          document.getElementById("term").innerHTML = data;
          // console.log(data);
          //  sessionStorage.removeItem("drugList")
           location.href = "/views/Receptionist/book-appointment/"+data.PatientId+"&"+data.PatientName
        } else {
          alert("Error while fetching the details!!!");
        }
 
  }
  const admissionForm = document.getElementById("admissionForm");
  admissionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    admissionPatient();
  });
});

function deleteItem(index) {
  // Retrieve the string from session storage
  var listAsString = sessionStorage.getItem("drugList");

  // Convert the string back to a list of JSON objects
  var listOfObjects = JSON.parse(listAsString);

  // Remove the item from the list
  listOfObjects.splice(index, 1);

  // Convert the list back to a string and store it in session storage
  listAsString = JSON.stringify(listOfObjects);
  sessionStorage.setItem("drugList", listAsString);

  // Reload the page to reflect the changes
  location.reload();
}
