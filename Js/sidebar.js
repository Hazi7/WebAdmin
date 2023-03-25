var select = document.getElementsByClassName("select");
var food = select[0];
var order = select[1];
var user = select[2];
var foodPages = document.getElementById("foods");
var orderPages = document.getElementById("orders");
var userPages = document.getElementById("content");


function foodShow() {
    foodPages.style.display = "flex";

    userPages.style.display = "none";

    orderPages.style.display = "none"
}

function orderShow() {


    orderPages.style.display = "flex"

    userPages.style.display = "none";

    foodPages.style.display = "none";

}   

function userShow() {

    orderPages.style.display = "none"

    userPages.style.display = "flex";

    foodPages.style.display = "none";
    
}