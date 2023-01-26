import functions from "./todo-items.js";
const {addNewTodo,clearNewTodo,getValueInput,itemsList, removeTodo,showCross,hideCross,crossedOutText} = functions;
import functionsState from "./todo-states.js";
const {updateItemsLeft,filter,setSelected,removeCompleted} = functionsState;
import functionsTheme from "./theme-toggle.js";
const {showHideIcons,changeImage,changeBg,changeItems} = functionsTheme;

const btnAdd = document.querySelector(".btn-add");
const input = document.querySelector(".todo-item__input");
const clearTodos = document.querySelector(".items-clear");
const stateItems = document.querySelector(".items-state");
const stateAll = document.querySelector(".items-state__item--all");
const stateActive = document.querySelector(".items-state__item--active");
const stateCompleted = document.querySelector(".items-state__item--completed");
const toggleTheme = document.querySelector(".title");


//events todo-items
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

//events todo-states

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

clearTodos.addEventListener('click',removeCompleted);

//toggle dark and light mode

toggleTheme.addEventListener('click',(e)=>{
    if(e.target.className == "title__img"){
        showHideIcons();
        changeImage();
        changeBg();
        changeItems();
        if(e.target.alt == "Icon sun") {
            itemsList.classList.add("block--light");
            itemsList.classList.remove("block--dark");
        } 
        else{
            itemsList.classList.add("block--dark");
            itemsList.classList.remove("block--light");
        } 
    }
})

//drag and drop

Sortable.create(itemsList,{
    animation: 150,
    ghostClass: 'ghost',
});

