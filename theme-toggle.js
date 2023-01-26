// toggle dark and light mode
function showHideIcons(){
    const icon = document.querySelector(".title__img");
    const iconHidden = document.querySelector(".title__img--hidden");

    icon.classList.add("title__img--hidden");
    icon.classList.remove("title__img");
    
    iconHidden.classList.add("title__img");
    iconHidden.classList.remove("title__img--hidden");
}

function changeImage(){
    const backgroundImg = document.querySelector(".background-img");
    if(backgroundImg.alt == "Background Dark"){
        backgroundImg.alt = "Background Light";
        backgroundImg.src = "./images/bg-desktop-light.jpg"
    }else{
        backgroundImg.alt = "Background Dark";
        backgroundImg.src = "./images/bg-desktop-dark.jpg"
    }
}

function changeBg(){
    const body = document.querySelector(".body");
    
    if(body.classList.contains("body-dark")){
        body.classList.add("body-light");
        body.classList.remove("body-dark");
    }else{
        body.classList.remove("body-light");
        body.classList.add("body-dark");
    }
}

function addRemoveLightDark(el){
    if(el.classList.contains("block--dark")){
        el.classList.add("block--light");
        el.classList.remove("block--dark");
    }else{
        el.classList.remove("block--light");
        el.classList.add("block--dark");
    }
}

function changeItems(){
    const newItem = document.querySelector(".new-item");
    addRemoveLightDark(newItem);

    const listStates = document.querySelector(".list-todo__states");
    addRemoveLightDark(listStates);

    const mobileItem = document.querySelector(".mobile-item");
    addRemoveLightDark(mobileItem);
}

const functionsTheme = {
    showHideIcons,
    changeImage,
    changeBg,
    changeItems
}

export default functionsTheme;

