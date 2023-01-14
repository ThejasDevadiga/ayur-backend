var myHeaders = new Headers();
function requestor(method, data, url, header){
  var raw = data
  myHeaders.append("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkhlbGxvIiwiaWF0IjoxNjcyOTk0NTI0LCJleHAiOjE2NzU1ODY1MjR9.tZfxL6NwPVl3IvCxjgZXECSPTBo5ST4Pw9wkbe3jV7k");
  myHeaders.append("Access-Control-Request-Headers", "*");
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}