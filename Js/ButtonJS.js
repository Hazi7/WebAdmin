var userName;
var phoneNum;
var userAge;
var userSex;
var id;
var flagNum = 0;

//确认修改信息
function confirm() {
    var a = document.getElementsByClassName("input");
    var b = document.getElementsByClassName("input1");
    userName = b[0].value;
    phoneNum = b[1].value;
    userAge = b[2].value;
    userSex = b[3].value;
    
    for (let i = 0; i < a.length; i++) {
        var flag = a[i].checked;
        if (flag == true) {
            id = a[i].name;
            break;
        }
        
    }



    $.ajax({
        url: "http://118.195.129.130:3000/user/mod",
        type: "POST",
        data: {
            us: userName,
            _id: id,
            phone: phoneNum,
            age: userAge,
            sex: userSex
        }, 
        dataType: "json",
        success: function (result) {

            console.log(result);
            console.log(userName);

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });

    var c = document.getElementById("change-information");

    c.style.opacity = "0";
    c.style.zIndex = "-1";
    flagNum = 0;

    setTimeout(function(){
        location.reload();
    },100);
}


//显示修改及界面
function change() {
    var a = document.getElementsByClassName("input");
    var c = document.getElementById("change-information");




    for (let i = 0; i < a.length; i++) {
        var flag = a[i].checked;
        if (flag == true) {
            flagNum++;
        }
        
    }

    if(flagNum == 1) {
        c.style.opacity = "1";
        c.style.zIndex = "9";
    } else if(flagNum < 1){
        alert("请至少选择一个");
    } else {
        alert("请不要多选")
        flagNum = 0;
    }

    console.log(flagNum);
}

//关闭修改界面
function closeMenu() {
    var c = document.getElementById("change-information");
    c.style.opacity = "0";
    c.style.zIndex = "-1";
    flagNum = 0;
}



function remove() {

    var a = document.getElementsByClassName("input");

    for (let i = 0; i < a.length; i++) {
        var flag = a[i].checked;
        if (flag == true) {
            flagNum++;
        }
        
    }

}

