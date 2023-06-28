window.addEventListener("load", async () => {
  const Hospital = JSON.parse(sessionStorage.getItem("Hospital"));
  async function loadAppointments(status, date) {
    let raw = JSON.stringify({
      requestedId: "Hello",
      filter: {
        Status: status,
        "Timing.date": date,
      },
      Hospital,
    });
    let result = await requestor(
      "POST",
      raw,
      "https://ayur.vercel.app/api/Receptionist/get-appointment-list"
    );

    let data = JSON.parse(result);
    // console.log(data);
    if (data.acknowledged) {
      return data.data;
    }
  }

  const setAppointment = async (ulClass, status, date) => {
    const appointments = await loadAppointments(status, date);
    const ul = document.querySelector(ulClass);

    let count = 1;

    appointments.forEach((appointment) => {
      const li = document.createElement("li");
      const appointDetails = document.createElement("div");
      const container = document.createElement("div");
      const appointRow = document.createElement("div");
      appointDetails.classList.add("appointment-details");
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

      // console.log(typeof appointment.DoctorName);
      if (appointment.DoctorName != " ") {
        container2.innerHTML =
          "<div class='timeline-item' >  <div class='timeline-date'> <div class='notif-date'>" +
          dateString +
          "\n" +
          appointment.time +
          ".00</div></div><div class='timeline-content'><h6 class='notif'>" +
          appointment.DoctorName +
          "</h6><p>" +
          appointment.Department +
          "</p></div>" +
          "<div  class='timeline-content'><h6 class='notif'>" +
          appointment.AppointmentID +
          "</h6></div>" +
          "<div class='timeline-action' ><button class='set-btn button circle'  id=" +
          appointment.AppointmentID +
          "><h8>Change Doctor </h8></button> </div>" +
          " </div>";
      } else {
        container2.innerHTML =
          "<div class='timeline-item' >  <div class='timeline-date'> <div class='notif-date' id='apntDate'>" +
          dateString +
          "\n" +
          appointment.time +
          ".00</div></div><div class='timeline-content'><h6 class='notif'></h6><p>" +
          appointment.Department +
          "</p></div>" +
          "<div  class='timeline-content'><h6 class='notif'>" +
          appointment.AppointmentID +
          "</h6></div>" +
          "<div class='timeline-action'><button class='set-btn button circle' ><h8>Set Doctor </h8></button> </div>" +
          " </div>";
      }

      container2.style.display = "none";
      const container3 = document.createElement("div");
      container3.classList.add("change-doc");

      container3.innerHTML =
        "<form><div class='row' style='margin-bottom:5px'><div class='half'><select  class='departments'></select></div> <div class='half'><select class='doctorNames'  id='docNames'><option value='63e3acccd2fd5b49f58a59ff'>Dr. Michael Johnson</option><option value='63e3acccd2fd5b49f58a5a00' >Dr. Susan Jenkins</option><option value='63e3acccd2fd5b49f58a5a01'>Dr. David Wilson</option ><option value='63e3acccd2fd5b49f58a5a02'>Dr. Samantha Smith</option><option value='63e3acccd2fd5b49f58a5a03'>Dr. Richard Anderson</option></select></div><button class='upd-doc button circle'  id=" +
        appointment.AppointmentID +
        " >Update</button></div></form>";

      container3.style.display = "none";
      container.appendChild(container2);
      container.appendChild(container3);
      appointDetails.appendChild(container);

      li.append(container);
      ul.append(li);
      count++;
    });

    addUpdateListner();

    const lis = document.querySelectorAll(".container");
    let isExpanded = false;

    for (const element of lis) {
      const eles = element.querySelector(".appoint-row");
      eles.addEventListener("click", function () {
        if (isExpanded) {
          element.querySelector(".detail-container").style.display = "none";
          isExpanded = false;
        } else {
          element.querySelector(".detail-container").style.display = "block";
          isExpanded = true;
        }
      });
    }

    const setButtonlist = document.querySelectorAll(".set-btn");
    let btnIsExpanded = false;

    for (const btn of setButtonlist) {
      btn.addEventListener("click", function (e) {
        if (btnIsExpanded) {
          this.parentElement.parentElement.parentElement.parentElement.querySelector(
            ".change-doc"
          ).style.display = "none";
          btn.innerText = "Set Doctor";
          btnIsExpanded = false;
        } else {
          this.parentElement.parentElement.parentElement.parentElement.querySelector(
            ".change-doc"
          ).style.display = "block";

          btn.innerText = "close";
          btnIsExpanded = true;
        }
      });
    }
  };

  async function addUpdateListner() {
    const updateButtonList = document.querySelectorAll(".upd-doc");
    // console.log(updateButtonList);
    for (const btn of updateButtonList) {
      btn.addEventListener("click", function (e) {
        // alert("Doctor updated");
        e.preventDefault();

        const nameSelectorRow = this.parentElement;
        const Name = nameSelectorRow.querySelector("#docNames");
        console.log(Name.value);

        console.log(this.id);
        if (updateAppointmentDoctor(Name.value, this.id)) {
          location.reload();
        } else {
          alert("Error occured!!");
        }
      });
    }

    // to set department selector

    try {
      const DepartmentArr = await getDepartments();
      setDepartments(DepartmentArr);
    } catch (error) {
      console.error(error);
    }

    // -----------------To set available doctor---------

    const department = document.querySelector("#department");

    department.addEventListener("change", async function () {
      try {
        const appointmentDate = document.querySelector("#apntDate");
        const appointmentSlot = document.querySelector("#apntTime");
        const date = appointmentDate.value;
        const time = appointmentSlot.value;
        const department = this.value;
        const doctorArr = await getAvailableDoctor(department, date, time);
        updateAvailableDoctor(doctorArr);
      } catch (error) {
        console.error(error);
      }
    });
  }

  // /////////////////////////////////////////////////////////////////////////////////

  function setDepartments(DepartmentArr) {
    const departmentSelectors = document.querySelectorAll(".departments");
    for (const departmentSelector of departmentSelectors) {
      if (DepartmentArr.length == 0) {
        departmentSelector.innerHTML =
          '<option value="">No Department Available</option>';
      } else {
        departmentSelector.innerHTML =
          '<option value="">Select one Department</option>';

        DepartmentArr.forEach(function (Dept) {
          const option = document.createElement("option");
          option.value = Dept.name;
          option.textContent = Dept.name;
          departmentSelector.appendChild(option);
        });
      }
    }
  }

  async function getDepartments() {
    try {
      const raw = JSON.stringify({
        requestedId: "Hello",
        Hospital,
      });

      const result = await requestor(
        "POST",
        raw,
        "https://ayur.vercel.app/api/Receptionist/department-list"
      );
      const data = JSON.parse(result);

      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  async function getAvailableDoctor(department, date, time) {
    try {
      const raw = JSON.stringify({
        requestedId: "Hello",
        department,
        Hospital,
        date,
        time,
      });

      const result = await requestor(
        "POST",
        raw,

        "https://ayur.vercel.app/api/Receptionist/available-doctor"
      );
      const data = JSON.parse(result);

      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  function updateAvailableDoctor(availableDoctors) {
    const doctorName = document.querySelector("#docNames");
    if (availableDoctors.length == 0) {
      doctorName.innerHTML = '<option value="">No Doctor Available</option>';
    } else {
      doctorName.innerHTML = '<option value="">Select one Doctor</option>';

      availableDoctors.forEach(function (doctor) {
        const option = document.createElement("option");

        option.value = doctor._id;
        option.textContent = doctor.Name;
        doctorName.appendChild(option);
      });
    }
  }

  // /////////////////////////////////////////////////////////////////////////////////

  async function updateAppointmentDoctor(doctorID, id) {
    let raw = JSON.stringify({
      requestedId: "Hello",
      ID: id,
      doctorID: doctorID,
      Hospital,
    });
    let result = await requestor(
      "PUT",
      raw,
      "https://ayur.vercel.app/api/Receptionist/update-appointment-doctor"
    );

    let data = JSON.parse(result);
    console.log(data);
    if (data.acknowledged) {
      return true;
    }
  }

  async function updateStatus(status, id, reason) {
    let raw = JSON.stringify({
      requestedId: "Hello",
      ID: id,
      Status: status,
      Reason: reason,
      Hospital,
    });
    let result = await requestor(
      "PUT",
      raw,
      "https://ayur.vercel.app/api/Receptionist/update-appointment-status"
    );

    let data = JSON.parse(result);
    // console.log(data);
    if (data.acknowledged) {
      return data.data;
    }
  }

  function addListener() {
    const rejBtn = document.querySelectorAll(".rej-btn");
    const acptBtn = document.querySelectorAll(".acc-btn");

    rejBtn.forEach((btn) => {
      btn.addEventListener("click", function handleClick(event) {
        const parentData = this.parentElement.parentElement.parentElement;
        // console.log(parentData.id);
        let desc = prompt("Enter the reason :");
        console.log(desc);
        if (desc != null) {
          updateStatus("REJECTED", parentData.id, desc);
          location.reload();
        }
      });
    });

    acptBtn.forEach((btn) => {
      btn.addEventListener("click", function handleClick(event) {
        const parentData = this.parentElement.parentElement.parentElement;
        console.log(parentData);
        // let desc = prompt("type ACCEPT");
        // if (desc.toLocaleLowerCase() == "accept") {
        // console.log(desc);
        // console.log(parentData.id);
        alert("Confirm ?");
        updateStatus("APPROVED", parentData.id, "null");
        location.reload();
        // }
      });
    });
  }

  const today = new Date();
  // const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1);
  await setAppointment(
    ".req-appointmentList",
    "REQUESTED",
    today.toISOString().slice(0, 10)
    // "2023-04-20"
  );

  // await setAppointment(
  //   ".aprv-appointmentList",
  //   "APPROVED",
  //   today.toISOString().slice(0, 10)
  //   // "2023-04-20"
  // );
  addListener();
});
