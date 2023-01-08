import { requestor } from '../../EXTRAS/requestor';

const sideBar = document.querySelector(".sidebar")
fetch('../sideBar.html')
.then(res=>res.text())
.then(data =>{
    sideBar.innerHTML = data;
})


const navbar = document.querySelector("nav")
fetch('../../Navbar/navbar.html')
.then(res=>res.text())
.then(data =>{
    navbar.innerHTML = data;
})


