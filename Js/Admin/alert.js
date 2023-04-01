

let removeAlert = (num) => {
    


    let checkBox = document.getElementsByClassName("checkbox");
    let checkedNum = 0;
    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked) {
            checkedNum++;
        }
    }

    if (checkedNum == 0) {
        let alert = document.getElementsByClassName("alert");
        alert[num].style.zIndex = "9";
        alert[num].style.opacity = "1";
        let alertContainer = document.getElementById("remove-alert");
        alertContainer.classList.add("success");
        alertContainer.getElementsByTagName("p")[0].innerText = "请至少选择一个";
    } else {
        let alert = document.getElementsByClassName("alert");
        alert[num].style.zIndex = "9";
        alert[num].style.opacity = "1";
        let alertContainer = document.getElementById("remove-alert");
        alertContainer.getElementsByTagName("p")[0].innerText = "确定要删除吗?";
        let buttons = document.getElementsByClassName("remove-alert-button");
        buttons[0].setAttribute("onclick", "removeConfirm()")
    }


}

let removeConfirm = () => {
    let checkBox = document.getElementsByClassName("checkbox");
    let checked = new Array();
    let checkedId = new Array();



    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked == true) {
            checked.push(i);
            console.log(checkBox[i]);
        }
    }




    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/getInfoByPage",
        data: {page: pageIndex, per_page: 5},
        async: false,
        dataType: "json",
        success: function (response) {
            for (let i = 0; i < checked.length; i++) {
                checkedId.push(response.data[checked[i]]._id);
            }
        }
    });


    for (let i = 0; i < checkedId.length; i++) {
        
        console.log(checkedId[i]); 
        

        $.ajax({
            type: "POST",
            url: "http://118.195.129.130:3000/food/del",
            async: false,
            data: {_id: checkedId[i]},
            dataType: "json",
            success: function (response) {

                if (response.err == 0 && response.msg == "删除成功") {

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

                    if (pageIndex > totalPage) {
                        pageIndex = totalPage;
                    }

                    let dataContainer = document.getElementById("order-list-container");
                    let list = document.querySelectorAll(".order-list");
                    for (let i = 0; i < list.length; i++) {
                        dataContainer.removeChild(list[i]);
                    }

                    let alertContainer = document.getElementById("remove-alert");
                    alertContainer.classList.add("success");
                    alertContainer.getElementsByTagName("p")[0].innerText = "删除成功";

                    getFood(pageIndex,5);
                    
                }
            }
        });
        
    }



}
    




let closeRemove = () => {
    let alertContainer = document.getElementById("remove-alert");
    let alert = document.getElementsByClassName("alert")[0];
    alert.style.zIndex = "-1";
    alert.style.opacity = "0";
    alertContainer.classList.remove("success");
}


let clickButtonToRemove = (num) => {
    confirmDeleteButton();
}


let clickButtonConfirm = (num) => {


    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/del",
        async: false,
        data: {_id: removeClickId},
        dataType: "json",
        success: function (response) {
            console.log(response);

            if (response.err == 0 && response.msg == "删除成功") {

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

                if (pageIndex > totalPage) {
                    pageIndex = totalPage;
                }

                let dataContainer = document.getElementById("order-list-container");
                let list = document.querySelectorAll(".order-list");
                for (let i = 0; i < list.length; i++) {
                    dataContainer.removeChild(list[i]);
                }

                let alertContainer = document.getElementById("remove-alert");
                alertContainer.classList.add("success");
                alertContainer.getElementsByTagName("p")[0].innerText = "删除成功";


                
            }
        }
    });


    getFood(pageIndex,5);

}