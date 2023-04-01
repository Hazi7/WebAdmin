let svgChangeF = () => {
    let svg = document.getElementsByClassName("sidebar-items");

    for (let i = 0; i < svg.length; i++) {
        svg[i].getElementsByTagName("svg")[1].style.display = "none";
        svg[i].getElementsByTagName("svg")[0].style.display = "block";
    }

    localStorage.setItem("styleFlag",0);
}

let svgChangeS = () => {
    let svg = document.getElementsByClassName("sidebar-items");

    for (let i = 0; i < svg.length; i++) {
        svg[i].getElementsByTagName("svg")[0].style.display = "none";
        svg[i].getElementsByTagName("svg")[1].style.display = "block";

        if (i == 0) {
            svg[i].getElementsByTagName("svg")[1].style.left = "20px";
        }

        if (i == 3) {
            svg[i].getElementsByTagName("svg")[1].style.left = "15px";
        }
    }

    localStorage.setItem("styleFlag",1);
}

if (localStorage.getItem("styleFlag") == 0) {
    svgChangeF();
} else if (localStorage.getItem("styleFlag") == 1) {
    svgChangeS();
}

let lowTheme = () => {
    localStorage.setItem("theme" , 0);
    document.getElementById("sidebar").style.backgroundColor = "white";
    document.getElementById("user-detailed-information").style.backgroundColor = "white"
    document.getElementById("user-picture-box").style.backgroundColor = "white"
    document.getElementById("user-container-down").style.backgroundColor = "white"
    document.getElementById("order-content").style.backgroundColor = "white"
}

let highTheme = () => {
    localStorage.setItem("theme" , 1);
    document.getElementById("sidebar").style.backgroundColor = "rgb(149, 149, 149)";
    document.getElementById("user-detailed-information").style.backgroundColor = "rgb(149, 149, 149)"
    document.getElementById("user-picture-box").style.backgroundColor = "rgb(149, 149, 149)"
    document.getElementById("user-container-down").style.backgroundColor = "rgb(149, 149, 149)"
}

if (localStorage.getItem("theme") == 0) {
    lowTheme();
} else{
    highTheme();
}


setTimeout(function(){
    if (sessionStorage.getItem("status") != 1) {
        window.location.href = "LoginIn.html";
    }
},500);