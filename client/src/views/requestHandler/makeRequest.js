const jwt = require("jsonwebtoken");
const axios = require("axios");



const makeRequest = async (url, payload) => {
  console.log(payload);
  const generateToken = (id) => {
    return jwt.sign({ id }, "EMRSOFTWARE", {
      expiresIn: "1h",
    });
  };
  console.log("Generated token :", generateToken(payload.id));

  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Request-Headers": "*",
      "authorization": generateToken(payload.id),
    },
  };
  console.log("url : " + url);
  console.log("payload : " + payload.id);
  console.log("config : " + config.headers["Content-type"]);
  let fetchedData = {}
  await axios.post(url, payload, config).then(response => {
    console.log("res ",response);
    console.log("response code : " + response.status)
    console.log("Response data :", response.data)
    fetchedData = response.data
    return response.data
  }).catch(error => {
    console.log(error);
    return error;
  })
  


  return fetchedData;
}


// const data =  makeRequest(
//   "http://localhost:5000/api/faculty-data",
//   { id: "Hello" }
// );
// console.log(data);


export default makeRequest;
