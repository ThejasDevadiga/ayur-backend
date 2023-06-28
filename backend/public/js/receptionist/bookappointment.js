window.addEventListener("load", async () => {
  const raw = JSON.stringify({
    requestedId: "Hello",
  });
  var result = await requestor(
    "POST",
    raw,
    "http://localhost:5000/api/Receptionist/get-hospital-list"
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

    hospital.addEventListener("change", function () {
      const Hospital = JSON.parse(hospital.value);

      sessionStorage.setItem("Hospital", JSON.stringify(Hospital));

      document.getElementById("branch").value = Hospital["Branch"];
    });
  }

  if (sessionStorage.getItem("Hospital") == "undefined") {
    console.log("warden");
    Hospital = {};
  } else {
    Hospital = JSON.parse(sessionStorage.getItem("Hospital"));
  }

  const Role = sessionStorage.getItem("userRole");
  if (Role == "receptionist") {
    document.getElementById("receptionist").checked = true;
  } else if (Role == "warden") {
    document.getElementById("warden").checked = true;
  }
  
  // ----------set available slots ---------------
  const appointmentDate = document.querySelector("#apntDate");
  const appointmentSlot = document.querySelector("#apntTime");

  appointmentDate.addEventListener("change", async function () {
    try {
      const date = this.value;
      const slots = await getAllottedSlots(date);
      const availableSlot = getAvailableSlots(slots);
      updateAppointmentSlots(availableSlot);
    } catch (error) {
      console.error(error);
    }
  });

  function getAvailableSlots(slots) {
    const availableSlots = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5].filter(
      (element) => {
        return !slots.some((slot) => slot.slot === element);
      }
    );

    return availableSlots;
  }

  function updateAppointmentSlots(availableSlots) {
    appointmentSlot.innerHTML = '<option value="">Select a slot</option>';

    availableSlots.forEach(function (slot) {
      const option = document.createElement("option");
      option.value = slot;
      option.textContent = `${slot}.00 - ${slot + 1}.00`;
      appointmentSlot.appendChild(option);
    });
  }

  async function getAllottedSlots(date) {
    try {
      const raw = JSON.stringify({
        requestedId: "Hello",
        date,
        Hospital,
      });

      const result = await requestor(
        "POST",
        raw,
        "http://localhost:5000/api/Receptionist/allotted-Timeslots"
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

  // ------------------------------------------
  // -----------------To set departments-------------

  const departments = document.querySelector("#department");
  appointmentSlot.addEventListener("change", async function () {
    try {
      const DepartmentArr = await getDepartments();
      setDepartments(DepartmentArr);
    } catch (error) {
      console.error(error);
    }
  });
  function setDepartments(DepartmentArr) {
    if (DepartmentArr.length == 0) {
      departments.innerHTML =
        '<option value="">No Department Available</option>';
    } else {
      departments.innerHTML = '<option value="">Select one Department</option>';

      DepartmentArr.forEach(function (Dept) {
        const option = document.createElement("option");
        option.value = Dept.name;
        option.textContent = Dept.name;
        departments.appendChild(option);
      });
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
        "http://localhost:5000/api/Receptionist/department-list"
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

  // -----------------To set available doctor---------

  const department = document.querySelector("#department");
  const doctorName = document.querySelector("#doctorName");

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

          "http://localhost:5000/api/Receptionist/available-doctor"
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
  });

  async function appointmentPatient() {
    const PatientID = document.getElementById("pid").value;
    const Description = document.getElementById("desc").value;
    const date = document.getElementById("apntDate").value;
    const time = document.getElementById("apntTime").value;
    // const department = document.getElementById("department").value?"notSet":document.getElementById("department").value;
    const doctorID = document.getElementById("doctorName").value
      ? document.getElementById("doctorName").value
      : "notSet";
    const Symptoms = document.getElementById("symptoms").value;
    // const WardenName = sessionStorage.getItem("userName");
    const WardenID = sessionStorage.getItem("userId");
    const AppointmentID = GenerateId("APNT");
    const Hospital = JSON.parse(sessionStorage.getItem("Hospital"));

    // document.getElementById("term").innerHTML = [
    //   PatientID, //
    //   PatientName,
    //   AppointmentID, //
    //   date, //
    //   time, //
    //   doctorID, //
    //   doctorName, //
    //   department, //
    //   Symptoms, //
    //   Description,
    //   WardenName, //
    //   WardenID, //
    // ];

    var raw = JSON.stringify({
      requestedId: "Hello",
      PatientID,
      AppointmentID,
      date,
      time,
      doctorID,
      Symptoms,
      Description,
      WardenID,
      Hospital,
    });

    var result = await requestor(
      "POST",
      raw,
      "http://localhost:5000/api/Receptionist/make-Appointments"
    );

    data = JSON.parse(result);
    // console.log(data);
    if (data.acknowledged) {
      // document.getElementById("term").innerHTML = data;
      const Role = sessionStorage.getItem("userRole");
      if (Role === "receptionist") {
        location.href = "/views/" + Role + "/receptionist.pug";
      } else if (Role === "manager") {
        location.href = "/views/" + Role + "/manager.pug";
      } else if (Role === "admin") {
        location.href = "/views/" + Role + "/admin.pug";
      } else if (Role === "warden") {
        location.href = "/views/" + Role + "/warden.pug";
      } else {
        location.href = "/views/login/login.pug";
      }
    } else {
      alert(data.message);
    }
  }

  const appointmentForm = document.getElementById("appointmentForm");
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");
    appointmentPatient();
  });
});
