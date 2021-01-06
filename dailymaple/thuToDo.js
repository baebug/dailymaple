const thuToDoForm = document.querySelector(".thuToDoForm"),
    thuToDoInput = thuToDoForm.querySelector("input"),
    thuToDoList = document.querySelector(".thuToDoList");

const thu_LS = "thuToDos";
const tCB_LS = "thuCBs";

let thuToDos = [];
let thuCBs = [];
var cB;

function handleThuSubmit(event) {
    event.preventDefault();
    const currentValueT = thuToDoInput.value;
    paintTToDo(currentValueT);
    thuToDoInput.value = "";
}
function paintTToDo(text) {
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
    checkBox.id = `TcB${newId}`;
    thuToDoList.appendChild(li);
    const thuToDoObj = {
        text: text,
        id: newId
    };
    thuToDos.push(thuToDoObj);
    saveTToDos();
}
function saveTToDos() {
    localStorage.setItem(thu_LS, JSON.stringify(thuToDos));
}
function loadTToDos() {
    const loadedTToDos = localStorage.getItem(thu_LS);
    if (loadedTToDos !== null) {
        const parsedTToDos = JSON.parse(loadedTToDos);
        parsedTToDos.forEach(function (toDo) {
            paintTToDo(toDo.text);
        })

    }
}
function deleteTTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    thuToDoList.removeChild(li);
    const cleanTToDos = thuToDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    thuToDos = cleanTToDos;
    saveTToDos();
}

function thuCheckSave(event) {
    i = 1;
    while (i < thuToDos.length + 1) {
        var checkBox = document.getElementById("TcB" + i);
        const thuCBObj = {
            cBs: checkBox.checked,
            id: "TcB" + i
        }
        thuCBs.push(thuCBObj);
        i = i + 1;
    }
    saveTCBs();
}
function saveTCBs() {
    localStorage.setItem(tCB_LS, JSON.stringify(thuCBs));
}
function loadTCheckBox() {
    const loadedTCheckBox = localStorage.getItem(tCB_LS);
    if (loadedTCheckBox !== null) {
        const parsedTCBs = JSON.parse(loadedTCheckBox);
        parsedTCBs.forEach(function (chB) {
            if (chB.cBs === true) {
                const doCheck = document.getElementById(chB.id);
                doCheck.setAttribute("checked", "true");
            }
        })

    }
}







function init() {
    loadTToDos();
    loadTCheckBox();
    thuToDoForm.addEventListener("submit", handleThuSubmit);
}

init();