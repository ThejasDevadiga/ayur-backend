window.addEventListener("load", () => {
  document.body.style.zoom = "90%";
  function allFieldsFilled(inputFileds) {
    for (let i = 0; i < inputFileds.length; i++) {
      if (inputFileds[i].value == "") {
        return false;
      }
    }
    return true;
  }

  const vitalFOrm = document.getElementById("physicalExam");
  let inputs = vitalFOrm.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", function () {
      console.log(allFieldsFilled(inputs));
      if (allFieldsFilled(inputs)) {
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

    const Hospital = JSON.parse(sessionStorage.getItem("Hospital"));
    let raw = JSON.stringify({ Vitals, Hospital });
    let result = await requestor(
      "POST",
      raw,
      "https://ayur.vercel.app//api/consultant/upload-vitals-data"
    );

    const data = JSON.parse(result);

    if (data.acknowledged) {
      console.log(data.data);
      sessionStorage.setItem("Vitals", JSON.stringify(data.data));
      location.reload();
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
    for (let i = 0; i < recWeight.length; i++) {
      recWeight[i].innerHTML = "<p>" + Data.weight + "</p>";
    }

    const recHeight = document.querySelectorAll(".recHeight");
    for (let i = 0; i < recHeight.length; i++) {
      recHeight[i].innerHTML = "<p>" + Data.height + "</p>";
    }

    const recBp = document.querySelectorAll(".recBp");
    for (let i = 0; i < recBp.length; i++) {
      recBp[i].innerHTML = "<p>" + Data.bloodPressure["systolic"] + "</p>";
    }

    const recPulse = document.querySelectorAll(".recPulse");
    for (let i = 0; i < recPulse.length; i++) {
      recPulse[i].innerHTML = "<p>" + Data.pulse + "</p>";
    }

    const recRR = document.querySelectorAll(".recRR");
    for (let i = 0; i < recRR.length; i++) {
      recRR[i].innerHTML = "<p>" + Data.respiratoryRate + "</p>";
    }
  }
  // ------------------------------------------------
  //  pre requisition form

  const preRqForm = document.getElementById("system-exam");
  console.log(preRqForm);

  preRqForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    alert("Submitting.....System-exam");

    let heamoglobin = document.getElementById("heamoglobin-yes").checked;
    let wbcCount = document.getElementById("totwbc-yes").checked;
    let diffCount = document.getElementById("diffcnt-yes").checked;
    let esr = document.getElementById("esr-yes").checked;
    let plateletCount = document.getElementById("pltCnt-yes").checked;
    let mp = document.getElementById("mp-yes").checked;
    let microbial = document.getElementById("mcrob-yes").checked;
    let widal = document.getElementById("widal-yes").checked;
    let dengue = document.getElementById("dengue-yes").checked;
    let crp = document.getElementById("crp-yes").checked;
    let rbs = document.getElementById("rbs-yes").checked;
    let minilft = document.getElementById("miniLft-yes").checked;
    let xRaysugg = document.getElementById("xRay-text").value;
    let usgSugg = document.getElementById("usg-text").value;
    let othrSugg = document.getElementById("other-text").value;

    let patID = document.getElementById("patid").innerText;
    let aptID = document.getElementById("aptid").innerText;

    console.log(
      heamoglobin,
      wbcCount,
      diffCount,
      esr,
      plateletCount,
      mp,
      microbial,
      widal,
      dengue,
      crp,
      rbs,
      minilft,
      aptID,
      patID,
      xRaysugg,
      usgSugg,
      othrSugg
    );
    let doc = new jsPDF();

    doc.text(20, 20, "Hemoglobin: " + heamoglobin);
    doc.text(20, 30, "WBC Count: " + wbcCount);
    doc.text(20, 40, "Diff Count: " + diffCount);
    doc.text(20, 50, "ESR: " + esr);
    doc.text(20, 60, "Platelet Count: " + plateletCount);
    doc.text(20, 70, "MP: " + mp);
    doc.text(20, 80, "Microbial: " + microbial);
    doc.text(20, 90, "Widal: " + widal.innerHTML);
    doc.text(20, 100, "Dengue: " + dengue);
    doc.text(20, 110, "CRP: " + crp);
    doc.text(20, 120, "RBS: " + rbs);
    doc.text(20, 130, "MiniLFT: " + minilft);
    doc.text(20, 140, "X-Ray suggestions :" + xRaysugg);
    doc.text(20, 160, "USG suggestions :" + usgSugg);
    doc.text(20, 180, "Other suggestions :" + othrSugg);
    doc.save("labtest.pdf");
  });
});

// ------------------------------------

window.addEventListener("load", () => {
  const Hospital = JSON.parse(sessionStorage.getItem("Hospital"));

  async function getDrugsList() {
    let raw = JSON.stringify({
      requestedId: "Hello",
      filter: { Hospital },
      projection: { _id: 0 },
    });

    let res = await requestor(
      "POST",
      raw,
      "https://ayur.vercel.app//api/consultant/drugs-list"
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
    const drugTiming =
      drugMorn + "-" + drugAftr + "-" + drugEve + "-" + grugNgt;
    const drugNote = document.getElementById("note").value;
    if (sessionStorage.getItem("drugList") == null) {
      let drugDet = JSON.stringify(
        Array({ drugName, drugQuantity, drugTiming, drugNote })
      );
      sessionStorage.setItem("drugList", drugDet);
    } else {
      // Retrieve the string from session storage
      let listAsString = sessionStorage.getItem("drugList");

      // Convert the string back to a list of JSON objects
      let listOfObjects = JSON.parse(listAsString);

      // Add a new element to the list
      listOfObjects.push({ drugName, drugQuantity, drugTiming, drugNote });

      // Convert the updated list to a string
      listAsString = JSON.stringify(listOfObjects);

      // Store the updated string back in session storage

      sessionStorage.setItem("drugList", listAsString);
    }

    // document.getElementById("alert").innerHTML = 'Drug added'
    // location.href="#section-4"
    location.reload();
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
  let listAsString = sessionStorage.getItem("drugList");

  // Convert the string back to a list of JSON objects
  let listOfObjects = JSON.parse(listAsString);

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
    let listAsString = sessionStorage.getItem("drugList");
    const suggestion = document.getElementById("suggest-box").value;
    const drugList = JSON.parse(listAsString);
    const consultantId = sessionStorage.getItem("EmployeeID");
    const Hospital = JSON.parse(sessionStorage.getItem("Hospital"));

    // console.log(drugList);
    let raw = JSON.stringify({
      requestedId: "Hello",
      AppointmentId: aptID.innerText,
      consultantId,
      patientId: patID.innerText,
      drugList,
      Hospital,
      prescriptions: suggestion,
    });

    console.log(raw);
    let data = await requestor(
      "POST",
      raw,
      "https://ayur.vercel.app//api/consultant/makePrescription"
    );
    data = JSON.parse(data);

    // document.getElementById("alert").innerHTML = data;
    console.log(data);
    if (data.acknowledged) {
      sessionStorage.removeItem("drugList");
      sessionStorage.removeItem("Vitals");
      location.href = "/views/Consultant/report/" + aptID.innerText;
    } else {
      alert("Contact admin!  error:Unknown user");
    }

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

//
// const preRqForm = document.getElementById("system-exam");
// console.log(preRqForm);

// preRqForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     alert("Submitting.....System-exam")

//     let heamoglobin = document.getElementById("heamoglobin-yes").checked;
//     let wbcCount = document.getElementById("totwbc-yes").checked;
//     let diffCount = document.getElementById("diffcnt-yes").checked;
//     let esr = document.getElementById("esr-yes").checked;
//     let plateletCount = document.getElementById("pltCnt-yes").checked;
//     let mp = document.getElementById("mp-yes").checked;
//     let microbial = document.getElementById("mcrob-yes").checked;
//     let widal = document.getElementById("widal-yes").checked;
//     let dengue = document.getElementById("dengue-yes").checked;
//     let crp = document.getElementById("crp-yes").checked;
//     let rbs = document.getElementById("rbs-yes").checked;
//     let minilft = document.getElementById("miniLft-yes").checked;
//     let xRaysugg = document.getElementById('xRay-text').value
//     let usgSugg = document.getElementById('usg-text').value
//     let othrSugg = document.getElementById('other-text').value

//     let patID = document.getElementById("patid").innerText;
//     let aptID = document.getElementById("aptid").innerText;

//     console.log(
//       heamoglobin ,
//       wbcCount ,
//       diffCount ,
//       esr ,
//       plateletCount,
//       mp ,
//       microbial ,
//       widal ,
//       dengue,
//       crp ,
//       rbs ,
//       minilft,
//       aptID,
//       patID,
//       xRaysugg,
//       usgSugg,
//       othrSugg
//     );
//     let doc = new jsPDF();

// doc.text(20, 20, 'Hemoglobin: ' + heamoglobin);
// doc.text(20, 30, 'WBC Count: ' + wbcCount);
// doc.text(20, 40, 'Diff Count: ' + diffCount)
// doc.text(20, 50, 'ESR: ' + esr);
// doc.text(20, 60, 'Platelet Count: ' + plateletCount);
// doc.text(20, 70, 'MP: ' + mp);
// doc.text(20, 80, 'Microbial: ' + microbial);
// doc.text(20, 90, 'Widal: ' + widal.innerHTML);
// doc.text(20, 100, 'Dengue: ' + dengue);
// doc.text(20, 110, 'CRP: ' + crp);
// doc.text(20, 120, 'RBS: ' + rbs);
// doc.text(20, 130, 'MiniLFT: ' + minilft);
// doc.text(20,140,"X-Ray suggestions :"+xRaysugg)
// doc.text(20,160,"USG suggestions :"+usgSugg)
// doc.text(20,180,"Other suggestions :"+othrSugg)
// doc.save('labtest.pdf');
//   })
// });
