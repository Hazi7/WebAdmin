let a = document.getElementById("user-name");

var loc = location.href;
var n1 = loc.length;
var n2 = loc.indexOf("=");
var txt = decodeURI(loc.substr(n2 + 1, n1 -n2));

a.innerHTML = txt;


function exit() {
    var exit = document.getElementById("exit");


    $.ajax({
        url: "http://118.195.129.130:3000/user/out",
        type: "POST",
        data: {}, 
        dataType: "json",
        success: function (result) {
            console.log(result);
        },
        error: function () {
            console.log('Send Request Fail..');
        }
    });

}