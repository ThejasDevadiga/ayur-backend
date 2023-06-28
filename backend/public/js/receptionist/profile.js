window.addEventListener("load", async () => {

    const viewMoreBtn = document.querySelectorAll(".viewApp")
  
    viewMoreBtn.forEach((btn) => {
      btn.addEventListener("click", function handleClick(event) {
        console.log(this.id);
        location.href = "http://localhost:5000/views/Consultant/report/"+this.id
      })
    })
})