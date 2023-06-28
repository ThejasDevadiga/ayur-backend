window.addEventListener("load", async () => {
  // Add event listener to window, listens for 'load' event and runs async function.

  //--------------set country list -----------------------

  // Select the element with id 'country'.
  const Country = document.querySelector("#country");

  // Function that fetches a list of countries from an API.
  async function getCountryCityData() {
    try {
      // Fetch data from API.
      const response = await fetch(
        "https://restcountries.com/v2/all?fields=name"
      );
      const data = await response.json();

      // Sort the data by country name in ascending order.
      data.sort((a, b) => (a.name > b.name ? 1 : -1));
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function updateCountryNames(countryList) {
    // Clear the content of the select list.
    Country.innerHTML = '<option value="">Select country</option>';

    // Loop through the country list and create an option element for each country.
    countryList.forEach(function (country) {
      const option = document.createElement("option");
      option.value = country.name;
      option.textContent = country.name;
      Country.appendChild(option);
    });
    // Select the 100th country.
    Country.options[100].selected = true;
  }

  try {
    // Get the country list from the API.
    const countryList = await getCountryCityData();
    // Update the country names in the select list.
    updateCountryNames(countryList);
  } catch (error) {
    console.error(error);
  }

  // -------------------------------------------------
  //-------------ste states names---------------
  // Select the element with id 'state'.
  const State = document.getElementById("state");

  // Hardcoded list of Indian states.
  let statesList = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];
  statesList.forEach(function (state) {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    State.appendChild(option);
  });
  State.options[11].selected = true;
  //-----------------------------------------------------
  // set hospital

  const raw = JSON.stringify({
    requestedId: "Hello",
  });

  var result = await requestor(
    "POST",
    raw,
    "https://ayur.vercel.app//api/Receptionist/get-hospital-list"
  );

  if (!result && result.acknowledged) {
    console.log(result);
  } else {
    const hospital = document.getElementById("hospital");
    const HospitalList = JSON.parse(result).data;

    sessionStorage.setItem("HospitalList", JSON.stringify(HospitalList));
    HospitalList.forEach(function (hosp) {
      const option = document.createElement("option");
      option.value = JSON.stringify(hosp);
      option.textContent = hosp.Name;
      hospital.appendChild(option);
    });
  }

  //--------------------set age--------------------------

  const patientdob = document.getElementById("dob");
  const age = document.getElementById("age");

  patientdob.onchange = function () {
    const patientdob = document.getElementById("dob").value;
    const dob = new Date(patientdob);
    const today = new Date();
    // diffrence between these two date in years
    let ageOfPat = Math.floor((today - dob) / (1000 * 60 * 60 * 24 * 365.25));
    if (ageOfPat == -1) {
      this.value = null;
      alert("Select the correct Date");
    } else {
      age.value = ageOfPat;
    }
  };

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
    const hospital = JSON.parse(document.getElementById("hospital").value);
    const PatientId = GenerateId("PAT");

    var raw = JSON.stringify({
      requestedId: "Hello",
      PatientId: PatientId,
      Fname: patientFname,
      Mname: patientMname ? patientMname : " ",
      Lname: patientLname,
      DateOfBirth: patientdob,
      Gender: gender,
      Phone: phone,
      Age: age,
      Email: "email",
      Address: address,
      City: city ? city : "city",
      State: state,
      Country: country,
      Zip: 12345,
      Hospital: hospital,
    });
    var result = await requestor(
      "POST",
      raw,
      "https://ayur.vercel.app//api/Receptionist/insert-patient-details"
    );
    data = JSON.parse(result);
    // console.log(data);
    if (data.acknowledged) {
      var Role = sessionStorage.getItem("userRole");
      location.href =
        "/views/" +
        Role +
        "/book-appointment/" +
        data.PatientId +
        "&" +
        data.PatientName;
    } else {
      alert(data.message);
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
