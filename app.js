const btnAdd = document.querySelector(".btn-add");
const itemsList = document.querySelector(".list-todo__items");
const input = document.querySelector(".todo-item__input");
const clearTodos = document.querySelector(".items-clear");
const stateItems = document.querySelector(".items-state");
const stateAll = document.querySelector(".items-state__item--all");
const stateActive = document.querySelector(".items-state__item--active");
const stateCompleted = document.querySelector(".items-state__item--completed");
const itemsLeft = document.querySelector(".items-left");
const toggleTheme = document.querySelector(".title");
let theme = "block--dark";

function addNewTodo(newTodo) {
    // Crear el elemento div
    const newItem = document.createElement("div");
    newItem.classList.add("todo-item", "active", theme,"dark-border"); //,"draggable"
    newItem.setAttribute("draggable",true)

    // Crear el elemento input
    const newCheckbox = document.createElement("input");
    newCheckbox.classList.add("todo-item__checkbox", "item");
    newCheckbox.setAttribute("type", "checkbox");

    // Crear el elemento p
    const newText = document.createElement("p");
    newText.classList.add("todo-item__text", "not-crossed-out");
    newText.textContent = newTodo;

    // Crear el elemento img
    const newCross = document.createElement("img");
    newCross.setAttribute("src", "./images/icon-cross.svg");
    newCross.setAttribute("alt", "Cross");
    newCross.classList.add("todo-item__cross");

    // Agregar los elementos input, p y img al elemento div
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newText);
    newItem.appendChild(newCross);

    // Agregar el elemento div al final del elemento con clase "itemsListAll"
    itemsList.appendChild(newItem);
}

function clearNewTodo(){
    document.querySelector(".todo-item__input").value = null;
}

function getValueInput(){
    return document.querySelector(".todo-item__input").value;
}

btnAdd.addEventListener('click',()=>{
    let valorInput = getValueInput();
    addNewTodo(valorInput);
    clearNewTodo();
    updateItemsLeft();
})

input.addEventListener("keyup", (e) =>{
    if (e.keyCode === 13) {
        let valorInput = getValueInput();
        addNewTodo(valorInput);
        clearNewTodo();
        updateItemsLeft();
    }
})

// Mark todos as completed && delete todos from the list
function removeTodo(node){
    node.remove();
}

function showCross(cross){
    cross.style.display = "block"
}

function hideCross(cross){
    cross.style.display = "none";
}

function crossedOutText(e){
    let text = e.target.nextSibling;
    if (e.target.checked) {
        text.classList.add('crossed-out');
        text.classList.remove('not-crossed-out');
    } else {
        text.classList.add('not-crossed-out');
        text.classList.remove('crossed-out');
    }
}

function updateItemsLeft(){
    const array = [...document.querySelectorAll('.active')];
    const quantity = array.length;
    itemsLeft.textContent = `${quantity} items left`
}

itemsList.addEventListener('click', (e)=>{
    if(e.target.className == "todo-item__checkbox item"){
        crossedOutText(e);
        e.target.parentNode.classList.toggle("active");
        e.target.parentNode.classList.toggle("completed");
    }

    if(e.target.className == "todo-item__cross"){
        removeTodo(e.target.parentNode);
    }

    updateItemsLeft();
})

itemsList.addEventListener('mouseover',(e)=>{
    let string = e.target.className.substring(0,10);
    if(string == "todo-item "){
        showCross(e.target.lastElementChild)
    }else{
        showCross(e.relatedTarget.lastElementChild)
    }
})

itemsList.addEventListener('mouseout',(e)=>{
    let string = e.target.className.substring(0,10);
    if(string== "todo-item "){
        hideCross(e.target.lastElementChild);
    }else{
        hideCross(e.relatedTarget.lastElementChild);
    }
})

//Filter by all/active/completed todos
function filter(hideClass,showClass){
    // Hide elements 
    if(hideClass != undefined){ // because if 'all' is clicked, there's no need to hide any item 
        document.querySelectorAll(hideClass).forEach((item) =>{
            item.style.display = "none";
        });
    }
    // show elements
    document.querySelectorAll(showClass).forEach((item) =>{
        item.style.display = "flex";
    });
}

function setSelected(stateSelected, stateNotSelected, stateNotSelected2){
    stateSelected.classList.add("selected");
    stateNotSelected.classList.remove("selected");
    stateNotSelected2.classList.remove("selected");
}

stateItems.addEventListener('click',(e)=>{
    if(e.target.className == "items-state__item--all"){
        filter(undefined,'.active, .completed');
        setSelected(stateAll,stateActive,stateCompleted);
    }

    if(e.target.className == "items-state__item--active"){
        filter('.completed','.active')
        setSelected(stateActive,stateAll,stateCompleted);
    }

    if(e.target.className == "items-state__item--completed"){
        filter('.active','.completed')
        setSelected(stateCompleted,stateAll,stateActive);
    }
})

//clear complete todos
function removeCompleted(){
    document.querySelectorAll('.completed').forEach((item) =>{
        item.remove();
    })
}

clearTodos.addEventListener('click',removeCompleted);

//toggle dark and light mode
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
        el.classList.add("block--light","light-border");
        el.classList.remove("block--dark","dark-border");
    }else{
        el.classList.remove("block--light","light-border");
        el.classList.add("block--dark","dark-border");
    }
}

function changeItems(){
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((item)=>{
        addRemoveLightDark(item);
    })
    const listStates = document.querySelector(".list-todo__states");
    addRemoveLightDark(listStates);

    const mobileItem = document.querySelector(".mobile-item");
    addRemoveLightDark(mobileItem);
}

toggleTheme.addEventListener('click',(e)=>{
    if(e.target.className == "title__img"){
        showHideIcons();
        changeImage();
        changeBg();
        changeItems();
        if(e.target.alt == "Icon sun") theme = "block--light";
        else theme = "block--dark";
    }
})


//drag and drop

Sortable.create(itemsList,{
    animation: 150,
    ghostClass: 'ghost',
});

