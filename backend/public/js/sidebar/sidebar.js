window.addEventListener("load", () => {
  const logOut = document.getElementById("logout");
  logOut.addEventListener("click", async (event) => {
    event.preventDefault();
    const userName = sessionStorage.userID;
    var raw = JSON.stringify({
      requestedId: "Hello",
      userID: userName,
    });
    var data = await requestor(
      "POST",
      raw,
      "https://ayur.vercel.app//api/user/logOut-user"
    );
    data = JSON.parse(data);

    if (data.acknowledged) {
      sessionStorage.clear();
      if ((data.message = "Successfully logged out")) {
        console.log("Success");
      }
      location.href = "https://ayur.vercel.app//views/login/login.pug";
    } else {
      alert("Error while logging out!!");
    }
  });
});
