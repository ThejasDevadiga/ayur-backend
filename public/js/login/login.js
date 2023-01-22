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
     location.href= "../Consultant/HTML/consultant"
    }
    else{
      alert("Invalid User")
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
   