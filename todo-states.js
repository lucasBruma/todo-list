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

    document.querySelectorAll(showClass).forEach((item) =>{
        item.style.display = "flex";
    });
}

function setSelected(stateSelected, stateNotSelected, stateNotSelected2){
    stateSelected.classList.add("selected");
    stateNotSelected.classList.remove("selected");
    stateNotSelected2.classList.remove("selected");
}


// clear complete todos
function removeCompleted(){
    document.querySelectorAll('.completed').forEach((item) =>{
        item.remove();
    })
}

const functionsState = {
    updateItemsLeft,
    filter,
    setSelected,
    removeCompleted
}

export default functionsState;

