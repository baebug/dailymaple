const sunToDoForm = document.querySelector(".sunToDoForm"),
    sunToDoInput = sunToDoForm.querySelector("input"),
    sunToDoList = document.querySelector(".sunToDoList");

const sun_LS = "sunToDos";
const sCB_LS = "sunCBs";

let sunToDos = [];
let sunCBs = [];
var cB;

function handleSunSubmit(event) {
    event.preventDefault();
    const currentValueS = sunToDoInput.value;
    paintSToDo(currentValueS);
    sunToDoInput.value = "";
}
function paintSToDo(text) {
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
    checkBox.id = `ScB${newId}`;
    sunToDoList.appendChild(li);
    const sunToDoObj = {
        text: text,
        id: newId
    };
    sunToDos.push(sunToDoObj);
    saveSToDos();
}
function saveSToDos() {
    localStorage.setItem(sun_LS, JSON.stringify(sunToDos));
}
function loadSToDos() {
    const loadedSToDos = localStorage.getItem(sun_LS);
    if (loadedSToDos !== null) {
        const parsedSToDos = JSON.parse(loadedSToDos);
        parsedSToDos.forEach(function (toDo) {
            paintSToDo(toDo.text);
        })

    }
}
function deleteSTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    sunToDoList.removeChild(li);
    const cleanSToDos = sunToDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    sunToDos = cleanSToDos;
    saveSToDos();
    location.reload(true);
}
function deleteSCheckBox(){
    i = 1;
    while (i < sunToDos.length + 1) {
        var checkBox = document.getElementById("ScB" + i);
        const sunCBObj = {
            cBs: "false",
            id: "ScB" + i
        }
        sunCBs.push(sunCBObj);
        i = i + 1;
    }
    saveSCBs();
    location.reload();
}
function sunCheckSave(event) {
    i = 1;
    while (i < sunToDos.length + 1) {
        var checkBox = document.getElementById("ScB" + i);
        const sunCBObj = {
            cBs: checkBox.checked,
            id: "ScB" + i
        }
        sunCBs.push(sunCBObj);
        i = i + 1;
    }
    saveSCBs();
    location.reload();
}
function saveSCBs() {
    localStorage.setItem(sCB_LS, JSON.stringify(sunCBs));
}
function loadSCheckBox() {
    const loadedSCheckBox = localStorage.getItem(sCB_LS);
    if (loadedSCheckBox !== null) {
        const parsedSCBs = JSON.parse(loadedSCheckBox);
        parsedSCBs.forEach(function (chB) {
            if (chB.cBs === true) {
                const doCheck = document.getElementById(chB.id);
                doCheck.setAttribute("checked", "true");
            }
        })

    }
}

function init() {
    loadSToDos();
    loadSCheckBox();
    sunToDoForm.addEventListener("submit", handleSunSubmit);
}

init();