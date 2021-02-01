const titleFirst = document.querySelector(".titleFirst"),
    titleSecond = document.querySelector(".titleSecond"),
    titleThird = document.querySelector(".titleThird"),
    firstTitleInput = titleFirst.querySelector("input"),
    secondTitleInput = titleSecond.querySelector("input"),
    thirdTitleInput = titleThird.querySelector("input"),
    firstForm = titleFirst.querySelector("form"),
    secondForm = titleSecond.querySelector("form"),
    thirdForm = titleThird.querySelector("form");

const first_LS = "firstTitle",
    second_LS = "secondTitle",
    third_LS = "thirdTitle",
    SHOWING_CN = "showing";

function askFirstTitle(){
    firstForm.addEventListener("submit", handleFirstTitleSubmit);
}
function askSecondTitle(){
    secondForm.addEventListener("submit", handleSecondTitleSubmit);
}
function askThirdTitle(){
    thirdForm.addEventListener("submit", handleThirdTitleSubmit);
}

function saveFTitle(text){
    localStorage.setItem(first_LS, text);
}
function saveSTitle(text){
    localStorage.setItem(second_LS, text);
}
function saveTTitle(text){
    localStorage.setItem(third_LS, text);
}

function handleFirstTitleSubmit(event){
    event.preventDefault();
    const currentValue = firstTitleInput.value;
    saveFTitle(currentValue);
    location.reload();
}
function handleSecondTitleSubmit(event){
    event.preventDefault();
    const currentValue = secondTitleInput.value;
    saveSTitle(currentValue);
    location.reload();
}
function handleThirdTitleSubmit(event){
    event.preventDefault();
    const currentValue = thirdTitleInput.value;
    saveTTitle(currentValue);
    location.reload();
}

function resetFirstTitle(){
    const newTitle = prompt('제목을 입력해주세요.', "오늘까지 할 일");
    saveFTitle(newTitle);
    location.reload();
}
function resetSecondTitle(){
    const newTitle = prompt('제목을 입력해주세요.', "오늘까지 할 일");
    saveSTitle(newTitle);
    location.reload();
}
function resetThirdTitle(){
    const newTitle = prompt('제목을 입력해주세요.', "오늘까지 할 일");
    saveTTitle(newTitle);
    location.reload();
}

function loadFirstTitle(){
    const firstTitle = localStorage.getItem(first_LS);
    if(firstTitle === null){
        askFirstTitle();
    } else {
        paintFirstTitle(firstTitle);
    }
}
function loadSecondTitle(){
    const secondTitle = localStorage.getItem(second_LS);
    if(secondTitle === null){
        askSecondTitle();
    } else {
        paintSecondTitle(secondTitle);
    }
}
function loadThirdTitle(){
    const thirdTitle = localStorage.getItem(third_LS);
    if(thirdTitle === null){
        askThirdTitle();
    } else {
        paintThirdTitle(thirdTitle);
    }
}

function paintFirstTitle(text) {
    titleFirst.innerHTML = `<h1 class="setTitle">${text}<input type="button" value="✏️" onclick="resetFirstTitle()" /></h1>`;
}
function paintSecondTitle(text) {
    titleSecond.innerHTML = `<h1 class="setTitle">${text}<input type="button" value="✏️" onclick="resetSecondTitle()" /></h1>`;
}
function paintThirdTitle(text) {
    titleThird.innerHTML = `<h1 class="setTitle">${text}<input type="button" value="✏️" onclick="resetThirdTitle()" /></h1>`;
}


function init() {
    loadFirstTitle();
    loadSecondTitle();
    loadThirdTitle();
}

init();