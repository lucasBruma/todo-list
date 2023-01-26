// Creation and deletion of "todo-item" elements.
const itemsList = document.querySelector(".list-todo__items");
let itemCount = 1;

function addNewTodo(newTodo) {
    const newItem = document.createElement("div");
    newItem.classList.add("todo-item", "active","dark-border"); 

    const newCheckbox = document.createElement("input");
    newCheckbox.classList.add("todo-item__checkbox", "item");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("id", `item-${itemCount}`);

    const newText = document.createElement("label");
    newText.classList.add("todo-item__text", "not-crossed-out");
    newText.setAttribute("for", `item-${itemCount}`);
    newText.textContent = newTodo;

    const newCross = document.createElement("img");
    newCross.setAttribute("src", "./images/icon-cross.svg");
    newCross.setAttribute("alt", "Cross");
    newCross.classList.add("todo-item__cross");

    newItem.appendChild(newCheckbox);
    newItem.appendChild(newText);
    newItem.appendChild(newCross);

    itemsList.appendChild(newItem);

    itemCount++;
}

function clearNewTodo(){
    document.querySelector(".todo-item__input").value = null;
}

function getValueInput(){
    return document.querySelector(".todo-item__input").value;
}

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

const functions = {
    addNewTodo,
    clearNewTodo,
    getValueInput,
    removeTodo,
    showCross,
    hideCross,
    crossedOutText,
    itemsList
}

export default functions;