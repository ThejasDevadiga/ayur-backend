
let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; 
    arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".fa-bars");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
sidebar.classList.toggle("close");
});

$(document).ready(function(){
    $('.menu').on('click', function() {
		$('.bar').toggleClass('animate');
        $('.expand-menu').toggleClass('animate');
        $('.expand-menu .nav-link').toggleClass('animate');
        setTimeout(function(){
            $('.expand-menu .nav-link').toggleClass('animate-show');
        },500)
	})
    
})


  