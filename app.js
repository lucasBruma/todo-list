import functions from "./todo-items.js";
const {addNewTodo,clearNewTodo,getValueInput,itemsList, removeTodo,editInput,crossedOutText,createElements, getList} = functions;
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
const mobileItems = document.querySelector(".mobile-item");
const emptyList = document.querySelector(".empty-list");
const search = document.querySelector('.todo-item__search');
const lens = document.querySelector('.todo-item__lens');

window.addEventListener('DOMContentLoaded',()=>{
    createElements();
    updateItemsLeft(); 
    const list = getList();
    if(list.length != 0) emptyList.style.display = "none";
})

//events todo-items
btnAdd.addEventListener('click',()=>{
    let valueInput = getValueInput();

    if(valueInput.trim().length === 0){
        alert("Write something!");
        clearNewTodo();
    }else{
        addNewTodo(valueInput);
        updateItemsLeft(); 
        clearNewTodo();
        emptyList.style.display = "none";
    }

})


input.addEventListener("keyup", (e) =>{
    if (e.keyCode === 13) {
        let valueInput = getValueInput();
        if(valueInput.trim().length === 0){
            alert("Write something!");
            clearNewTodo();
        }else{
            addNewTodo(valueInput);
            updateItemsLeft(); 
            clearNewTodo();
            emptyList.style.display = "none";
        }
    }
})

itemsList.addEventListener('click', (e)=>{
    if(e.target.className == "todo-item__checkbox item"){
        crossedOutText(e);
        e.target.parentNode.classList.toggle("active");
        e.target.parentNode.classList.toggle("completed");
    }

    if(e.target.className == "todo-item__cross"){
        removeTodo(e.target.parentNode.parentNode);
        const list = getList();
        if(list.length == 0) emptyList.style.display = "block";
    }

    if(e.target.className == "todo-item__pencil"){
        editInput(e.target.parentElement.previousSibling,e)
    }

    updateItemsLeft();
})

//search

search.addEventListener('keyup', e=>{
        document.querySelectorAll(".todo-item__text").forEach(el =>{
            el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?el.parentNode.classList.remove("filter")
                :el.parentNode.classList.add("filter")
        })
    }
)

lens.addEventListener('click', ()=>{
    search.classList.toggle('filter');
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
});

mobileItems.addEventListener('click',(e)=>{
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

clearTodos.addEventListener('click',()=>{
    removeCompleted();
    const list = getList();
    if(list.length == 0) emptyList.style.display = "block";
});

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
	group: "order",
	store: {
        get: function (sortable) {
            let order = localStorage.getItem(sortable.options.group.name);
            return order ? order.split('|') : [];
        },
    
        set: function (sortable) {
            let order = sortable.toArray();
            let list = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
            let newList = [];
        
            for(let i=0;i<list.length;i++){
                let obj = list.find(x => x.id == order[i]);
                newList.push(obj);
            }
        
            localStorage.setItem('items',JSON.stringify(newList));
            localStorage.setItem(sortable.options.group.name,order.join('|'));
        }
    
	}
});

