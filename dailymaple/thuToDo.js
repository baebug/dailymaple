const thuToDoForm = document.querySelector(".thuToDoForm"),
    thuToDoInput = thuToDoForm.querySelector("input"),
    thuToDoList = document.querySelector(".thuToDoList");

const thu_LS = "thuToDos";

let thuToDos = [];

function deleteTTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    thuToDoList.removeChild(li);
    const cleanTToDos = thuToDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    thuToDos = cleanTToDos;
    saveTToDos();
}

function saveTToDos(){
    localStorage.setItem(thu_LS, JSON.stringify(thuToDos));
}

function paintTToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const checkBox = document.createElement("input");
    const newId = thuToDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTTodo);
    span.innerText = text;
    checkBox.setAttribute("type", "checkBox");
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    thuToDoList.appendChild(li);
    const thuToDoObj = {
        text: text,
        id: newId
    };
    thuToDos.push(thuToDoObj);
    saveTToDos();
}

function handleThuSubmit(event){
    event.preventDefault();
    const currentValueT = thuToDoInput.value;
    paintTToDo(currentValueT);
    thuToDoInput.value="";
}

function loadTToDos(){
    const loadedTToDos = localStorage.getItem(thu_LS);
    if(loadedTToDos !== null){
        const parsedTToDos = JSON.parse(loadedTToDos);
        parsedTToDos.forEach(function(toDo){
            paintTToDo(toDo.text);
        })
            
    }
}

function init() {
    loadTToDos();
    thuToDoForm.addEventListener("submit", handleThuSubmit);
}

init();