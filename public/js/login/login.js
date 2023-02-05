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

    var  data = await requestor("POST",raw,"http://localhost:5000/api/user/validate-user")
    data = JSON.parse(data)
    console.log(data);
    if(data.acknowledged){  
     sessionStorage.setItem("token",data.token)
     sessionStorage.setItem("user",data.user)
     sessionStorage.setItem("userROle",data.userROle)
     if(data.userROle=='admin'){
        location.href= "/views/Admin/admin.pug"
     }
     else if(data.userROle=='consultant'){
      location.href= "/views/Consultant/consultant.pug"
     }
     else if(data.userROle=='reception'){
      location.href= "/views/Receptionist/receptionist.pug"
    }
    else if(data.userROle=='warden'){
      location.href= "/views/Warden/warden.pug"
      }
    else if(data.userROle=='manager'){
        location.href= "/views/Manager/manager.pug"
        }
    else{
      document.getElementById("alert").innerHTML = "Contact admin!  error:Unknown user";
    }
  }
    else{
      document.getElementById("alert").innerHTML = data.message;
    }
     }
   
     // Get the form element
     const form = document.getElementById("myForm");
   
     // Add 'submit' event handler
     form.addEventListener("submit", (event) => {
       event.preventDefault();
       sendData();
     });
   
   });
   