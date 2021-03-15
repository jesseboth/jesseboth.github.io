nav_open = true;
function open_nav(){
    if(!nav_open){
        document.getElementById("drawer").classList.remove("closed");
        document.getElementById("drawer").classList.add("open");
        document.getElementById("mySidenav").style.width = "0";
    }
    else{
        document.getElementById("drawer").classList.remove("open");
        document.getElementById("drawer").classList.add("closed");
        document.getElementById("mySidenav").style.width = "200px";
    }
    nav_open = !nav_open
}