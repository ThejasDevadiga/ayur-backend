// window.addEventListener("load", () => {
//   loadPatientList()  


//   const d0cList = document.querySelectorAll(".doc-list");
//   docList.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const row = btn.closest("tr");
//       const values = Array.from(row.querySelectorAll("td p")).map(
//         (p) => p.textContent
//       );
//       const docID = values[4];
//       let today = new Date();
//       let dd = String(today.getDate()).padStart(2, "0");
//       let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//       let yyyy = today.getFullYear();
//       today = yyyy + "-" + mm + "-" + dd;

//       window.location.href =
//         "/views/Receptionist/viewAppointment/" + today + "&" + docID;
//     });
//   });

// // prescription

// const prescriptions = document.querySelectorAll(".doc-list");
// prescriptions.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const row = btn.closest("tr");
//     const values = Array.from(row.querySelectorAll("td p")).map(
//       (p) => p.textContent
//     );
//     const docID = values[0];
//     let today = new Date();
//     let dd = String(today.getDate()).padStart(2, "0");
//     let mm = String(today.getMonth() + 1).padStart(2, "0");
//     let yyyy = today.getFullYear();
//     today = yyyy + "-" + mm + "-" + dd;

//     window.location.href =
//       "/views/Receptionist/viewAppointment/" + today + "&" + docID;
//   });
// });
// const PageBtn = document.querySelectorAll('.paginate_button');

// PageBtn.forEach((page)=>{
//   page.addEventListener("click",(e)=>{
//     loadPatientList()
//   })

// })

// const loadPatientList=()=>{

//   const patlist = document.querySelectorAll(".pat-list");
//   patlist.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const row = btn.closest("tr");
//       const values = Array.from(row.querySelectorAll("td p")).map(
//         (p) => p.textContent
//       );
//       const Name = values[0];
//       const PID = values[6];
//       window.location.href =
//         "/views/Receptionist/book-appointment/" + PID + "&" + Name;
//     });
//   });

// }
// });

window.addEventListener("DOMContentLoaded", async () => {
  const docList = document.querySelector("#doctorlist");
  if (docList != null) {
    const Hospital = JSON.parse(sessionStorage.getItem("Hospital"));
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
    console.log(doctors);
    if (!doctors.success) {
      console.log(doctors.message);
    } else {
      const doctorsData = doctors.data;
      // console.log(doctorsData);
      const headings = Object.keys(doctorsData[0]);
      const thead = docList.querySelector("thead");
      const tr = thead.querySelector("tr");
      headings.forEach((header) => {
        const th = document.createElement("th");
        th.innerText = header;
        tr.appendChild(th);
      });
      const th = document.createElement("th");
      th.innerText = 'Action';
      tr.appendChild(th)
      let count = 0
      thead.appendChild(tr);
      const tbody = docList.querySelector("tbody");
      doctorsData.forEach((doctor) => {
        count +=1
        const trEle = document.createElement("tr");
        const td = document.createElement("td");
        td.innerText = count
        trEle.appendChild(td)
        Object.values(doctor).forEach((data) => {
          const td = document.createElement("td");
          td.innerText = data;
          trEle.appendChild(td);
        });
        const tdel = document.createElement("td");
        tdel.innerHTML =' <button>click</button>'
        trEle.appendChild(tdel)
        tbody.appendChild(trEle)
      });
    }
  } else {
    console.log("not");
  }
});



window.addEventListener("DOMContentLoaded", async () => {
  const patList = document.querySelector("#patientlist");
  if (patList != null) {
    const Hospital = JSON.parse(sessionStorage.getItem("Hospital"));
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
          Basic: { Fname, Mname, Lname, DateOfBirth, Gender, Phone, Age, City },
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
          City: City,
          ID: PatientID,
          Status,
          Appointments: Appointments.length,
        };
      });
    }
    console.log(patients);
    if (!patients.acknowledged) {
      console.log(patients.message);
    } else {
      // const patients = patient.data;
      const patientData = extractBasicData(patients.data);
      console.log(patientData);
      const headings = Object.keys(patientData[0]);
      const thead = patList.querySelector("thead");
      const tr = thead.querySelector("tr");
      headings.forEach((header) => {
        const th = document.createElement("th");
        th.innerText = header;
        tr.appendChild(th);
      });
      const th = document.createElement("th");
      th.innerText = 'Action';
      tr.appendChild(th)
      let count = 0
      thead.appendChild(tr);
      const tbody = patList.querySelector("tbody");
      patientData.forEach((patient) => {
        count +=1
        const trEle = document.createElement("tr");
        const td = document.createElement("td");
        td.innerText = count
        trEle.appendChild(td)
        Object.values(patient).forEach((data) => {
          const td = document.createElement("td");
          td.innerText = data;
          trEle.appendChild(td);
        });
        
        const tdel = document.createElement("td");
        tdel.innerHTML =' <a href="/views/patient-profile/'+patient.ID+'"+>View profile</a>';
        trEle.appendChild(tdel)
        tbody.appendChild(trEle)
      });
    }
  } else {
    console.log("not");
  }
});



window.addEventListener("DOMContentLoaded", async () => {
  const apntList = document.querySelector("#appointments");
  if (apntList != null) {
    const Hospital = JSON.parse(sessionStorage.getItem("Hospital"));
    let raw = JSON.stringify({
      requestedId: "Hello",
      filter: { Hospital },
      projection: {},
    });
    const result = await requestor(
      "POST",
      raw,
      "http://localhost:5000/api/Receptionist/appointment-list"
    );
    
    const appointments = JSON.parse(result);
    console.log(appointments);
    if (!appointments.acknowledged) {
      console.log(appointments.message);
    } else {
      const appointmentsData = appointments.data;
      // console.log(appointmentsData);
      const headings = Object.keys(appointmentsData[0]);
      const thead = apntList.querySelector("thead");
      const tr = thead.querySelector("tr");
      headings.forEach((header) => {
        const th = document.createElement("th");
        th.innerText = header;
        tr.appendChild(th);
      });
      const th = document.createElement("th");
      th.innerText = 'Report';
      tr.appendChild(th)
      let count = 0
      thead.appendChild(tr);
      const tbody = apntList.querySelector("tbody");
      appointmentsData.forEach((appointment) => {
        count +=1
        const trEle = document.createElement("tr");
        const td = document.createElement("td");
        td.innerText = count
        trEle.appendChild(td)
        Object.values(appointment).forEach((data) => {
          const td = document.createElement("td");
        
          td.innerText = data;
          trEle.appendChild(td);
        });
        const tdel = document.createElement("td");
        tdel.innerHTML =' <a href="/views/Consultant/report/'+appointment.AppointmentID+'"+>View profile</a>';
        trEle.appendChild(tdel)
        tbody.appendChild(trEle)
      });
    }
  } else {
    console.log("not");
  }
});


