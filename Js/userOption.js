var option = document.getElementsByClassName("order-change-input")[0];
var userArray = new Array();


$.ajax({
    url: "http://118.195.129.130:3000/users/getInfoByKw_users",
    type: "POST",
    data: {kw: ""}, 
    dataType: "json",
    success: function (result) {
        console.log(result);

        for (let j = 0; j < result.data.length; j++) {
            tempNum = result.data[j].us;
            console.log(result.data[j].us);
            userArray.push(tempNum);
        }


        for (let i = 0; i < userArray.length; i++) {
            option.options.add(new Option(userArray[i]));
        }

    },
    error: function () {
        console.log('Send Request Fail..');
    }
});




