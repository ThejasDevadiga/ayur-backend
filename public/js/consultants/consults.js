
window.addEventListener("load", () => {
  async function getDrugsList(){
    var  raw = JSON.stringify({
      requestedId:"Hello",
      filter:{},
      projection:{_id:0}
    });
  
  var  res = await requestor("POST",raw,"http://localhost:5000/api/consultant/drugs-list")
  res = JSON.parse(res)
  sessionStorage.setItem("availableDrug",JSON.stringify(res.data));
  }
  getDrugsList()
 
    async  function addDrugtoList() {
        const drugName = document.getElementById("drugName").value;
        const drugQuantity = document.getElementById("drugQuantity").value;
        const drugMorn = document.getElementById("mor").checked ? 1:0;
        const drugAftr = document.getElementById("aft").checked? 1:0;
        const drugEve = document.getElementById("eve").checked?1:0;
        const drugTiming = drugMorn+'-'+drugAftr+'-'+drugEve;
        const drugNote = document.getElementById("note").value;
        if (sessionStorage.getItem("drugList")==null){
            var drugDet = JSON.stringify(Array({drugName,drugQuantity,drugTiming,drugNote}))
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

        // document.getElementById("alert").innerHTML = 'Drug added'
        location.reload();
     }
   
      const Drugform = document.getElementById("listDrug");
     
      Drugform.addEventListener("submit", (event) => {
       event.preventDefault();
        addDrugtoList();
     });
     
     
    });
 // ------------------------------------------------------------------

 
    window.addEventListener("load", () => {
async  function MakeReport() {
    console.log("making report");
    // document.getElementById("alert").innerHTML = "Contact admin!  error:Unknown user";
    
    const patientName = document.getElementById("name").value;
    const patientID = document.getElementById("pid").value;
    const patientPhone = document.getElementById("phone").value;

    // Retrieve the string from session storage
    var listAsString = sessionStorage.getItem("drugList");
    // Convert the string back to a list of JSON objects
    const drugList = JSON.parse(listAsString);
    
  console.log(drugList);
   var  raw = JSON.stringify({
     requestedId:"Hello",
    patientName,
    patientID,
    drugList
   });

var  data = await requestor("POST",raw,"http://localhost:5000/api/consultant/makePrescription")
data = JSON.parse(data)
document.getElementById("alert").innerHTML = data;
console.log(data);
if(data.acknowledged){  
//  sessionStorage.removeItem("drugList")
//  location.href = "/views/Consultant/consultant.pug"
}


// else{
//   document.getElementById("alert").innerHTML = "Contact admin!  error:Unknown user";
// }
//   }
//     else{
//       document.getElementById("alert").innerHTML = data.message;
//     }
 

}

const Reportform = document.getElementById("makeReport");
     Reportform.addEventListener("submit", (event) => {
       event.preventDefault();
       MakeReport();
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
