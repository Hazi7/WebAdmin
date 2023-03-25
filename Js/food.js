
var pageNum = 1;
var foodPointerNum = 0;

function foodPageShow() {
    $.ajax({
        url: "http://118.195.129.130:3000/food/getInfoByPage",
        type: "POST",
        data: {page: pageNum, per_page: 6}, 
        dataType: "json",
        success: function (result) {

            length = result.data.length;
            console.log(result);
            
            while(foodPointerNum < length) {
                var contentWord1 = document.getElementsByClassName("foods-status" + foodPointerNum);
                foodWriteInformation(contentWord1,foodPointerNum,result);

                var input = document.getElementsByClassName("foods-order-checkbox");
                input[foodPointerNum].name = result.data[foodPointerNum]._id;

                foodPointerNum++;
            }

            

            while(foodPointerNum >= length && foodPointerNum < 6) {
                var contentWord1 = document.getElementsByClassName("foods-status" + foodPointerNum);
                contentWord1[0].innerHTML = ""
                contentWord1[1].innerHTML = ""
                contentWord1[2].innerHTML = ""
                contentWord1[3].innerHTML = ""
                contentWord1[4].innerHTML = ""
                foodPointerNum++;


            }

            

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });
        
}



function foodWriteInformation(a,b,func) {
    var arrResult = func.data;
    a[0].innerHTML = arrResult[b].name;
    a[1].innerHTML = arrResult[b].price + " $";
    a[2].innerHTML = arrResult[b].desc;
    a[3].innerHTML= arrResult[b].typename;
    a[4].innerHTML= arrResult[b].typeid;
    

}

foodPageShow();



function foodChangePage(num) {

    foodPointerNum = 0;
    pageNum += num;
    if(pageNum <= 0) {
        pageNum = foodTotalNum;
    } else if(pageNum > foodTotalNum) {
        pageNum = 1;
    }
    foodPageShow();

    //更改显示页数的数字
    var pageNumber = document.getElementsByClassName("foods-order-button");

    if(pageNum - 1 < 1) {
        pageNumber[1].innerHTML = pageNum;
        pageNumber[2].innerHTML = pageNum + 1;
        pageNumber[3].innerHTML = pageNum + 2;
        pageNumber[1].style.borderWidth = "2px";
        pageNumber[2].style.borderWidth = "0px";
        pageNumber[3].style.borderWidth = "0px";
        pageNumber[1].style.display = "flex";
    } else if(pageNum + 1 > orderTotalNum) {
        if(pageNum - 2 < 1) {
            pageNumber[1].style.display = "none";
        }
        pageNumber[1].innerHTML = pageNum - 2;
        pageNumber[2].innerHTML = pageNum - 1;
        pageNumber[3].innerHTML = pageNum;
        pageNumber[2].style.borderWidth = "0px";
        pageNumber[1].style.borderWidth = "0px";
        pageNumber[3].style.borderWidth = "2px";
    } else {
        pageNumber[1].innerHTML = pageNum - 1;
        pageNumber[2].innerHTML = pageNum;
        pageNumber[3].innerHTML = pageNum + 1;
        pageNumber[2].style.borderWidth = "2px";
        pageNumber[1].style.borderWidth = "0px";
        pageNumber[3].style.borderWidth = "0px";
        pageNumber[1].style.display = "flex";
    }


}



function foodJumpPage(u) {
    var pageNumber = document.getElementsByClassName("foods-order-button");
    foodPointerNum = 0;

    pageNum = pageNumber[u].innerHTML;


    if(pageNum - 1 < 1) {
        pageNumber[1].innerHTML = pageNum;
        pageNumber[2].innerHTML = pageNum + 1;
        pageNumber[3].innerHTML = pageNum + 2;
        pageNumber[1].style.borderWidth = "2px";
        pageNumber[2].style.borderWidth = "0px";
        pageNumber[3].style.borderWidth = "0px";
        pageNumber[1].style.display = "flex";
    } else if(pageNum + 1 > orderTotalNum) {
        if(pageNum - 2 < 1) {
            pageNumber[1].style.display = "none";
        }
        pageNumber[1].innerHTML = pageNum - 2;
        pageNumber[2].innerHTML = pageNum - 1;
        pageNumber[3].innerHTML = pageNum;
        pageNumber[2].style.borderWidth = "0px";
        pageNumber[1].style.borderWidth = "0px";
        pageNumber[3].style.borderWidth = "2px";
    } else {
        pageNumber[1].innerHTML = pageNum - 1;
        pageNumber[2].innerHTML = pageNum;
        pageNumber[3].innerHTML = pageNum + 1;
        pageNumber[2].style.borderWidth = "2px";
        pageNumber[1].style.borderWidth = "0px";
        pageNumber[3].style.borderWidth = "0px";
        pageNumber[1].style.display = "flex";
    }

    foodPageShow();

    
}

$.ajax({
    url: "http://118.195.129.130:3000/food/allpage",
    type: "GET",
    data: {}, 
    dataType: "json",
    success: function (result) {

        console.log(result);
        foodTotalNum = Math.ceil(result.pages / 6);
        

    },
    error: function () {
        console.log('Send Request Fail..');
    }
});






//删除菜品

function foodRemove() {

    var a = document.getElementsByClassName("foods-order-checkbox");
    var array = new Array();

    for (let i = 0; i < a.length; i++) {
        var flag = a[i].checked;
        if (flag == true) {
            orderFlagNum++;
            array.push(a[i].name)
        }
    }

    for (let i = 0; i < array.length; i++) {
        
        $.ajax({
            url: "http://118.195.129.130:3000/food/del",
            type: "POST",
            data: {_id: array[i]}, 
            dataType: "json",
            success: function (result) {
                
    
            },
            error: function () {
                console.log('Send Request Fail..');
            }
        });

    }

    setTimeout(function() {
        Location.reload();
    },100);



}



function foodAddOrder() {
    let orderInformation = document.getElementById("food-change-information"); // 增加界面
    let inputAdd = document.getElementsByClassName("food-change-input"); // 增加界面输入框
    let confirmButton = document.getElementById("food-confirm-button"); // 增加界面按钮

    confirmButton.setAttribute("onclick","foodsAddOrderConfirm()")

    orderInformation.style.opacity = "1";
    orderInformation.style.zIndex = "9";
    sidebar.style.filter = "blur(12px)";
    container.style.filter = "blur(12px)";

}

function foodsAddOrderConfirm() {
    
    var foodConfirm = document.getElementsByClassName("food-change-input");

    foodName = foodConfirm[0].value;
    foodMoney = foodConfirm[1].value;
    foodDesc = foodConfirm[2].value;
    foodType = foodConfirm[3].value;
    foodId = foodConfirm[4].options[foodConfirm[4].selectedIndex].value;
    console.log(foodId);
    
    


    $.ajax({
        url: "http://118.195.129.130:3000/food/add",
        type: "POST",
        data: {
            name: foodName,
            price: foodMoney,
            desc: foodDesc,
            typename: foodType,
            typeid: foodId,
        }, 
        dataType: "json",
        success: function (result) {

            console.log(result);

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });
    

    location.reload();
    setTimeout(function() {
        
        foodShow();
    },100);
}


function foodCloseMenu() {
    var c = document.getElementById("food-change-information");
    c.style.opacity = "0";
    c.style.zIndex = "-1";
    orderFlagNum = 0;

    sidebar.style.filter = "blur(0px)";
    container.style.filter = "blur(0px)";
}




//搜索订单

//搜索订单

function foodsSearchOrder() {

    var searchInput = document.getElementById("foods-order-search-input").value; //输入框的值
    var orderNumButton = 0;

    $.ajax({
        url: "http://118.195.129.130:3000/food/getInfoByKw",
        type: "POST",
        data: {kw: searchInput}, 
        dataType: "json",
        success: function (result) {
            
            length = result.data.length;
            
            
            while(orderNumButton < length) {
                var contentWord1 = document.getElementsByClassName("foods-status" + orderNumButton);
                foodWriteInformation(contentWord1,orderNumButton,result);

                var input2 = document.getElementsByClassName("foods-order-checkbox");
                input2[orderNumButton].name = result.data[orderNumButton]._id;
                orderNumButton++;
            }

            while(orderNumButton >= length && orderNumButton < 6) {
                var contentWord = document.getElementsByClassName("foods-status" + orderNumButton);
                contentWord[0].innerHTML = ""
                contentWord[1].innerHTML = ""
                contentWord[2].innerHTML = ""
                contentWord[3].innerHTML = ""
                contentWord[4].innerHTML = ""

                orderNumButton++;
            }

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });
}