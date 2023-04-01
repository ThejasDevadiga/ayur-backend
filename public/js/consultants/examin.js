window.addEventListener("load", () => {
  document.body.style.zoom = "90%";
  function allFieldsFilled() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "") {
        return false;
      }
    }
    return true;
  }

  var inputs = document.getElementsByTagName("input");

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", function () {
      console.log(allFieldsFilled());
      if (allFieldsFilled()) {
        // document.getElementById("submit-btn").disabled = false;

        document.getElementById("submit-btn").style.backgroundColor = "#25358f";
        document.getElementById("submit-btn").style.color = "#ffffff";
      }
    });
  }
  const Form = document.querySelector(".physical-form");

  Form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let height = document.getElementById("height");
    let weight = document.getElementById("weight");
    let pulse = document.getElementById("pulse");
    let bp = document.getElementById("bp");
    let resprate = document.getElementById("resprate");
    let temp = document.getElementById("temp");
    let patID = document.getElementById("patid");
    let aptID = document.getElementById("aptid");

    alert("This form has been successfully submitted!");
    console.log(
      height.value +
        weight.value +
        pulse.value +
        bp.value +
        resprate.value +
        temp.value
    );
    const Vitals = {
      requestedId: "Hello",
      height: height.value,
      weight: weight.value,
      pulse: pulse.value,
      bloodPressure: { systolic: bp.value },
      respiratoryRate: resprate.value,
      temperature: temp.value,
      requestedId: "Hello",
      PatientID: patID.innerText,
      AppointmentID: aptID.innerText,
      vitalDataID: GenerateId("VITL"),
    };

    var raw = JSON.stringify({ Vitals });
    sessionStorage.setItem("Vitals", JSON.stringify(Vitals));

    var result = await requestor(
      "POST",
      raw,
      "http://localhost:5000/api/consultant/upload-vitals-data"
    );

    const data = JSON.parse(result);

    if (data.acknowledged) {
      console.log(data.data);
    } else {
      alert(data.message);
    }

    height.value = "";
    weight.value = "";
    pulse.value = "";
    bp.value = "";
    resprate.value = "";
    temp.value = "";
  });

  const Data = JSON.parse(sessionStorage.getItem("Vitals"));
  if (Data == null) {
    console.log("null");
  } else {
    const recWeight = document.querySelectorAll(".recWeight");
    for (var i = 0; i < recWeight.length; i++) {
      recWeight[i].innerHTML = "<p>" + Data.weight + "</p>";
    }

    const recHeight = document.querySelectorAll(".recHeight");
    for (var i = 0; i < recHeight.length; i++) {
      recHeight[i].innerHTML = "<p>" + Data.height + "</p>";
    }

    const recBp = document.querySelectorAll(".recBp");
    for (var i = 0; i < recBp.length; i++) {
      recBp[i].innerHTML = "<p>" + Data.bloodPressure["systolic"] + "</p>";
    }

    const recPulse = document.querySelectorAll(".recPulse");
    for (var i = 0; i < recPulse.length; i++) {
      recPulse[i].innerHTML = "<p>" + Data.pulse + "</p>";
    }

    const recRR = document.querySelectorAll(".recRR");
    for (var i = 0; i < recRR.length; i++) {
      recRR[i].innerHTML = "<p>" + Data.respiratoryRate + "</p>";
    }
  }
});

// ------------------------------------

window.addEventListener("load", () => {
  async function getDrugsList() {
    var raw = JSON.stringify({
      requestedId: "Hello",
      filter: {},
      projection: { _id: 0 },
    });

    var res = await requestor(
      "POST",
      raw,
      "http://localhost:5000/api/consultant/drugs-list"
    );
    res = JSON.parse(res);
    sessionStorage.setItem("availableDrug", JSON.stringify(res.data));
  }

  getDrugsList();

  async function addDrugtoList() {
    const drugName = document.getElementById("drugName").value;
    const drugQuantity = document.getElementById("drugQuantity").value;
    const drugMorn = document.getElementById("mor").checked ? 1 : 0;
    const drugAftr = document.getElementById("aft").checked ? 1 : 0;
    const drugEve = document.getElementById("eve").checked ? 1 : 0;
    const grugNgt = document.getElementById("ngt").checked ? 1 : 0;
    const drugTiming = drugMorn + "-" + drugAftr + "-" + drugEve + "-"+grugNgt;
    const drugNote = document.getElementById("note").value;
    if (sessionStorage.getItem("drugList") == null) {
      var drugDet = JSON.stringify(
        Array({ drugName, drugQuantity, drugTiming, drugNote })
      );
      sessionStorage.setItem("drugList", drugDet);
    } else {
      // Retrieve the string from session storage
      var listAsString = sessionStorage.getItem("drugList");

      // Convert the string back to a list of JSON objects
      var listOfObjects = JSON.parse(listAsString);

      // Add a new element to the list
      listOfObjects.push({ drugName, drugQuantity, drugTiming, drugNote });

      // Convert the updated list to a string
      listAsString = JSON.stringify(listOfObjects);

      // Store the updated string back in session storage

      sessionStorage.setItem("drugList", listAsString);
    }

    // document.getElementById("alert").innerHTML = 'Drug added'
    // location.href="#section-4"
    location.reloa()
  }

  const Drugform = document.getElementById("listDrug");

  Drugform.addEventListener("submit", (event) => {
    event.preventDefault();
    addDrugtoList();
  });
});

// delete items of drug

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

// upload prescription

window.addEventListener("load", () => {
  async function MakeReport() {
    console.log("making report");
    // document.getElementById("alert").innerHTML = "Contact admin!  error:Unknown user";

    const patientName = document.getElementById("name").value;
    let patID = document.getElementById("patid");
    let aptID = document.getElementById("aptid");
    var listAsString = sessionStorage.getItem("drugList");
    const drugList = JSON.parse(listAsString);

    // console.log(drugList);
    var raw = JSON.stringify({
      requestedId: "Hello",
      AppointmentID:aptID.innerText,
      PatientID:patID.innerText,
      drugList,
    });
    console.log(raw);
    // var  data = await requestor("POST",raw,"http://localhost:5000/api/consultant/makePrescription")
    // data = JSON.parse(data)
    // document.getElementById("alert").innerHTML = data;
    // console.log(data);
    // if(data.acknowledged){
    //  sessionStorage.removeItem("drugList")
    //  location.href = "/views/Consultant/consultant.pug"
    // }

    // else {
    //   document.getElementById("alert").innerHTML = "Contact admin!  error:Unknown user";
    // }

    // else{
    //       document.getElementById("alert").innerHTML = data.message;
    //     }
  }

  const Reportform = document.getElementById("makeReport");
  Reportform.addEventListener("submit", (event) => {
    event.preventDefault();
    MakeReport();
  });
});
