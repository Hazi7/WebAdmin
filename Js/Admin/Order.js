let getFood = (page,perPage) => {
    let currentIndex = 0;
    let footerWord = document.getElementById("footer-word");
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/getInfoByPage",
        data: {page: page, per_page: perPage},
        dataType: "json",
        success: function (response) {
            while(currentIndex < response.data.length) {
                addLine(response.data[currentIndex].name, response.data[currentIndex].price, response.data[currentIndex].desc, response.data[currentIndex].typename, currentIndex,response);
                currentIndex++;
                footerWord.innerText = pageIndex + " / " + totalPage + "页";
            }

        }
    });

}
getFood(1,5);



let addLine = (foodName, foodPrice,foodDesc,foodType,dex,func) => {
    let dataContainer = document.getElementById("order-list-container"); //数据区域
    let li = document.createElement("li");
    let checkout = document.createElement("input");
    checkout.setAttribute("index", dex)
    checkout.type = "checkbox";
    checkout.className = "checkbox"
    li.appendChild(checkout);
    li.className = "order-list";


    //存储span中的数据
    let spanInformation = new Array();
    spanInformation.push(foodName);
    spanInformation.push(foodPrice);
    spanInformation.push(foodDesc);
    spanInformation.push(foodType);

    let spanElement = new Array();//储存span
    spanElement.push(document.createElement("span"));
    spanElement.push(document.createElement("span"));
    spanElement.push(document.createElement("span"));
    spanElement.push(document.createElement("span"));
    spanElement.push(document.createElement("span"));

    //创建操作里面的俩个
    let operationFirst = document.createElement("div");
    let operationSecond = document.createElement("div");
    operationFirst.className = "order-list-operation";
    operationSecond.className = "order-list-operation";
    operationSecond.setAttribute("onclick", "clickButtonToRemove(" + dex + ")")
    operationFirst.setAttribute("onclick", "edidAlert(" + dex + ")")

    spanElement[4].appendChild(operationFirst);
    spanElement[4].appendChild(operationSecond);
    operationFirst.setAttribute("index", dex)

    operationSecond.setAttribute("id", func.data[dex]._id);
    

    //添加span
    for (let i = 0; i < spanElement.length; i++) {
        li.appendChild(spanElement[i]);

        if(i == spanElement.length - 1) continue;
        spanElement[i].innerText = spanInformation[i];
    }

    

    //添加整行
    dataContainer.appendChild(li);
}


//全选

let checkAllFood = () => {
    let checkAllBox = document.getElementById("checkAll");
    let checkBox = document.getElementsByClassName("checkbox");

    foodCheckedFlag = checkAllBox.checked;

    for (let i = 0; i < checkBox.length; i++) {
        checkBox[i].checked = foodCheckedFlag;
        checkBox[i].setAttribute("onclick","JudgeChecked()")
    }
}

let JudgeChecked = () => {
    
}

//计算总页数
$.ajax({
    type: "GET",
    url: "http://118.195.129.130:3000/food/allpage",
    data: "",
    async: false,
    dataType: "json",
    success: function (response) {
         totalPage = Math.ceil(response.pages / 5);
    }
});


var pageIndex = 1;
let changePage = (num) => {
    //移除Element节点
    let dataContainer = document.getElementById("order-list-container");
    let list = document.querySelectorAll(".order-list");
    for (let i = 0; i < list.length; i++) {
        dataContainer.removeChild(list[i]);
    }


    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/food/allpage",
        data: "",
        async: false,
        dataType: "json",
        success: function (response) {
             totalPage = Math.ceil(response.pages / 5);
        }
    });

    //左右更改页数
    pageIndex += num;
    if (pageIndex < 1) {
        pageIndex = 1;
    } else if (pageIndex > totalPage) {
        pageIndex = totalPage;
    }



    getFood(pageIndex,5);
}


let mouseLeaveSarch = () => {
    let dataContainer = document.getElementById("order-list-container");
    let list = document.querySelectorAll(".order-list");
    for (let i = 0; i < list.length; i++) {
        dataContainer.removeChild(list[i]);
    }


    let buttons = document.getElementsByClassName("change-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "white";
        buttons[i].style.cursor = "pointer";
        buttons[i].style.pointerEvents = "initial";
    }

    getFood(1,5);
}




