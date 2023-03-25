
var pageNum = 1;
var pointerNum = 0;

function pageShow() {
    $.ajax({
        url: "http://118.195.129.130:3000/order/getInfoByPage_order",
        type: "POST",
        data: {page: pageNum, per_page: 4}, 
        dataType: "json",
        success: function (result) {

            length = result.data.length;
            console.log(result);
            
            while(pointerNum < length) {
                var contentWord = document.getElementsByClassName("status" + pointerNum);
                writeInformation(contentWord,pointerNum,result);

                var input = document.getElementsByClassName("order-checkbox");
                input[pointerNum].name = result.data[pointerNum]._id;
                input[pointerNum].value = result.data[pointerNum].us;
                pointerNum++;
            }

            while(pointerNum >= length && pointerNum < 4) {
                var contentWord = document.getElementsByClassName("status" + pointerNum);
                contentWord[0].innerHTML = ""
                contentWord[1].innerHTML = ""
                contentWord[2].innerHTML = ""
                contentWord[3].innerHTML = ""
                contentWord[4].innerHTML = ""
                pointerNum++;


            }

            

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });
        
}



function writeInformation(a,b,func) {
    var arrResult = func.data;
    a[0].innerHTML = arrResult[b].us;
    var phone = arrResult[b].phone;
    if (phone == "") {
        a[1].innerHTML = "未知";
    }

    a[2].innerHTML = phone;

    a[1].innerHTML = arrResult[b].amount + "$";

    var payStatus = arrResult[b].pay;

    if(payStatus == 0) {
        a[3].innerHTML = "未支付";
    } else if(payStatus == 1) {
        a[3].innerHTML = "已支付";
    } else {
        a[3].innerHTML = "未知";
    }
}

pageShow();


function changePage(num) {

    pointerNum = 0;
    pageNum += num;
    if(pageNum <= 0) {
        pageNum = orderTotalNum;
    } else if(pageNum > orderTotalNum) {
        pageNum = 1;
    }
    pageShow();

    //更改显示页数的数字
    var pageNumber = document.getElementsByClassName("order-button");

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

function jumpPage(u) {
    var pageNumber = document.getElementsByClassName("order-button");
    pointerNum = 0;

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

    pageShow();

    
}

$.ajax({
    url: "http://118.195.129.130:3000/order/allpage_order",
    type: "GET",
    data: {}, 
    dataType: "json",
    success: function (result) {

        console.log(result);
        orderTotal = result.pages / 4;
        orderTotalNum = Math.ceil(orderTotal);
        console.log(orderTotalNum);
        

    },
    error: function () {
        console.log('Send Request Fail..');
    }
});



var orderUserName;
var orderMoney;
var orderUserPhone;
var userPay;
var orderId;
var orderFlagNum = 0;

//确认修改信息
function orderConfirm() {
    var a = document.getElementsByClassName("order-checkbox");
    var b = document.getElementsByClassName("order-change-input");

    orderUserName = b[0].value;
    orderMoney = b[1].value;
    orderUserPhone = b[2].value;
    userPay = b[3].options[b[3].selectedIndex].value;
    console.log(b[0].value);
    
    if(userPay == "已支付") {
        userPay = 0;
    } else if (userPay == "未支付") {
        userPay = 1;
    }
    
    for (let i = 0; i < a.length; i++) {
        var flag = a[i].checked;
        if (flag == true) {
            orderId = a[i].name;
            break;
        }
        
    }


    $.ajax({
        url: "http://118.195.129.130:3000/order/update_order",
        type: "POST",
        data: {
            us: orderUserName,
            amount: orderMoney,
            phone: orderUserPhone,
            pay: userPay,
            _id: orderId
        }, 
        dataType: "json",
        success: function (result) {

            console.log(result);

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });


    var c = document.getElementById("order-change-information");

    c.style.opacity = "0";
    c.style.zIndex = "-1";
    orderFlagNum = 0;

    setTimeout(function(){
        location.reload();
    },100);

    sidebar.style.filter = "blur(0px)";
    container.style.filter = "blur(0px)";
}


//显示修改及界面
function orderChange() {
    var a = document.getElementsByClassName("order-checkbox");
    var c = document.getElementById("order-change-information");
    var sidebar = document.getElementById("sidebar");
    var container = document.getElementById("container");
    var b = document.getElementsByClassName("order-change-input");


    for (let i = 0; i < a.length; i++) {
        var flag = a[i].checked;
        console.log(orderFlagNum);
        if (flag == true) {
            orderFlagNum++;
        }
        
    }
    let confirmButton = document.getElementById("order-confirm-button"); // 增加界面按钮

    confirmButton.setAttribute("onclick","orderConfirm()");

    if(orderFlagNum == 1) {
        c.style.opacity = "1";
        c.style.zIndex = "9";
        sidebar.style.filter = "blur(12px)";
        container.style.filter = "blur(12px)";
    } else if(orderFlagNum < 1){
        alert("请至少选择一个");
    } else {
        alert("请不要多选")
        orderFlagNum = 0;
    }

    console.log(orderFlagNum);
}

//关闭修改界面
function orderCloseMenu() {
    var c = document.getElementById("order-change-information");
    c.style.opacity = "0";
    c.style.zIndex = "-1";
    orderFlagNum = 0;

    sidebar.style.filter = "blur(0px)";
    container.style.filter = "blur(0px)";
}



function remove1() {

    var a = document.getElementsByClassName("order-checkbox");
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
            url: "http://118.195.129.130:3000/order/del_order",
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
        location.reload();
    },100);



}



//增加订单
function addOrder() {
    let orderInformation = document.getElementById("order-change-information"); // 增加界面
    let inputAdd = document.getElementsByClassName("order-change-input"); // 增加界面输入框
    let confirmButton = document.getElementById("order-confirm-button"); // 增加界面按钮

    confirmButton.setAttribute("onclick","addOrderConfirm()")

    orderInformation.style.opacity = "1";
    orderInformation.style.zIndex = "9";
    sidebar.style.filter = "blur(12px)";
    container.style.filter = "blur(12px)";

}

function addOrderConfirm() {
    
    var b = document.getElementsByClassName("order-change-input");

    orderUserName = b[0].value;
    orderMoney = b[1].value;
    orderUserPhone = b[2].value;
    userPay = b[3].options[b[3].selectedIndex].value;
    
    if(userPay == "已支付") {
        userPay = 0;
    } else if (userPay == "未支付") {
        userPay = 1;
    }
    


    $.ajax({
        url: "http://118.195.129.130:3000/order/add_order",
        type: "POST",
        data: {
            us: orderUserName,
            amount: orderMoney,
            phone: orderUserPhone,
            pay: userPay,
        }, 
        dataType: "json",
        success: function (result) {

            console.log(result);

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });

    orderCloseMenu();
    setTimeout(function() {
        location.reload();
    },100);
}


//搜索订单

function searchOrder() {

    var searchInput = document.getElementById("order-search-input").value; //输入框的值
    var orderNumButton = 0;

    $.ajax({
        url: "http://118.195.129.130:3000/order/getInfoByKw_order",
        type: "POST",
        data: {kw: searchInput}, 
        dataType: "json",
        success: function (result) {
            
            length = result.data.length;
            
            
            while(orderNumButton < length) {
                var contentWord1 = document.getElementsByClassName("status" + orderNumButton);
                writeInformation(contentWord1,orderNumButton,result);

                var input2 = document.getElementsByClassName("order-checkbox");
                input2[orderNumButton].name = result.data[orderNumButton]._id;
                orderNumButton++;
            }

            while(orderNumButton >= length && orderNumButton < 4) {
                var contentWord = document.getElementsByClassName("status" + orderNumButton);
                contentWord[0].innerHTML = ""
                contentWord[1].innerHTML = ""
                contentWord[2].innerHTML = ""
                contentWord[3].innerHTML = ""
                orderNumButton++;
            }

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });
}






