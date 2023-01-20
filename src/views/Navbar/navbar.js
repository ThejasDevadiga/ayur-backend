const fullScreenBtn = document.querySelector('.fullScreen')
const fullBody = document.querySelector('body')
function fullScreenMode (){
    fullBody.requestFullscreen()
.then(function() {
    console.log("Full screen button clicked");
})
.catch(function(error) {
    console.log(error.message);
})
}
fullScreenBtn.addEventListener('click', fullScreenMode);


