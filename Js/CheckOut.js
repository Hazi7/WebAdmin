var allCheckedBox = document.getElementById("allCheckedBox");
var checkBoxOrder = document.getElementsByClassName("order-checkbox");
var checkedFlag = false;


function isChecked() {


     if(checkedFlag == true) {
        for (let i = 0; i < checkBoxOrder.length; i++) {
            checkBoxOrder[i].checked = false;  
        }
        checkedFlag = false;
     } else if(checkedFlag == false) {
        checkedFlag = true;
        for (let i = 0; i < checkBoxOrder.length; i++) {
            checkBoxOrder[i].checked = true;  
        }
     }
}
var foodallCheckedBox = document.getElementById("foods-allCheckedBox");
var foodcheckBoxOrder = document.getElementsByClassName("foods-order-checkbox");
var foodCheckedFlag = false;

function foodIsChecked() {


    if(foodCheckedFlag == true) {
       for (let i = 0; i < foodcheckBoxOrder.length; i++) {
        foodcheckBoxOrder[i].checked = false;  
       }
       foodCheckedFlag = false;
    } else if(foodCheckedFlag == false) {
        foodCheckedFlag = true;
       for (let i = 0; i < foodcheckBoxOrder.length; i++) {
        foodcheckBoxOrder[i].checked = true;  
       }
    }
}

