const form = document.querySelector("#itemForm");
const inputItem = document.querySelector("#itemInput");
const itemsList = document.querySelector("#itemsList");
const filters = document.querySelectorAll(".nav-item");

// create empty item list

let todoItems = [];

// delete item onclick
const removeItem = function(item) {
    const removeIndex = todoItems.indexOf(item);
    todoItems.splice(removeIndex,1);
}

// update item after editing
const updateItem = function(currentItemIndex, value) {
    const newItem = todoItems[currentItemIndex];
    newItem.name = value;
    todoItems.splice(currentItemIndex, 1, newItem);
    setLocalStorage(todoItems);
}

// event handlers for check, edit, delete
const handleItem = function (itemData){
    const items = document.querySelectorAll(".list-group-item");
    items.forEach((item) => {
        if(item.querySelector('.title').getAttribute("data-time") == itemData.addedAt){

            // check item done
            item.querySelector("[data-done]").addEventListener("click", function (e) {
                e.preventDefault();
                const itemIndex = todoItems.indexOf(itemData);
                const currentItem = todoItems[itemIndex];
                const currentClass = currentItem.isDone ? "bi-check-circle-fill" : "bi-check-circle";
                currentItem.isDone = currentItem.isDone ? false : true;
                todoItems.splice(itemIndex, 1, currentItem);
                setLocalStorage(todoItems);
                const iconClass = currentItem.isDone ? "bi-check-circle-fill" : "bi-check-circle";
                this.firstElementChild.classList.replace(currentClass, iconClass);
            });

            // edit item
            item.querySelector("[data-edit]").addEventListener("click", function (e) {
                e.preventDefault();
                inputItem.value = itemData.name;
                document.querySelector('#objIndex').value = todoItems.indexOf(itemData);
            });

             // delete item
             item.querySelector("[data-delete]").addEventListener("click", function (e) {
                e.preventDefault();
                if(confirm("Do you want to delete this task?")){
                    itemsList.removeChild(item);
                    removeItem(item);
                    setLocalStorage(todoItems);
                    return todoItems.filter((item) => item != itemData);
                }
            });
        }
    });
};

const getList = function(todoItems) {
    itemsList.innerHTML = "";
    if (todoItems.length > 0) {
        todoItems.forEach((item) => {
            const iconClass = item.isDone ? "bi-check-circle-fill" : "bi-check-circle";
            itemsList.insertAdjacentHTML("beforeend",
             `<li class="list-group-item d-flex justify-content-between align-items-center">
             <span class="title" data-time="${item.addedAt}">${item.name}</span>
             <span>
                 <a href="#" data-done><i class="bi ${iconClass} todo"></i></a>
                 <a href="#" data-edit><i class="bi bi-pencil-square edit"></i></a>
                 <a href="#" data-delete><i class="bi bi-x-circle delete"></i></a>
             </span>
            </li>`);
            handleItem(item);
        });
    };
};

const getLocalStorage = function(){
    const todoStorage = localStorage.getItem("todoItems");
    if(todoStorage === "undefined" || todoStorage === null){
        todoItems = [];
    }
    else {
        todoItems = JSON.parse(todoStorage);
    }
    getList(todoItems);
}

const setLocalStorage = function(todoItems){
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

document.addEventListener('DOMContentLoaded', () =>{
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const itemName = inputItem.value.trim();
            if(itemName.length === 0){
                alert("Please enter name!");
            }

            else
            {

                const currentItemIndex = document.querySelector('#objIndex').value;
                if(currentItemIndex){
                    updateItem(currentItemIndex, itemName);
                    document.querySelector('#objIndex').value = "";
                }
                else{
                    const itemObj = {
                        name: itemName,
                        isDone: false,
                        addedAt: new Date().getTime(),
                    }; 
                    todoItems.push(itemObj);   
                    setLocalStorage(todoItems);
                }
                getList(todoItems);
            }
            inputItem.value = "";
    });

    // Load items from local storage
    getLocalStorage();
});