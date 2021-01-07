const dailyToDoForm = document.querySelector(".dailyToDoForm"),
    dailyToDoInput = dailyToDoForm.querySelector("input"),
    dailyToDoList = document.querySelector(".dailyToDoList");

const daily_LS = "dailyToDos";
const dCB_LS = "dailyCBs";

let dailyToDos = [];
let dailyCBs = [];
var cB;

/*
function dailyCheckSave(event){
    const DcB = document.getElementById(cB);
    const dailyCBObj = {
        checked: DcB.checked,
        id: cB
    };
    console.log(dailyCBObj.checked);
    if(dailyCBObj.checked ==="true"){
        dailyCBs.push(dailyCBObj);
    } else {
        dailyCBs.pop();
    }
    saveDCBs();
}

function saveDCBs(){
    localStorage.setItem(dCB_LS, JSON.stringify(dailyCBs));
}
// CheckBox 관련
function getDailyCheckId(){
    if(this.checked){
        const CheckId = this.parentNode;
        this.id = `cB${CheckId.id}`;
        cB = this.id;
        dailyCheckSave();
    } else {
        this.checked = false;
    }
}

function dailyCheckSave(){
    var i = 1;
    while(i < dailyToDos.length + 1){
        id=1인 체크박스가 체크되어 있다면 그녀석은 checked = true라고 저장한다.
    그게 아니면 false로 저장한다.
    }
}
*/
/*
function dailyCheckSave(event){
    i = 1;
    while(i < dailyToDos.length + 1){
    var checkBox = document.getElementById("DcB"+i);
    localStorage.setItem("DcB"+i, checkBox.checked);
    i= i+1;
    }
}
*/

function handleDailySubmit(event) {
    event.preventDefault();
    const currentValueD = dailyToDoInput.value;
    paintDToDo(currentValueD);
    dailyToDoInput.value = "";
}
function paintDToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const checkBox = document.createElement("input");
    const newId = dailyToDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteDTodo);
    span.innerText = text;
    checkBox.setAttribute("type", "checkBox");
    //checkBox.setAttribute("checked", "true");
    //checkBox.addEventListener("change", dailyCheckSave);
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    checkBox.id = `DcB${newId}`;
    dailyToDoList.appendChild(li);
    const dailyToDoObj = {
        text: text,
        id: newId
    };
    dailyToDos.push(dailyToDoObj);
    saveDToDos();
}
function saveDToDos() {
    localStorage.setItem(daily_LS, JSON.stringify(dailyToDos));
}
function loadDToDos() {
    const loadedDToDos = localStorage.getItem(daily_LS);
    if (loadedDToDos !== null) {
        const parsedDToDos = JSON.parse(loadedDToDos);
        parsedDToDos.forEach(function (toDo) {
            paintDToDo(toDo.text);
        })

    }
}
function deleteDTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    dailyToDoList.removeChild(li);
    const cleanDToDos = dailyToDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    dailyToDos = cleanDToDos;
    saveDToDos();
}

function dailyCheckSave(){
    i = 1;
    while (i < dailyToDos.length + 1) {
        var checkBox = document.getElementById("DcB" + i);
        const dailyCBObj = {
            cBs: checkBox.checked,
            id: "DcB" + i
        }
        dailyCBs.push(dailyCBObj);
        i = i + 1;
    }
    saveDCBs();
}
function saveDCBs() {
    localStorage.setItem(dCB_LS, JSON.stringify(dailyCBs));
}
function loadDCheckBox() {
    const loadedDCheckBox = localStorage.getItem(dCB_LS);
    if (loadedDCheckBox !== null) {
        const parsedDCBs = JSON.parse(loadedDCheckBox);
        parsedDCBs.forEach(function (chB) {
            if (chB.cBs === true) {
                const doCheck = document.getElementById(chB.id);
                doCheck.setAttribute("checked", "true");
            }
        })

    }
}
/*
function loadDCheckBox(){
    i = 1;
    while(i < dailyToDos.length + 1){
    var checked = JSON.parse(localStorage.getItem("DcB"+i));
    document.getElementById("DcB"+i).checked = checked;
    i= i+1;
    }

}
*/

// loadDCheckBox
/*
function clean_LS(){
    i = 30;
    while(dailyToDos.length < i){
        localStorage.removeItem("DcB"+i);
        i = i - 1;
    }
}
*/
function init() {
    loadDToDos();
    loadDCheckBox();
    setInterval(dailyCheckSave, 300000);
    //clean_LS();
    dailyToDoForm.addEventListener("submit", handleDailySubmit);
}

init();