window.onload = run
window.onhashchange = go_hash

function run(){ 
 go_hash()
}


nav_open = false;
nav_button = false;
scroll_back = null
back = false
function open_nav(){
    nav_button = true
    if(!nav_open){
        document.getElementById("drawer").classList.remove("closed");
        document.getElementById("drawer").classList.add("open");
        document.getElementById("sidenav").style.width = "200px";
        nav_open = !nav_open
    }
    else{
        close_nav()
    }
}

function close_nav(){
    if(nav_open && !nav_button){
        document.getElementById("drawer").classList.remove("open");
        document.getElementById("drawer").classList.add("closed");
        document.getElementById("sidenav").style.width = "0";
        nav_open = !nav_open
    }
    nav_button = false
}

function switch_content(content_display){
    data = ["-Blank", "-Home", "-Projects", "-AboutMe", "-Education"]
    for(i = 0; i < data.length; i++){
        document.getElementById(data[i]).classList.remove("Content");
        document.getElementById(data[i]).classList.add("not_Content");
    }

    document.getElementById("-"+content_display).classList.remove("not_Content");
    document.getElementById("-"+content_display).classList.add("Content");
    location.hash = content_display
}

function jump(element){  
    var get = document.getElementById(element);  
    document.getElementById("Content_Container").scrollTo(0,get.offsetTop); 
} 

function jump_top(){
    document.getElementById("Content_Container").scroll(0,0); 
}

function go_hash(){
    var pound=window.location.href.split("#");
    if(pound.length > 1){
        switch_content(pound[1])
    }
    else{
        switch_content("Home")
    }
    document.body.addEventListener("click", close_nav);
}