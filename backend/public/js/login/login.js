window.addEventListener("load", () => {
    async  function sendData() {
     const userName = document.getElementById("username").value;
     const password = document.getElementById("password").value;

       console.log("submitter");
       var  raw = JSON.stringify({
         requestedId:"Hello",
         username:userName,
         password:password
       });
       let result = await requestor(
        "POST",
        raw,
       "http://localhost:5000/api/user/validate-user"
      );
      const data = JSON.parse(result);
     console.log(data);
     
    if(data.acknowledged){   
     sessionStorage.setItem("token",data.token)
     sessionStorage.setItem("userName",data.userName)
     sessionStorage.setItem("EmployeeID",data.userID)
     sessionStorage.setItem("userRole",data.userRole)
     sessionStorage.setItem("Hospital",JSON.stringify(data.Hospital))

     if(data.userRole=='admin'){
        location.href= "/views/Admin/admin.pug"
     }
     else if(data.userRole=='consultant'){
      location.href= "/views/Consultant/consultant.pug"
     }
     else if(data.userRole=='receptionist'){
      location.href= "/views/Receptionist/receptionist.pug"
    }
    else if(data.userRole=='warden'){
      location.href= "/views/Warden/warden.pug"
      }
    else if(data.userRole=='manager'){
        location.href= "/views/Manager/manager.pug"
        }
    else{
      document.getElementById("alert").innerHTML = "Contact admin!  error:Unknown user";
    }
  }
    // else{
      // document.getElementById("alert").innerHTML = data.message;
    // }
     }

     const form = document.getElementById("myForm");

     form.addEventListener("submit", (event) => {
       event.preventDefault();
       sendData();
     });
   
   });
   