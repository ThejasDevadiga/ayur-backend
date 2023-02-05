window.addEventListener("load", () => {
    async  function addDrugtoList() {
        const drugName = document.getElementById("drugName").value;
        const drugQuantity = document.getElementById("drugQuantity").value;
        const drugMorn = document.getElementById("mor").checked ? 1:0;
        const drugAftr = document.getElementById("aft").checked? 1:0;
        const drugEve = document.getElementById("eve").checked?1:0;
        const drugTiming = drugMorn+'-'+drugAftr+'-'+drugEve;
        const drugNote = document.getElementById("note").value;
        if (sessionStorage.getItem("drugList")==null){
            var drugDet = JSON.stringify([{drugName,drugQuantity,drugTiming,drugNote}])
                sessionStorage.setItem("drugList",drugDet);
        }
        else{

            // Retrieve the string from session storage
            var listAsString = sessionStorage.getItem("drugList");

            // Convert the string back to a list of JSON objects
            var listOfObjects = JSON.parse(listAsString);

            // Add a new element to the list
            listOfObjects.push({drugName,drugQuantity,drugTiming,drugNote});

            // Convert the updated list to a string
            listAsString = JSON.stringify(listOfObjects);

            // Store the updated string back in session storage
          
            sessionStorage.setItem("drugList",listAsString)
            
        }
        
        
        document.getElementById("alert").innerHTML = 'lol'
        location.reload();
    //    console.log("submitter");
    //    var  raw = JSON.stringify({
    //      requestedId:"Hello",
    //      username:userName,
    //      password:password
    //    });

    // var  data = await requestor("POST",raw,"http://localhost:5000/api/user/validate-user")
    // data = JSON.parse(data)
    // console.log(data);
    // if(data.acknowledged){  
    //  sessionStorage.setItem("token",data.token)
    
    // else{
    //   document.getElementById("alert").innerHTML = "Contact admin!  error:Unknown user";
    // }
//   }
//     else{
//       document.getElementById("alert").innerHTML = data.message;
//     }
     }
   
      const form = document.getElementById("listDrug");
     
     form.addEventListener("submit", (event) => {
       event.preventDefault();
       addDrugtoList();
     });
   
   });

   function deleteItem(index) {
    // Retrieve the string from session storage
    var listAsString = sessionStorage.getItem("drugList");

    // Convert the string back to a list of JSON objects
    var listOfObjects = JSON.parse(listAsString);

    // Remove the item from the list
    listOfObjects.splice(index, 1);

    // Convert the list back to a string and store it in session storage
    listAsString = JSON.stringify(listOfObjects);
    sessionStorage.setItem("drugList", listAsString);

    // Reload the page to reflect the changes
    location.reload();
   }