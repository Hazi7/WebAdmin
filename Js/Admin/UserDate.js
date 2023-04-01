let userData = () => {
    let user = document.getElementsByClassName("user-date");
    let userSex;
    if (sessionStorage.getItem("userSex") == 0) {
        userSex = "男";
    } else if (sessionStorage.getItem("userSex") == 1) {
        userSex = "女";
    }
    var userData = ["账户 : " + sessionStorage.getItem("userName"),"密码 : " + sessionStorage.getItem("userPassword"),"电话 : " + sessionStorage.getItem("userPhone"),"年龄 : " + sessionStorage.getItem("userAge") + " 岁","性别 : " + userSex];

    for (let i = 0; i < 5; i++) {
        user[i].getElementsByTagName("p")[0].innerHTML = userData[i];
    }
}
userData()

let editShow = (num) => {
    let editPage = document.getElementsByClassName("edit-information");
    editPage[num].style.width = "100%";
    editPage[num].style.height = "100%";
    editPage[num].style.borderRadius = "0";
    editPage[num].innerHTML = "";
    let input =  document.createElement("input");
    input.type = "text";
    editPage[num].appendChild(input);
    
    editPage[num].addEventListener("mouseleave",function() {
        editPage[num].style.width = "70px";
        editPage[num].style.height = "70px";
        editPage[num].style.borderRadius = "50%";
        editPage[num].innerHTML = "修改";
    });
}

let exit = () => {
    let alert = document.getElementsByClassName("alert");
    alert[0].style.zIndex = "9";
    alert[0].style.opacity = "1";
    let alertContainer = document.getElementById("remove-alert");
    alertContainer.getElementsByTagName("p")[0].innerText = "确定要退出吗?";
    let buttons = document.getElementsByClassName("remove-alert-button");
    buttons[0].setAttribute("onclick", "exitConfirm()")
}

let exitConfirm = () =>  {

    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/user/out",
        data: {},
        dataType: "json",
        success: function (response) {
            if (response.err == 0) {

                let alertContainer = document.getElementById("remove-alert");
                alertContainer.classList.add("success");
                alertContainer.getElementsByTagName("p")[0].innerText = "已退出";
                sessionStorage.clear()

                setTimeout(function() {
                    sessionStorage.setItem("status",0);
                    window.location.href = "LoginIn.html";
                },500);



            }
           
        }
    });
}

    document.getElementById("cents-container").getElementsByTagName("p")[0].innerHTML = sessionStorage.getItem("integral");
    let timeContainer = document.getElementById("time-container").getElementsByTagName("p")[0];

    let date1 = new Date();
    setInterval(function() {
        let newDate = new Date();
        let newTime = newDate - date1;

        

        timeContainer.innerHTML = parseInt(newTime) / 1000 + "s";
    },1000);


    let userNameShow = document.getElementById("user-name");
    userNameShow.innerHTML = sessionStorage.getItem("userName");


    let changePicture = (url) => {
        let input = document.getElementById("up");
        localStorage.setItem("url",input.value);
        document.getElementById("mimimi").src = url;
        document.getElementById("mimi").src = url;
    }


