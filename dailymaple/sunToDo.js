const sunToDoForm = document.querySelector(".sunToDoForm"),
    sunToDoInput = sunToDoForm.querySelector("input"),
    sunToDoList = document.querySelector(".sunToDoList");

const sun_LS = "sunToDos";

let sunToDos = [];

function deleteSTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    sunToDoList.removeChild(li);
    const cleanSToDos = sunToDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    sunToDos = cleanSToDos;
    saveSToDos();
}

function saveSToDos(){
    localStorage.setItem(sun_LS, JSON.stringify(sunToDos));
}

function paintSToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const checkBox = document.createElement("input");
    const newId = sunToDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteSTodo);
    span.innerText = text;
    checkBox.setAttribute("type", "checkBox");
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    sunToDoList.appendChild(li);
    const sunToDoObj = {
        text: text,
        id: newId
    };
    sunToDos.push(sunToDoObj);
    saveSToDos();
}

function handleSunSubmit(event){
    event.preventDefault();
    const currentValueS = sunToDoInput.value;
    paintSToDo(currentValueS);
    sunToDoInput.value="";
}

function loadSToDos(){
    const loadedSToDos = localStorage.getItem(sun_LS);
    if(loadedSToDos !== null){
        const parsedSToDos = JSON.parse(loadedSToDos);
        parsedSToDos.forEach(function(toDo){
            paintSToDo(toDo.text);
        })
            
    }
}

function init() {
    loadSToDos();
    sunToDoForm.addEventListener("submit", handleSunSubmit);
}

init();