let countPerFive = 0;
let search = (num) => {
    let mutiply = 1;
    mutiply = mutiply + num;
    let currentIndex = 0;
    let input = document.getElementById("search-input");
    let footerWord = document.getElementById("footer-word");

    if (input.value == "") {
        let dataContainer = document.getElementById("order-list-container");
        let list = document.querySelectorAll(".order-list");
        for (let i = 0; i < list.length; i++) {
            dataContainer.removeChild(list[i]);
        }
        let buttons = document.getElementsByClassName("change-button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "white";
            buttons[i].style.cursor = "pointer";
            buttons[i].style.pointerEvents = "initial";
        }
        getFood(pageIndex,5);
    } else {
        $.ajax({
            type: "POST",
            url: "http://118.195.129.130:3000/food/getInfoByKw",
            data: {kw: input.value},
            async: false,
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response.data.length <= 5) {
                    if (response.err == 0 && response.msg == "查询成功") {
                        let dataContainer = document.getElementById("order-list-container");
                        let list = document.querySelectorAll(".order-list");
                        for (let i = 0; i < list.length; i++) {
                            dataContainer.removeChild(list[i]);
                        }
        
                        while(currentIndex < response.data.length) {
                            addLine(response.data[currentIndex].name, response.data[currentIndex].price, response.data[currentIndex].desc, response.data[currentIndex].typename, currentIndex,response);
                            currentIndex++;
                            footerWord.innerHTML = "1 / 1页";
                        }
    
                        let buttons = document.getElementsByClassName("change-button");
                        for (let i = 0; i < buttons.length; i++) {
                            buttons[i].style.backgroundColor = "rgba(230, 230, 230, 0.749)";
                            buttons[i].style.cursor = "not-allowed";
                            buttons[i].style.pointerEvents = "none";
                        }
                    }
                } else if (response.data.length > 5) {
    
    
                    if (response.err == 0 && response.msg == "查询成功") {
                        let dataContainer = document.getElementById("order-list-container");
                        let list = document.querySelectorAll(".order-list");
                        for (let i = 0; i < list.length; i++) {
                            dataContainer.removeChild(list[i]);
                        }
        
    
                        let perviousNum = countPerFive;
                        countPerFive = 5 * mutiply;
                        while (perviousNum < currentIndex < countPerFive) {
                            addLine(response.data[currentIndex].name, response.data[currentIndex].price, response.data[currentIndex].desc, response.data[currentIndex].typename, currentIndex);
                            currentIndex++;
                            footerWord.innerHTML = pageIndex + " / " + totalPage + "页";
                        }
                    }
    
                    let buttons = document.getElementsByClassName("change-button");
                    buttons[0].setAttribute("onclick","search(-1)");
                    buttons[1].setAttribute("onclick","search(1)");
                }
    
            }
        });
    }


}
