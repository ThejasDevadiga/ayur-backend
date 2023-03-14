window.addEventListener("load", () => {
  const logOut = document.getElementById("logout");
  logOut.addEventListener("click", async (event) => {
    event.preventDefault();
    const userName = sessionStorage.userID
    var raw = JSON.stringify({
      requestedId: "Hello",
      userID: userName,
    });
    var data = await requestor(
      "POST",
      raw,
      "http://localhost:5000/api/user/logOut-user"
    );
    data = JSON.parse(data);
    
    if (data.acknowledged) {
      sessionStorage.clear()
      if(data.message = 'Successfully logged out'){
        console.log("Success");
      }
      location.href = "http://localhost:5000/views/login/login.pug"
    }
    else{
       alert("Error while logging out!!")
    }
  });
});
