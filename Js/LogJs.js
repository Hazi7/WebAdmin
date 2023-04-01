let input = document.getElementsByClassName("input");

    function login() {
        var userName = input[0].value;
        var password = input[1].value;
        var logoWord = document.querySelector("#login");
        var loginButton = document.querySelector("#button");

        loginButton.style.backgroundColor = "#80a78b";

        setTimeout(function() {
            $.ajax({
                url: "http://118.195.129.130:3000/user/login",
                type: "POST",
                data: {us: userName, ps: password}, 
                dataType: "json",
                success: function (result) {
                    console.log(result);
                    if(result.err == 0) {
                        window.location.href = "Admin.html";
                        
                        sessionStorage.setItem("integral",result.data[0].integral);
                        sessionStorage.setItem("status",1);
                        sessionStorage.setItem("userName",result.data[0].us);
                        sessionStorage.setItem("userPassword","******");
                        sessionStorage.setItem("userPhone",result.data[0].phone);
                        sessionStorage.setItem("userAge",result.data[0].age);
                        sessionStorage.setItem("userSex",result.data[0].sex);
                        localStorage.setItem("styleFlag",0);

                        
                    } else if(result.err == -1 && result.msg == "用户名或密码不正确") {
                        logoWord.innerHTML = "WRONG";
                        logoWord.style.webkitTextStrokeColor = "#6f66b0";
                        logoWord.style.top = "60px"
                    } else if(result.err == -1 && result.msg == "参数错误") {
                        logoWord.innerHTML = "WRONG";
                        logoWord.style.top = "60px"
                        logoWord.style.webkitTextStrokeColor = "#d3807a";
                    }
                    
    
                },
                error: function () {
                    console.log('Send Request Fail..');
                }
            });
        },300)

        var register = document.getElementsByClassName("register")[0];
        var login = document.getElementsByClassName("login")[0];


    }


    function register() {
        var register = document.getElementsByClassName("register")[0];
        var login = document.getElementsByClassName("login")[0];

        register.style.transform = "translateX(-100%)";
        login.style.transform = "translateX(-100%)";

    }
    

    function back() {
        var register = document.getElementsByClassName("register")[0];
        var login = document.getElementsByClassName("login")[0];

        register.style.transform = "translateX(0%)";
        login.style.transform = "translateX(0%)";
    }

    let time = 60;
    let count = 0;
    let post = document.getElementsByClassName("post")[0];
    let setTime = () => {
        let interval = setInterval(function() {
            post.innerHTML = time;
            time = time - 1;
            count++;

            if (count >= 60) {
                clearInterval(interval);
                post.style.pointerEvents = "initial";
                post.style.backgroundColor = "white";
                count = 0;
            }
        },1000);
        post.style.backgroundColor = "gray";
        post.style.opacity = "0.5";
        post.style.pointerEvents = "none";
        post.innerHTML = "发送验证码";


    };



