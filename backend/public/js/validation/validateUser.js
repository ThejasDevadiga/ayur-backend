window.addEventListener("load",async (userList)=>{
    
    if(window.sessionStorage.getItem("token")==null){
        location.href="/views/login/login.pug"
    }
    
})
