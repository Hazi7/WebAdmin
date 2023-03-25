
var page = 1;
var i = 0;


function search() {

    $.ajax({
        url: "http://118.195.129.130:3000/users/getInfoByPage_users",
        type: "POST",
        data: {page: page, per_page: 4}, 
        dataType: "json",
        success: function (result) {

            length = result.data.length
            
            while(i < length) {
                var contentWord = document.getElementsByClassName("content" + i);
                date(contentWord,i,result);
                
                var input = document.getElementsByClassName("input");
                input[i].name = result.data[i]._id;
                i++;
            }

            while(i >= length && i < 4) {
                var contentWord = document.getElementsByClassName("content" + i);
                contentWord[0].innerHTML = ""
                contentWord[1].innerHTML = ""
                contentWord[2].innerHTML = ""
                contentWord[3].innerHTML = ""
                i++;
            }
            

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });
}

search();



function date(a,b,func) {
    var arrResult = func.data;
    a[0].innerHTML = arrResult[b].us;
    var phone = arrResult[b].phone;
    if (phone == "") {
        a[1].innerHTML = "未知";
    }

    a[1].innerHTML = phone;

    a[2].innerHTML = arrResult[b].age;
    var sex = arrResult[b].sex;
    if (sex == 0) {
        a[3].innerHTML = "男";
    } else if(sex == 1){
        a[3].innerHTML = "女";
    } else {
        a[3].innerHTML = "未知";
    }
}

function button(num) {
    i = 0;
    page += num;
    if(page <= 0) {
        page = totalNum;
    } else if(page > totalNum) {
        page = 1;
    }
    console.log(page);
    search();
    document.getElementById("input-search").value = "";
    
}




$.ajax({
    url: "http://118.195.129.130:3000/users/allpage_users",
    type: "GET",
    data: {}, 
    dataType: "json",
    success: function (result) {

        console.log(result);
        total = result.pages / 4;
        totalNum = Math.ceil(total);
        

    },
    error: function () {
        console.log('Send Request Fail..');
    }
});



//用户菜单

function menuShow() {
    
    var menu = document.getElementById("menu");
    menu.style.opacity = "1";

    var time = menu.addEventListener("mouseleave",function() {
        var timeout = setTimeout(function(){
            menu.style.opacity = "0";
            clearInterval(time);
            clearTimeout(timeout);
        },300);
    });
    clearInterval(time);
}




