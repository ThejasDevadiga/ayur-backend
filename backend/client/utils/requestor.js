const axios = require('axios');

async function requestor(type, raw, url) {
  const headers = {
    'Access-Control-Request-Headers': '*',
    'Content-Type': 'application/json'
  };
  const config = {
    method: type,
    headers,
    data: raw,
    url
  };
  // console.log(config);

  try {
    const response = await axios(config);
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error :', error.response.data.message);
    return null;
  }
}

module.exports = requestor;
