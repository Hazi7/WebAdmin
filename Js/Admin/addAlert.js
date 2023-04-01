let addAlert = () => {

    let addPage = document.getElementsByClassName("alert")[1];
    addPage.style.opacity = "1";
    addPage.style.zIndex = "9";
    let addAlert = document.getElementById("add-alert");
    addAlert.style.display = "flex";
    let addButton = document.getElementsByClassName("add-button")[0];
    addButton.setAttribute("onclick", "addFood()");

    let input = document.getElementsByClassName("add-input");
    for (let i = 0; i < input.length - 1; i++) {
        input[i].value = "";
    }


}

let addClose = () => {
    let addPage = document.getElementsByClassName("alert")[1];
    let tipPage = document.getElementById("add-operation-success");
    addPage.style.opacity = "0";
    addPage.style.zIndex = "-1";
    tipPage.style.display = "none";
}

let addFood = () => {
    let input = document.getElementsByClassName("add-input");
    let foodId = input[3].options[input[3].selectedIndex].value;

    let foodTypeName;
    if (foodId == 0) {
        foodTypeName = "面";
    } else if (foodId == 1) {
        foodTypeName = "米";
    } else if (foodId == 2) {
        foodTypeName = "饮料";
    } else if (foodId ==3) {
        foodTypeName = "水果";
    }

    let foodPrice;
    let reg = /(^[1-9]\d*$)/;
    foodPrice = input[1].value;
    if (reg.test(foodPrice) == true) {
        foodPrice = input[1].value;
    }


    
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/add",
        data: {
            name: input[0].value,
            price: foodPrice,
            desc: input[2].value,
            typename: foodTypeName,
            typeid: input[3].value,
        },
        dataType: "json",
        async: false,
        success: function (response) {
            console.log(response);
            if (response.err == 0 && response.msg == "添加成功") {
                let addSuccessPage = document.getElementById("add-operation-success");
                let svg = addSuccessPage.getElementsByTagName("svg");
                let addAlertPage = document.getElementById("add-alert");
                addSuccessPage.style.opacity = "1";
                addSuccessPage.style.zIndex = "9";
                addSuccessPage.style.display = "flex";
                addAlertPage.opacity = "0";
                addAlertPage.zIndex = "-1";
                addSuccessPage.getElementsByTagName("p")[0].innerText = "添加成功";
                addAlertPage.style.display = "none";
                svg[0].style.display = "none";
                svg[1].style.display = "block";
                let dataContainer = document.getElementById("order-list-container");
                let list = document.querySelectorAll(".order-list");
                for (let i = 0; i < list.length; i++) {
                    dataContainer.removeChild(list[i]);
                }
                getFood(pageIndex,5);
            } else if (response.err == -1) {
                let addSuccessPage = document.getElementById("add-operation-success");
                let addAlertPage = document.getElementById("add-alert");
                let svg = addSuccessPage.getElementsByTagName("svg");
                addSuccessPage.style.opacity = "1";
                addSuccessPage.style.zIndex = "9";
                addSuccessPage.style.display = "flex";
                addSuccessPage.getElementsByTagName("p")[0].innerText = "添加失败";
                addAlertPage.opacity = "0";
                addAlertPage.zIndex = "-1";
                addAlertPage.style.display = "none";
                svg[1].style.display = "none";
                svg[0].style.display = "block";
            }
        }
    });
    
}

let closeAddResult = () => {
    let page = document.getElementById()
}



let edidAlert = (num) => {

    let addPage = document.getElementsByClassName("alert")[1];
    addPage.style.opacity = "1";
    addPage.style.zIndex = "9";
    let addAlert = document.getElementById("add-alert");
    addAlert.style.display = "flex";
    let input = document.getElementsByClassName("add-input");
    let list = document.getElementsByClassName('order-list')[num].getElementsByTagName("span");

    for (let i = 0; i < list.length; i++) {
        
            if (i == list.length - 2) {
                if (list[i].innerText == "面") {
                    input[i].value = 0;
                } else if(list[i].innerText == "米") {
                    input[i].value = 1;
                } else if (list[i].innerText == "饮品") {
                    input[i].value = 2;
                } else if (list[i].innerText == "水果") {
                    input[i].value = 3;
                }
            } else if (i == list.length - 1) {
                continue;
            } 
            else {
                input[i].value = list[i].innerText;
            }
    }

    let editButton = document.getElementsByClassName("add-button")[0];
    editButton.setAttribute("onclick", "editButtonConfrim()")

    let orderList = document.getElementsByClassName("order-list");
    editId = orderList[num].getElementsByClassName("order-list-operation")[1].id;
}

let editButtonConfrim = () => {


    let input = document.getElementsByClassName("add-input");
    let reg = /(^[1-9]\d*$)/;
    let price = input[1].value;
    if (reg.test(price) == true) {
        price = input[1].value;
    }

    let foodId = input[3].options[input[3].selectedIndex].value;
    let foodTypeName;
    if (foodId == 0) {
        foodTypeName = "面";
    } else if (foodId == 1) {
        foodTypeName = "米";
    } else if (foodId == 2) {
        foodTypeName = "饮料";
    } else if (foodId ==3) {
        foodTypeName = "水果";
    }


 
    
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/update",
        data: {
            name: input[0].value,
            price: price,
            async: false,
            desc: input[2].value,
            typename: foodTypeName,
            typeid: foodId,
            _id: editId,

        },
        async: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.err == 0 && response.msg == "修改成功") {
                let addSuccessPage = document.getElementById("add-operation-success");
                let svg = addSuccessPage.getElementsByTagName("svg");
                let addAlertPage = document.getElementById("add-alert");
                addSuccessPage.style.opacity = "1";
                addSuccessPage.style.zIndex = "9";
                addSuccessPage.style.display = "flex";
                addAlertPage.opacity = "0";
                addAlertPage.zIndex = "-1";
                addSuccessPage.getElementsByTagName("p")[0].innerText = "添加成功";
                addAlertPage.style.display = "none";
                svg[0].style.display = "none";
                svg[1].style.display = "block";
                let dataContainer = document.getElementById("order-list-container");
                let list = document.querySelectorAll(".order-list");
                for (let i = 0; i < list.length; i++) {
                    dataContainer.removeChild(list[i]);
                }
                getFood(pageIndex,5);
            } else if (response.err == -1) {
                let addSuccessPage = document.getElementById("add-operation-success");
                let addAlertPage = document.getElementById("add-alert");
                let svg = addSuccessPage.getElementsByTagName("svg");
                addSuccessPage.style.opacity = "1";
                addSuccessPage.style.zIndex = "9";
                addSuccessPage.style.display = "flex";
                addSuccessPage.getElementsByTagName("p")[0].innerText = "修改失败";
                addAlertPage.opacity = "0";
                addAlertPage.zIndex = "-1";
                addAlertPage.style.display = "none";
                svg[1].style.display = "none";
                svg[0].style.display = "block";
            }
        }
    });



}

//显示界面选中界面
let editAlrtCheck = () => {

    let checkBox = document.getElementsByClassName("checkbox");
    let checkedNum = 0;
    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked) {
            checkedNum++;
        }
    }

    if (checkedNum != 1) {
        let alert = document.getElementsByClassName("alert");
        alert[0].style.zIndex = "9";
        alert[0].style.opacity = "1";
        let alertContainer = document.getElementById("remove-alert");
        alertContainer.classList.add("success");
        alertContainer.getElementsByTagName("p")[0].innerText = "请选择一个";
    } else {

            
    let addPage = document.getElementsByClassName("alert")[1];
    addPage.style.opacity = "1";
    addPage.style.zIndex = "9";
    let addAlert = document.getElementById("add-alert");
    addAlert.style.display = "flex";
    let input = document.getElementsByClassName("add-input");
    let index;

    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked == true) {
            index = i;
        }
    }

    let list = document.getElementsByClassName('order-list')[index].getElementsByTagName("span");

    for (let i = 0; i < list.length; i++) {
        
            if (i == list.length - 2) {
                if (list[i].innerText == "面") {
                    input[i].value = 0;
                } else if(list[i].innerText == "米") {
                    input[i].value = 1;
                } else if (list[i].innerText == "饮品") {
                    input[i].value = 2;
                } else if (list[i].innerText == "水果") {
                    input[i].value = 3;
                }
            } else if (i == list.length - 1) {
                continue;
            } 
            else {
                input[i].value = list[i].innerText;
            }
    }

    let editButton = document.getElementsByClassName("add-button")[0];
    editButton.setAttribute("onclick", "editFoodChecked()")

    let orderList = document.getElementsByClassName("order-list");
    mistId = orderList[index].getElementsByClassName("order-list-operation")[1].id;


    }
    



}


let editFoodChecked = () => {


    let input = document.getElementsByClassName("add-input");
    let reg = /(^[1-9]\d*$)/;
    let price = input[1].value;
    if (reg.test(price) == true) {
        price = input[1].value;
    }

    let foodId = input[3].options[input[3].selectedIndex].value;
    let foodTypeName;
    if (foodId == 0) {
        foodTypeName = "面";
    } else if (foodId == 1) {
        foodTypeName = "米";
    } else if (foodId == 2) {
        foodTypeName = "饮料";
    } else if (foodId ==3) {
        foodTypeName = "水果";
    }

 
    
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/update",
        data: {
            name: input[0].value,
            price: price,
            async: false,
            desc: input[2].value,
            typename: foodTypeName,
            typeid: foodId,
            _id: mistId,

        },
        async: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.err == 0 && response.msg == "修改成功") {
                let addSuccessPage = document.getElementById("add-operation-success");
                let svg = addSuccessPage.getElementsByTagName("svg");
                let addAlertPage = document.getElementById("add-alert");
                addSuccessPage.style.opacity = "1";
                addSuccessPage.style.zIndex = "9";
                addSuccessPage.style.display = "flex";
                addAlertPage.opacity = "0";
                addAlertPage.zIndex = "-1";
                addSuccessPage.getElementsByTagName("p")[0].innerText = "修改成功";
                addAlertPage.style.display = "none";
                svg[0].style.display = "none";
                svg[1].style.display = "block";
                let dataContainer = document.getElementById("order-list-container");
                let list = document.querySelectorAll(".order-list");
                for (let i = 0; i < list.length; i++) {
                    dataContainer.removeChild(list[i]);
                }
                getFood(pageIndex,5);
            } else if (response.err == -1) {
                let addSuccessPage = document.getElementById("add-operation-success");
                let addAlertPage = document.getElementById("add-alert");
                let svg = addSuccessPage.getElementsByTagName("svg");
                addSuccessPage.style.opacity = "1";
                addSuccessPage.style.zIndex = "9";
                addSuccessPage.style.display = "flex";
                addSuccessPage.getElementsByTagName("p")[0].innerText = "修改失败";
                addAlertPage.opacity = "0";
                addAlertPage.zIndex = "-1";
                addAlertPage.style.display = "none";
                svg[1].style.display = "none";
                svg[0].style.display = "block";
            }
        }
    });



}