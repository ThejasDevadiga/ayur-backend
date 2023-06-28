window.addEventListener("load", async () => {
  // const loadRecord = document.querySelector("#recordName")
  // loadRecord.addEventListener("change",function(){

  // console.log(loadRecord.value);
  // const recordName = loadRecord.value

  // if(recordName=="Appointments"){

  //      document.getElementById("appointment").style.display = "block"
  //      document.getElementById("patients").style.display = "none"
  //      document.getElementById("doctors").style.display = "none"

  //     console.log("block");
  // }
  // else if(recordName=="Patients"){
  //     document.getElementById("appointment").style.display = "none"
  //      document.getElementById("patients").style.display = "block"
  //      document.getElementById("doctors").style.display = "none"

  //     console.log("block");
  // }
  // else if(recordName=="Doctors"){
  //     document.getElementById("appointment").style.display = "none"
  //     document.getElementById("patients").style.display = "none"
  //      document.getElementById("doctors").style.display = "block"
  //     console.log("block");
  // }

  // })

  const csvForm = document.getElementById("csvForm");

  const csvMaker = (data) => {
    let csvRows = [];

    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((e) => {
        return row[e];
      });
      csvRows.push(values);
    }
    return csvRows.join("\n");
  };

  const download = function (data,fileName) {
    const blob = new Blob([data], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.setAttribute("href", url);

    a.setAttribute("download", fileName);

    a.click();
  };
  csvForm.addEventListener("submit", async (e) => {
    const recordName = document.querySelector("#recordName").value;
    e.preventDefault();
   
    if (recordName == "Appointments") {
      console.log(recordName);
      const Hospital = sessionStorage.getItem("Hospital");
      const raw = JSON.stringify({
        requestedId: "Hello",
        Hospital,
        filter: {},
      });

      let result = await requestor(
        "POST",
        raw,
        "http://localhost:5000/api/Receptionist/consulted-appointments"
      );
      result = JSON.parse(result);
     
      if (result.acknowledged) {
        console.log(result.data);
        const csvData = csvMaker(result.data);
         
        download(csvData,"appointments.csv");
      } else {
        alert("No data found");
      }
    } else if (recordName == "Patients") {
      
      const Hospital = sessionStorage.getItem("Hospital");
      let raw = JSON.stringify({
        requestedId: "Hello",
        filter: { Hospital },
        projection: {},
      });
      const result = await requestor(
        "POST",
        raw,
        "http://localhost:5000/api/Receptionist/get-patient-details"
      );
      const patients = JSON.parse(result);

      function extractBasicData(data) {
        return data.map((item) => {
          const {
            Basic: {
              Fname,
              Mname,
              Lname,
              DateOfBirth,
              Gender,
              Phone,
              Age,
              Address,
              City,
              State,
              Country,
              Zip
            },
            PatientID,
            Status,
            Appointments,
          } = item;

          return {
            Name: Fname + " " + Mname + " " + Lname,
            Sex: Gender,
            "Ph.No": Phone,
            DOB: DateOfBirth.slice(0, 10),
            Age,
            Address,
            City: City,
            State,
            Country,
            Zip,
            ID: PatientID,
          };
        });
      }
      
      if (!patients.acknowledged) {
        alert("No data found");
        console.log(patients.message);
      } else {
        // const patients = patient.data;
        const patientData = extractBasicData(patients.data);
        const csvData = csvMaker(patientData);
        
        download(csvData,"patients.csv");
      }
    }
    else if (recordName == "Doctors") {
      const Hospital = sessionStorage.getItem("Hospital");

      let raw = JSON.stringify({
        requestedId: "Hello",
        filter: { Hospital },
        projection: {},
      });
      
      const result = await requestor(
        "POST",
        raw,
        "http://localhost:5000/api/Receptionist/get-doctor-list"
      );
      const doctors = JSON.parse(result);
      
      if (!doctors.success) {
        console.log(doctors.message);
      } else {
       
         const csvData = csvMaker(doctors.data);
        
        download(csvData,"doctors.csv");
    }
  }
  });
});
