import functions from "./todo-items.js";
const {removeTodo, getList} = functions;
// Functions related to managing events of the list (the elements of the list state)
const itemsLeft = document.querySelector(".items-left");

function updateItemsLeft(){
    const array = [...document.querySelectorAll('.active')];
    const quantity = array.length;
    itemsLeft.textContent = `${quantity} items left`
}

//Filter by all/active/completed todos
function filter(hideClass,showClass){

    if(hideClass != undefined){ // because if 'all' is clicked, there's no need to hide any item 
        document.querySelectorAll(hideClass).forEach((item) =>{
            item.style.display = "none";
        });
    }

    const listShowClass = document.querySelectorAll(showClass)
    const list = getList();

    if([...listShowClass].length == 0 && list.length != 0){
        document.querySelector('.empty-list-state').style.display = "block";
    }else{
        document.querySelector('.empty-list-state').style.display = "none";
        listShowClass.forEach((item) =>{
            item.style.display = "flex";
        });
    }

}

function setSelected(stateSelected, stateNotSelected, stateNotSelected2){
    stateSelected.classList.add("selected");
    stateNotSelected.classList.remove("selected");
    stateNotSelected2.classList.remove("selected");
}


// clear complete todos
function removeCompleted(){
    document.querySelectorAll('.completed').forEach((item) =>{
        removeTodo(item);
    });
}

const functionsState = {
    updateItemsLeft,
    filter,
    setSelected,
    removeCompleted
}

export default functionsState;

