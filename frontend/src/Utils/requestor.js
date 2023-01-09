var axios = require('axios');
var generateToken = require('../Utils/generateToken')
function requestor(data,method,url){
// var data = JSON.stringify({
//   "requestedId": "requestingPatientsList",
//   "filter": {},
//   "projection": {
//     "_id": 0
//   }
// });

var config = {
  method: method,
  url: url,
  headers: { 
    'authorization':generateToken("requestingPatientsList"), 
    'Access-Control-Request-Headers': '*', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
})
}


// export {requestor}