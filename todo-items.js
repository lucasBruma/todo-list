// Creation and deletion of "todo-item" elements.
const itemsList = document.querySelector(".list-todo__items");


function addNewTodo(newTodo) {
    let arrayList = getList();
    let lastId;

    if(arrayList.length == 0) {
        lastId = -1; 
    } else{
        const maxIdObject = arrayList.reduce((acc, obj) => {
            return obj.id > acc.id ? obj : acc;
          }, {id: -Infinity});
        lastId = maxIdObject.id;
    }

    const nameItem = createItem(newTodo,lastId + 1,'active');

    let arrayItem = {
        name: nameItem,
        id: lastId + 1,
        state: 'active'
    };

    arrayList.push(arrayItem);
    localStorage.setItem('items',JSON.stringify(arrayList));
}

function createElements(){
    let arrayList = getList();
        for(let item of arrayList){
            createItem(item.name,item.id,item.state);
        }
}

function getList(){
    let list = localStorage.getItem('items');
    return list ? JSON.parse(list) : [];
}

function createItem(name, index, state){
    const newItem = document.createElement("div");
    newItem.classList.add("todo-item", state,"dark-border"); 
    newItem.setAttribute("data-id", index);

    const newCheckbox = document.createElement("input");
    newCheckbox.classList.add("todo-item__checkbox", "item");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("id", `item-${index}`);
    const checked = state == 'active' ? false : true;
    newCheckbox.checked = checked;

    const newText = document.createElement("label");
    const crossedOut = state == 'active' ? 'not-crossed-out' : 'crossed-out';
    newText.classList.add("todo-item__text", crossedOut);
    newText.setAttribute("for", `item-${index}`);
    newText.textContent = name;

    const newCross = document.createElement("img");
    newCross.setAttribute("src", "./images/icon-cross.svg");
    newCross.setAttribute("alt", "Cross");
    newCross.classList.add("todo-item__cross");

    newItem.appendChild(newCheckbox);
    newItem.appendChild(newText);
    newItem.appendChild(newCross);

    itemsList.appendChild(newItem);

    return newText.textContent
}

function clearNewTodo(){
    document.querySelector(".todo-item__input").value = null;
}

function getValueInput(){
    return document.querySelector(".todo-item__input").value;
}

// Mark todos as completed && delete todos from the list
function removeTodo(node){
    let list = getList();
    let newList = list.filter((item) => item.id != node.getAttribute('data-id'));
    localStorage.setItem('items',JSON.stringify(newList));
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
        setStateLocalStorage('completed',parseInt(e.target.id.split('').pop()));
    } else {
        text.classList.add('not-crossed-out');
        text.classList.remove('crossed-out');
        setStateLocalStorage('active',parseInt(e.target.id.split('').pop()));
    }
}

function setStateLocalStorage(state,id){
    let list = getList();
    let index = list.findIndex(x => x.id == id);
    list[index].state = state;
    localStorage.setItem('items',JSON.stringify(list));
}

const functions = {
    addNewTodo,
    clearNewTodo,
    getValueInput,
    removeTodo,
    showCross,
    hideCross,
    crossedOutText,
    createElements,
    itemsList,
    getList
}

export default functions;