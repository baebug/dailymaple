const dailyToDoForm = document.querySelector(".dailyToDoForm"),
    dailyToDoInput = dailyToDoForm.querySelector("input"),
    dailyToDoList = document.querySelector(".dailyToDoList");

const daily_LS = "dailyToDos";

let dailyToDos = [];

function deleteDTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    dailyToDoList.removeChild(li);
    const cleanDToDos = dailyToDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    dailyToDos = cleanDToDos;
    saveDToDos();
}

function saveDToDos(){
    localStorage.setItem(daily_LS, JSON.stringify(dailyToDos));
}

function paintDToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const checkBox = document.createElement("input");
    const newId = dailyToDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteDTodo);
    span.innerText = text;
    checkBox.setAttribute("type", "checkBox");
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    dailyToDoList.appendChild(li);
    const dailyToDoObj = {
        text: text,
        id: newId
    };
    dailyToDos.push(dailyToDoObj);
    saveDToDos();
}

function handleDailySubmit(event){
    event.preventDefault();
    const currentValueD = dailyToDoInput.value;
    paintDToDo(currentValueD);
    dailyToDoInput.value="";
}

function loadDToDos(){
    const loadedDToDos = localStorage.getItem(daily_LS);
    if(loadedDToDos !== null){
        const parsedDToDos = JSON.parse(loadedDToDos);
        parsedDToDos.forEach(function(toDo){
            paintDToDo(toDo.text);
        })
            
    }
}

function init() {
    loadDToDos();
    dailyToDoForm.addEventListener("submit", handleDailySubmit);
}

init();