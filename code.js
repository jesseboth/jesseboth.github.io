window.onload = run
window.onhashchange = go_hash

/*start up function*/
function run(){ 
 go_hash()
 setInterval(get_scroll, 200)
}


nav_open = false;       //side nav
nav_button = false;     //side nav button
content = false         //content visible
scroll_to = null        //scroll position
jump_after = null       //scroll to after...
jump_after_int = null   //scroll to integer pos
previous_hash = null    //previous content page
current_hash = ""       //current content page
top_hidden = true       //top button hidden
top_visible = false     //top button visible
project_go_to = null    //jump to from url


/*open side nav*/
function open_nav(){
    hide_resume()
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

/*close side nav*/
function close_nav(){
    if(nav_open && !nav_button){
        document.getElementById("drawer").classList.remove("open");
        document.getElementById("drawer").classList.add("closed");
        document.getElementById("sidenav").style.width = "0";
        nav_open = !nav_open
    }
    nav_button = false
}

/*change what content page is visible*/
function switch_content(content_display){
    content = true

    location.hash = content_display
    previous_hash = content_display
    show_content(content_display)
}

/*make the content visible*/
function show_content(content_display){
    data = ["-Blank", "-Home", "-Projects", "-AboutMe", "-Education"]
    current_hash = content_display
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

/*jump to an element*/
function jump(element){  
    jump_after = element
    var get = document.getElementById(element);  
    document.getElementById("Content_Container").scrollTo(0,get.offsetTop);
} 

/*jump to integer position on page*/
function jump_int(integer){
    document.getElementById("Content_Container").scrollTo(0,integer); 
}

/*jump to the top*/
function jump_top(){
    document.getElementById("Content_Container").scroll(0,0);
    history.replaceState({"title":current_hash, 
    "scroll": 0},
    ''); 
}

/*operation to determine what hash is in url*/
function go_hash(){
    var pound=location.hash;
    const split = pound.split("#")

    if(split.length > 2){
        project_go_to = split[2] //save
        location.hash = split[1] //go to
    }
    else if(pound != "" && split[1].length != ""){
        show_content(split[1])
    }
    else{
        switch_content("Home")
    }
    document.body.addEventListener("click", close_nav);

    if(project_go_to != null){
        console.log(project_go_to)
        jump(project_go_to)
        project_go_to = null    //reset
        jump_after_int = 0
    }
    else if(jump_after_int != 0){
        console.log("jump", jump_after_int)
        jump_int(jump_after_int)
        jump_after_int = 0
    }

    if(history.state != null){
        console.log("here")
        jump_int(history.state["scroll"])
    }
}


/*get scroll position*/
function get_scroll(){
    scroll_by = document.getElementById("Content_Container").scrollTop
    if(top_hidden && scroll_by > 50){
        document.getElementById("TOP").style.visibility = "visible"
        top_hidden = false
        top_visible = true
    }
    else if(top_visible && scroll_by <= 50){
        document.getElementById("TOP").style.visibility = "hidden"
        top_hidden = true
        top_visible = false
    }
    history.replaceState({"title":current_hash, 
    "scroll": scroll_by},
    '');
}


function hide_resume(){
    document.getElementById("resume_container_edge").style.visibility = "hidden"
}

function show_resume(){
    document.getElementById("resume_container_edge").style.visibility= "visible"
}

/*history manipulation*/
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
