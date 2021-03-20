window.onload = run
window.onhashchange = go_hash

function run(){ 
 go_hash()
}


nav_open = false;
nav_button = false;
content = false
scroll_to = null
jump_after = null
jump_after_int = 0
jump_after_int = null
previous_hash = null
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
    content = true

    scroll_by = document.getElementById("Content_Container").scrollTop
    history.replaceState({"title":content_display, 
    "scroll": scroll_by},
    '');

    location.hash = content_display
    previous_hash = content_display
    show_content(content_display)
}
function show_content(content_display){
    data = ["-Blank", "-Home", "-Projects", "-AboutMe", "-Education"]
    for(i = 0; i < data.length; i++){
        document.getElementById(data[i]).classList.remove("Content");
        document.getElementById(data[i]).classList.add("not_Content");
    }

    document.getElementById("-"+content_display).classList.remove("not_Content");
    document.getElementById("-"+content_display).classList.add("Content");
    if(jump_after != null){
        jump(jump_after)
        jump_after = null
    }
}

function jump(element){  
    jump_after = element
    var get = document.getElementById(element);  
    document.getElementById("Content_Container").scrollTo(0,get.offsetTop);
} 

function jump_int(integer){
    document.getElementById("Content_Container").scrollTo(0,integer); 
}

function jump_top(){
    document.getElementById("Content_Container").scroll(0,0); 
}

function go_hash(){
    var pound=location.hash;
    if(pound.length != ""){
        show_content(pound.substring(1))
    }
    else{
        switch_content("Home")
        scroll_by = document.getElementById("Content_Container").scrollTop
        history.pushState({"title":"Home", 
        "scroll": 0},
        '');
    }
    document.body.addEventListener("click", close_nav);
    if(jump_after_int != 0){
        jump_int(jump_after_int)
        jump_after_int = 0
    }
}

window.onpopstate = function() {
    if(!content){
        switch(location.hash) {
            case "#Home":
            case "#Projects":
            case "#AboutMe":
            case "#Education":
                if(history.state != null){
                    jump_after_int = history.state["scroll"];                    
                }
                break
            default:            
        }
        
    }
    content = false
}
