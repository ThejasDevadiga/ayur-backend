window.addEventListener("load", async () => {
  const viewMoreBtn = document.querySelectorAll(".viewApp");

  viewMoreBtn.forEach((btn) => {
    btn.addEventListener("click", function handleClick(event) {
      console.log(this.id);
      location.href =
        "https://ayur.vercel.app/views/Consultant/report/" + this.id;
    });
  });
});
