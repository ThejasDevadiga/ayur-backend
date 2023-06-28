window.addEventListener("load", () => {
  async function loadAppointments(date) {
    const wardenID = sessionStorage.getItem("EmployeeID");
    var raw = JSON.stringify({
      requestedId: "Hello",
      wardenID: wardenID,
      date: date,
    });
    var result = await requestor(
      "POST",
      raw,
      "https://ayur.vercel.app//api/warden/wardens-appointment"
    );
    data = JSON.parse(result);
    if (data.acknowledged) {
      return data.data;
    }
  }

  const setAppointment = async (ulClass, date) => {
    const appointments = await loadAppointments(date);
    const ul = document.querySelector(ulClass);
    var count = 1;
    appointments.forEach((appointment) => {
      const li = document.createElement("li");
      const container = document.createElement("div");
      const appointRow = document.createElement("div");
      appointRow.classList.add("appoint-row");
      container.classList.add("container");
      container.id = count;
      const half1 = document.createElement("div");
      half1.classList.add("half");
      const half2 = document.createElement("div");
      half2.classList.add("half");

      const nameP = document.createElement("p");
      nameP.textContent = appointment.PatientName + count;

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
      container.appendChild(appointRow);
      const date = new Date(appointment.Timing.date);
      const dateString = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      container2.innerHTML =
        "<div class='timeline-item'>  <div class='timeline-date'> <div class='notif-date'>" +
        dateString +
        "\n" +
        appointment.Timing.time +
        ".00</div></div><div class='timeline-content'><h6 class='notif'>" +
        appointment.DoctorName +
        "</h6><p>" +
        appointment.DoctorDepartment +
        "</p></div></div>";
      container2.style.display = "none";
      container.appendChild(container2);
      li.append(container);
      ul.append(li);
      count++;
    });
    const li = document.querySelector("li");
    const lis = li.querySelectorAll(".container");
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

  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1);
  setAppointment(".appointmentList", today.toISOString().slice(0, 10));
  setAppointment(".appointment-history", prevMonth.toISOString().slice(0, 10));
});
