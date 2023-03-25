// window.addEventListener("load", () => {
//   document.getElementById("outer3").addEventListener("click", toggleState3);

//   function toggleState3() {
//     let galleryView = document.getElementById("galleryView");
//     let tilesView = document.getElementById("tilesView");
//     let outer = document.getElementById("outer3");
//     let slider = document.getElementById("slider3");
//     let tilesContainer = document.getElementById("tilesContainer");
//     if (slider.classList.contains("active")) {
//       slider.classList.remove("active");
//       outer.classList.remove("outerActive");
//       galleryView.style.display = "flex";
//       tilesView.style.display = "none";

//       while (tilesContainer.hasChildNodes()) {
//         tilesContainer.removeChild(tilesContainer.firstChild);
//       }
//     } else {
//       slider.classList.add("active");
//       outer.classList.add("outerActive");
//       galleryView.style.display = "none";
//       tilesView.style.display = "flex";

//       for (let i = 0; i < historyData.length - 1; i++) {
//         let tileItem = document.createElement("div");
//         tileItem.classList.add("tileItem");
//         tileItem.style.background = "url(" + historyData[i] + ")";
//         tileItem.style.backgroundSize = "contain";
//         tilesContainer.appendChild(tileItem);
//       }
//     }
//   }

//   let historyData = [
//     {
//       doctorName: "Doctor Name 1",
//       Department: "dept1",
//       Date: "2023-02-20",
//       Time: "8.00-9.00",
//       Disease: "disease1",
//       Prescriptions: ["tabl1", "tabl2", "tabl3", "tabl4"],
//       suggestions: "take a glass of water daily!",
//     },
//     {
//       doctorName: "Doctor Name 2",
//       Department: "dept2",
//       Date: "2023-02-14",
//       Time: "10.00-12.00",
//       Disease: "disease2",
//       Prescriptions: ["tabl1", "tabl2", "tabl3", "tabl4"],
//       suggestions: "glass of water daily!",
//     },
//     {
//       doctorName: "Doctor Name 3",
//       Department: "dept3",
//       Date: "2023-02-07",
//       Time: "4.00-5.00",
//       Disease: "disease3",
//       Prescriptions: ["tabl1", "tabl2", "tabl3", "tabl4"],
//       suggestions: "water daily!",
//     },
//   ];

//   let mainCase = 0;
//   let prevCase = historyData.length - 1;
//   let nextCase = 1;

//   function loadGallery() {
   
//     let mainView = document.getElementById("mainView");
//     // mainView.style.background = "url(" + historyData[mainCase] + ")";
//     mainView.innerHTML =
//       "<h4 class='heading' > Case History " +
//       mainCase +
//       "</h4 ><div class='header-section'><div><h4>Doctor :</h4><h2>" +
//       historyData[mainCase].doctorName +
//       "</h2></div><div><h4>Department :</h4><h2>" +
//       historyData[mainCase].Department +
//       "</h2></div></div><hr size='2' color='#2d397c'>" +
//       "<div class='body-section'><div class='complaints'><div class='disease-data'><h4>Disease :</h4><h3>" +
//       historyData[mainCase].Disease +
//       "</h3></div><div class='description'><h4>Suggestion :</h4><h3>"+ historyData[mainCase].suggestions+"</h3></div></div><div class='prescription'></div></div><div class='foot-section'><h3>Date :" +
//       historyData[mainCase].Date +
//       "</h3><h3>Time:" +
//       historyData[mainCase].Time +
//       "</h3></div>";
//    }

//   function scrollRight() {
//     prevCase = mainCase;
//     mainCase = nextCase;
//     if (nextCase >= historyData.length - 1) {
//       nextCase = 0;
//     } else {
//       nextCase++;
//     }
//     loadGallery();
//   }

//   function scrollLeft() {
//     nextCase = mainCase;
//     mainCase = prevCase;

//     if (prevCase === 0) {
//       prevCase = historyData.length - 1;
//     } else {
//       prevCase--;
//     }
//     loadGallery();
//   }

//   document.getElementById("navRight").addEventListener("click", scrollRight);
//   document.getElementById("navLeft").addEventListener("click", scrollLeft);
//   document.getElementById("rightView").addEventListener("click", scrollRight);
//   document.getElementById("leftView").addEventListener("click", scrollLeft);
//   document.addEventListener("keyup", function (e) {
//     if (e.keyCode === 37) {
//       scrollLeft();
//     } else if (e.keyCode === 39) {
//       scrollRight();
//     }
//   });

//   loadGallery();
// });
