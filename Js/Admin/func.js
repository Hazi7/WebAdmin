let addOperationBingo = () => {
    let addPage = document.getElementsByClassName("alert")[1];
    addPage.style.opacity = "1";
    addPage.style.zIndex = "9";
    let addAlert = document.getElementById("add-alert");
    addAlert.style.display = "flex";
    let addSuccessPage = document.getElementById("add-operation-success");
    let svg = addSuccessPage.getElementsByTagName("svg");
    let addAlertPage = document.getElementById("add-alert");
    addSuccessPage.style.opacity = "1";
    addSuccessPage.style.zIndex = "9";
    addSuccessPage.style.display = "flex";
    addAlertPage.opacity = "0";
    addAlertPage.zIndex = "-1";
    addSuccessPage.getElementsByTagName("p")[0].innerText = "操作成功";
    addAlertPage.style.display = "none";
    svg[0].style.display = "none";
    svg[1].style.display = "block";
}


let addperationWrong = () => {
    let addPage = document.getElementsByClassName("alert")[1];
    addPage.style.opacity = "1";
    addPage.style.zIndex = "9";
    let addAlert = document.getElementById("add-alert");
    addAlert.style.display = "flex";
    let addSuccessPage = document.getElementById("add-operation-success");
    let addAlertPage = document.getElementById("add-alert");
    let svg = addSuccessPage.getElementsByTagName("svg");
    addSuccessPage.style.opacity = "1";
    addSuccessPage.style.zIndex = "9";
    addSuccessPage.style.display = "flex";
    addSuccessPage.getElementsByTagName("p")[0].innerText = "操作失败";
    addAlertPage.opacity = "0";
    addAlertPage.zIndex = "-1";
    addAlertPage.style.display = "none";
    svg[1].style.display = "none";
    svg[0].style.display = "block";
}

let confirmDeleteButton = (target) => {
    let alert = document.getElementsByClassName("alert");
    alert[0].style.zIndex = "9";
    alert[0].style.opacity = "1";
    
    let alertContainer = document.getElementById("remove-alert");
    alertContainer.getElementsByTagName("p")[0].innerText = "确定要删除吗?";
    let buttons = document.getElementsByClassName("remove-alert-button");
    buttons[0].setAttribute("onclick", target)
}