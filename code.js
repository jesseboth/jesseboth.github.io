﻿window.onload = run

nav_open = false;
function open_nav(){
    if(!nav_open){
        document.getElementById("drawer").classList.remove("closed");
        document.getElementById("drawer").classList.add("open");
        document.getElementById("mySidenav").style.width = "200px";
        nav_open = !nav_open
    }
    else{
        close_nav()
    }
}

function close_nav(){
    if(nav_open){
        document.getElementById("drawer").classList.remove("open");
        document.getElementById("drawer").classList.add("closed");
        document.getElementById("mySidenav").style.width = "0";
        nav_open = !nav_open
    }
}

function switch_content(content_display){
    data = ["Home", "Projects", "AboutMe", "Contact"]
    for(i = 0; i < data.length; i++){
        document.getElementById(data[i]).classList.remove("Content");
        document.getElementById(data[i]).classList.add("not_Content");
    }

    document.getElementById(content_display).classList.remove("not_Content");
    document.getElementById(content_display).classList.add("Content");
    location.hash = "-" + content_display
}

function run(){
    var pound=window.location.href.split("#");
    if(pound.length > 1){
        switch_content(pound[1].substr(1))
    }
}