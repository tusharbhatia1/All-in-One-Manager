const form = document.querySelector("#itemForm");
const inputItem = document.querySelector("#itemInput");
const itemsList = document.querySelector("#itemsList");
const filters = document.querySelectorAll(".nav-item");

// create empty item list

let todoItems = [];

const getList = function(todoItems) {
    itemsList.innerHTML = "";
    if (todoItems.length > 0) {
        todoItems.forEach((item) => {
            itemsList.insertAdjacentHTML("beforeend",
             `<li class="list-group-item d-flex justify-content-between align-items-center">
             <span>${item.name}</span>
             <span>
                 <a href="#"><i class="bi bi-x-circle todo"></i></a>
                 <a href="#"><i class="bi bi-pencil-square edit"></i></a>
                 <a href="#"><i class="bi bi-check-circle delete"></i></a>
             </span>
            </li>`);
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
                const itemObj = {
                    name: itemName,
                    isDone: false,
                    addedAt: new Date().getTime(),
                }; 
                todoItems.push(itemObj);   
                setLocalStorage(todoItems);
            }
    });

    // Load items from local storage
    getLocalStorage();
});