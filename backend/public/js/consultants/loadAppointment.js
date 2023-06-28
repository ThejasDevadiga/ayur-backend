window.addEventListener("load", async () => {
  async function loadAppointments() {
    const today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    const DoctorId = sessionStorage.getItem("EmployeeID");
    var date = yyyy + "-" + mm + "-" + dd;
    const Hospital = JSON.parse(sessionStorage.getItem("Hospital"));
    var raw = JSON.stringify({
      requestedId: "Hello",
      Date: date,
      DoctorID: DoctorId,
      Hospital: Hospital,
    });

    var result = await requestor(
      "POST",
      raw,
      "https://ayur.vercel.app//api/consultant/todays-doctor-appointments"
    );

    data = JSON.parse(result);

    if (data.acknowledged) {
      return data.data;
    }
  }

  const setTableData = (Appointments) => {
    if (Appointments.length > 0) {
      const Headers = Object.keys(Appointments[0]);
      const Table = document.querySelector(".table-appointments");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
      const tr = document.createElement("tr");

      tr.innerHTML =
        "<tr><th><h4> Appointment ID</h4><th><h4> Name</h4></th><th><h4> Sex</h4></th><th><h4> Age</h4></th> <th><h4> Patient ID</h4></th></th><th><h4> Time</h4></th><th><h4> Action </h4></th></tr>";

      thead.appendChild(tr);

      Appointments.forEach((appointment) => {
        const tr = document.createElement("tr");

        const values = Object.values(appointment);
        values.forEach((val) => {
          const td = document.createElement("td");
          td.innerHTML = "<h5> " + val + "</h5>";
          tr.appendChild(td);
        });
        const td = document.createElement("td");
        td.innerHTML = "<button class='continue-btn'> Continue </button>";
        tr.appendChild(td);
        tbody.appendChild(tr);
      });

      Table.appendChild(thead);
      Table.appendChild(tbody);
    }
  };
  const Appointments = await loadAppointments();
  setTableData(Appointments);
  const buttons = document.getElementsByClassName("continue-btn");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      const trElement = this.parentElement.parentElement;

      const patID = trElement.querySelectorAll("td")[4].innerText;
      const aptID = trElement.querySelectorAll("td")[0].innerText;
      // console.log(patID);
      location.href = "/views/Consultant/examin/" + patID + "&" + aptID;
    });
  }
});
