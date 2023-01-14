
url="http://localhost:5000/api/manager/get-patient-details"
data = JSON.stringify({
  "requestedId": "Hello",
  "filter": {},
  "projection": {
    "_id": 0
  }
});


requestor("POST",data,url,myHeaders)

