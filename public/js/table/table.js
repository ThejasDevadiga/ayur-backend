window.addEventListener("load", () => {
  const patlist = document.querySelectorAll(".pat-list");
  patlist.forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      const values = Array.from(row.querySelectorAll("td p")).map(
        (p) => p.textContent
      );
      const Name = values[0];
      const PID = values[6];
      window.location.href =
        "/views/Receptionist/book-appointment/" + PID + "&" + Name;
    });
  });
  
  const docList = document.querySelectorAll(".doc-list");
  docList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      const values = Array.from(row.querySelectorAll("td p")).map(
        (p) => p.textContent
      );
      const docID = values[4];
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
     
      window.location.href =
        "/views/Receptionist/viewAppointment/" + today + "&" + docID;
    });
  });


// prescription

const prescriptions = document.querySelectorAll(".doc-list");
prescriptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    const row = btn.closest("tr");
    const values = Array.from(row.querySelectorAll("td p")).map(
      (p) => p.textContent
    );
    const docID = values[0];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); 
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    window.location.href =
      "/views/Receptionist/viewAppointment/" + today + "&" + docID;
  });
});
});
