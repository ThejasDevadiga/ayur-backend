 

var data = requestor({
      "requestedId": "Hello",
      "filter": {},
      "projection": {
        "_id": 0
      }
    },
    "POST",
    "http://localhost:5000/api/manager/get-patient-details")
console.log(data);
