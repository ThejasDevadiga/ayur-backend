window.addEventListener("load", () => {
    const employeeRegister = ()=>{
        
    }

    const employeeForm = document.getElementById("regEmployeeForm");
    employeeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Form submitted");
      employeeRegister();
    });



})