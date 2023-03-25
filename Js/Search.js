var numButton = 0;

function inputSearch() {


    var searchInput = document.getElementById("input-search");
    var searchInputValue = searchInput.value;

    $.ajax({
        url: "http://118.195.129.130:3000/users/getInfoByKw_users",
        type: "POST",
        data: {kw: searchInputValue}, 
        dataType: "json",
        success: function (result) {

            length = result.data.length;
            
            
            while(numButton < length) {
                var contentWord = document.getElementsByClassName("content" + numButton);
                console.log(numButton);
                date(contentWord,numButton,result);
                console.log("content" + numButton);
                
                var input = document.getElementsByClassName("input");
                input[numButton].name = result.data[numButton]._id;
                numButton++;
            }

            while(numButton >= length && numButton < 4) {
                var contentWord = document.getElementsByClassName("content" + numButton);
                contentWord[0].innerHTML = ""
                contentWord[1].innerHTML = ""
                contentWord[2].innerHTML = ""
                contentWord[3].innerHTML = ""
                numButton++;
                console.log(numButton);
            }
        

            

        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });
}


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