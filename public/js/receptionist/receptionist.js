window.addEventListener("load", async () => {
  sessionStorage.setItem((key = "Role"), (value = "Receptionist"));
  sessionStorage.setItem((key = "userName"), (value = "user123455"));
  sessionStorage.setItem(
    (key = "userId"),
    (value = "AYUR08022023-EMP-1958-07")
  );

  async function loadAppointments(status, date) {
    var raw = JSON.stringify({
      requestedId: "Hello",
      filter: {
        Status: status,
        "Timing.date": date
      },
    });
    var result = await requestor(
      "POST",
      raw,
      "http://localhost:5000/api/Receptionist/get-appointment-list"
    );

    data = JSON.parse(result);
    // console.log(data);
    if (data.acknowledged) {
      return data.data;
    }
  }

  const setAppointment = async (ulClass, status, date) => {
    const appointments = await loadAppointments(status, date);
    const ul = document.querySelector(ulClass);
    
    var count = 1;
    appointments.forEach((appointment) => {
      const li = document.createElement("li");
      const apptDetails = document.createElement("div");
      const container = document.createElement("div");
      const appointRow = document.createElement("div");
      apptDetails.classList.add("appointment-details");
      appointRow.classList.add("appoint-row");
      container.classList.add("container");
      container.id = appointment.AppointmentID;

      const half1 = document.createElement("div");
      half1.classList.add("half");
      const half2 = document.createElement("div");
      half2.classList.add("half");

      const nameP = document.createElement("p");
      nameP.textContent = appointment.Name;
      const status = document.createElement("div");

      status.classList.add("status");
      const circle = document.createElement("div");
      circle.classList.add("circle");
      const h8 = document.createElement("h8");
      if (appointment.Status === "APPROVED") {
        status.style.backgroundColor = "#abffb9";
        circle.style.backgroundColor = "#145320";
        h8.style.color = "#145320";
        h8.textContent = "Approved";
      } else {
        status.style.backgroundColor = "#fdfb75";
        circle.style.backgroundColor = "#ab8013";
        h8.style.color = "#ab8013";
        h8.textContent = "Requested";
      }
      half1.appendChild(nameP);
      status.appendChild(circle);
      status.appendChild(h8);
      half2.appendChild(status);

      const container2 = document.createElement("div");
      container2.classList.add("detail-container");
      appointRow.appendChild(half1);
      appointRow.appendChild(half2);
      if (appointment.Status === "REQUESTED") {
        const half3 = document.createElement("div");
        half3.classList.add("half");
        half3.innerHTML =
          "<button class='rej-btn button circle'   style='width: 90px; height: 20px; border-radius: 10px; color: rgb(156, 23, 30); background-color: rgb(255, 122, 125);'><h8>Reject</h8></button>" +
          '<button class="acc-btn button circle"   style="width: 90px; height: 20px; border-radius: 10px; color: rgb(20, 83, 32); background-color: rgb(143, 255, 162);"><h8>Accept</h8></button>';

        appointRow.appendChild(half3);
      }
      container.appendChild(appointRow);
      const date = new Date(appointment.date);
      const dateString = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      container2.innerHTML =
        "<div class='timeline-item' >  <div class='timeline-date'> <div class='notif-date'>" +
        dateString +
        "\n" +
        appointment.time +
        ".00</div></div><div class='timeline-content'><h6 class='notif'>" +
        appointment.DoctorName +
        "</h6><p>" +
        appointment.Department +
        "</p></div></div>";
      container2.style.display = "none";

      container.appendChild(container2);
      apptDetails.appendChild(container);

      li.append(container);
      ul.append(li);

      count++;
    });
    const lis = document.querySelectorAll(".container");
    let isExpanded = false;

    for (let i = 0; i < lis.length; i++) {
      lis[i].addEventListener("click", function () {
        if (isExpanded) {
          lis[i].querySelector(".detail-container").style.display = "none";
          isExpanded = false;
        } else {
          lis[i].querySelector(".detail-container").style.display = "block";
          isExpanded = true;
        }
      });
    }
  };
  async function updateStatus(status, id) {
    var raw = JSON.stringify({
      requestedId: "Hello",
      ID: id,
      Status: status,
    });
    var result = await requestor(
      "PUT",
      raw,
      "http://localhost:5000/api/Receptionist/update-appointment-status"
    );

    data = JSON.parse(result);
    // console.log(data);
    if (data.acknowledged) {
      return data.data;
    }
  }

  function addListner() {
    const rejBtn = document.querySelectorAll(".rej-btn");
    const acptBtn = document.querySelectorAll(".acc-btn");
    
    rejBtn.forEach((btn) => {
      btn.addEventListener("click", function handleClick(event) {
        const parentData = this.parentElement.parentElement.parentElement;
        // console.log(parentData.id);
        updateStatus("REJECTED", parentData.id);
        location.reload();
      });
    });

    acptBtn.forEach((btn) => {
      btn.addEventListener("click", function handleClick(event) {
        const parentData = this.parentElement.parentElement.parentElement;

        // console.log(parentData.id);
        updateStatus("APPROVED", parentData.id);
        location.reload();
      });
    });
  }
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1);
  await setAppointment(
    ".req-appointmentList",
    "REQUESTED",
    today.toISOString().slice(0, 10)
  );
  await setAppointment(
    ".aprv-appointmentList",
    "APPROVED",
    today.toISOString().slice(0, 10)
  );
  addListner();
});
