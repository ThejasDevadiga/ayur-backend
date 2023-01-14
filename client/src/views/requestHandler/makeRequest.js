// const axios = require("axios");
import axios from 'axios'

const makeRequest = async (method,url, payload) => {
  console.log(payload);
  const generateToken = (id) => {
    // return jwt.sign({ id }, "EMRSOFTWARE", {
    //   expiresIn: "1h",
    // });
    return "Generated token"
  };
  console.log("Generated token :", generateToken(payload.id));

  const config = {
    method: method,
    url: url,
    headers: {
      "Content-type": "application/json",
      // "Access-Control-Request-Headers": "*",
      "authorization": generateToken(payload.id),
    },
    data: payload,
  };

  // console.log("url : " + url);
  // console.log("payload : " + payload.id);
  // console.log("config : " + config);
  let fetchedData = {}
  await axios(config).then(response => {
    // console.log("res ",response);
    // console.log("response code : " + response.status)
    console.log("Response data :",url,"===>>", response.data)
    fetchedData = response.data
    return response.data
  }).catch(error => {
    console.log(error);
    return error;
  })
  return fetchedData;
}


 

export default makeRequest;
