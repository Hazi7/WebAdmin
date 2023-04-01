let pageShow = (to) => {
    let pages = document.getElementsByClassName("pages");
    let items = document.getElementsByClassName("sidebar-items");
    pages[to].classList.add("page-show");
    items[to].classList.add("sidebar-active");
    
    for (let i = 0; i < pages.length; i++) {
        if (i == to || i == 5) {
            continue;
        }
        pages[i].classList.remove("page-show");
        items[i].classList.remove("sidebar-active");
    }
}

pageShow(0)


changePicture(localStorage.get("url"));

