//유저가 값을  인풋 안에 입력
//버튼 +를 누르면 입력갑이 표시된다
//delete버튼을 누르면 할일이 삭제된다.
//check버튼을 누르면 할일에 밑줄이 그어진다.
//1.채크 버튼을 클릭하는 순간 true를 false로 변환
//true이면 끝난거로 간주하고 밑줄 보여주기
//2.flase이면 안끝난걸로 간주하고 그대로
//3.진행중 끝남 탭을 누르면 ,바가 이동한다.
//끝남탭은 ,끝난 아이템만
//==========================================================
//ユーザが内容を入力されする
//+ボタンを押すと入力値段が表示される。
//deleteボタンを押すとTodo仕事が削除される
//checkボタンを押すとTodoのうえにラインが表示される

//todo_app
//userが入力する
//+ボタンを押すと入力された内容が追加されるクリックイベント
//削除のボタンを押すとTodo内容が削除される
//チェックボタンを押すと内容に線がはいるようになる。
//進行中終わりのタップを押すと、アンダーバーが移動する
//終わりタップは終わったアイテムだけて、進行中タップは進行中のアイテムだけが出るように。

//let taskInput = document.getElementById("task-input");
//let addButton = document.getElementById("add_button");
//let taskList = [];
 //addButton.addEventListener("click",addTask);

 //function addTask() {
   // let taskContent = taskInput.value
   // taskList.push(taskContent)
 //   console.log(taskList);
// }
let taskInput = document.getElementById("text_input");
let taskList = [];//削除
let Completed = true;
let taps = document.querySelectorAll(".task-tabs div" )//여러개 선택
let mode = "All";
let filterList = [];
let add_button = document.getElementById("add_button");
let under_Line = document.getElementById("under-line")
let title = document.querySelector('.title h1');
let clickCount = 0;
console.log(taskInput);

function underline(e) {
    // Remove any existing active class
    under_Line.classList.remove('underline-active');
    // Add the 'underline' class to apply transition
    under_Line.classList.add('underline');
    // Set the left, width, and top properties
    under_Line.style.left = e.offsetLeft + 'px';
    under_Line.style.width = e.offsetWidth -3 + 'px';
    under_Line.style.top = e.offsetTop + e.offsetHeight +8 + 'px';
}

// Call the underline function when a tab is clicked
taps.forEach((task) => {
    task.addEventListener('click', function(e) {
        underline(e.target);
    });
});

//todo애니메이션 작동
function addTaskWithAnimation() {
    if (taskInput.value.trim() !== "") { // 入力がある場合のみ実行
        addTask();
        title.classList.add('animateTitle');
    }
}
// Event listener for button click to add task with animation on each click
add_button.addEventListener("click", function() {
    addTaskWithAnimation();
});
 for(let i = 1; i< taps.length; i++){
    taps[i].addEventListener("click",function(e){
        filter(e);
    });
}
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
        addTaskWithAnimation();
    }

});

function addTask(){
let taskContent = taskInput.value.trim(); // Trim any leading or trailing whitespace

if (!taskContent) {
    taskInput.placeholder = "오늘 할일을 적어주세요!";
    return;
}
    let task = {
        id: randomIDGenerate(),//유니크한 값을 넣는것이 중요하다.
        taskContent: taskInput.value,
        isComplete: false,
    };//객체
    taskList.push(task);//追加情報
    console.log("cliked")
    console.log(taskList)
    render();
    title.classList.add('animateTitle');
    taskInput.value = "";
}
//UI부분
function render() {
     //taskList를 돌리고 있습니다.
    //fillter정보는 없어요..
    //내가 선택한 탭에 따라서
    let list = [];
    if (mode === "All") {
        list = taskList;
    } else if (mode === "Not_Done") {
        list = filterList;
    }
    else if (mode === "Done") {
    list = filterList;
}
    //리스트를 달리 보여준다.
    //
    //allList

    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if(list[i].isComplete === true){
            // 완료된 할일 스타일링
            resultHTML+=
            `<div class = "taskzoon">
                <div class="task_done">${list[i].taskContent}</div>
                <div>
                    <img onclick="checkTask('${list[i].id}')" class= "image" src="images/free-icon-checking.png" >
                    <img onclick="deleteTask('${list[i].id}')" class= "image_delete" src="images/delete.png" >
                </div>
            </div>`;
        }else{
        resultHTML += `
           <div class = "task">
                <div class = "task_text">${list[i].taskContent}</div>
                <div>
                    <img onclick="checkTask('${list[i].id}')" class= "image" src="images/free-icon.png" >
                    <img onclick="deleteTask('${list[i].id}')" class= "image_delete" src="images/delete.png" >
                </div>
            </div>`;
    }
}
document.getElementById("task-board").innerHTML = resultHTML;
};
//clickイベントは2つ方法で実行可能
//클릭 이벤트는 2가지 방식으로 실행 가능
//1.    add_button.addEventListener("click",addTask);를 사용
//2. onClick이벤트로 버튼에게 직접적으로 주는 방식바로 함수를 사용하여 실행 가능
function checkTask(id) {
// Add the logic to add underline or any styling to the task
//선택한 아이템을 ture로 바꾼다.
console.log("ok");
console.log("id:",id);//ok
// Example: taskElement.style.textDecoration = 'line-through'
for( let i=0; i < taskList.length; i++){
    if (taskList[i].id === id){
        taskList[i].isComplete = !taskList[i].isComplete;

        if (mode === "Done" && !taskList[i].isComplete) {
            mode = "All"; // Switch mode back to All if the task is marked incomplete in Done mode
        }
        if (mode === "Not_Done") {
            filterList = taskList.filter(task => !task.isComplete);
        } else if (mode === "Done") {
            filterList = taskList.filter(task => task.isComplete);
        }

        render();
        break;
    }

}
render();//함수 호출!// 끝난거로 간주하고 밑줄 보여주기

}
function randomIDGenerate(){
  //id를 부여해준다.(generate random did javascript 로 검색해본다ㅣ)
  return '_' + Math.random().toString(36).substr(2, 9);
}

function filter(e){

    if (e) {
        mode = e.target.id;
        under_Line.style.width = e.target.offsetWidth + "px";
        under_Line.style.left = e.target.offsetLeft + "px";
        under_Line.style.top = e.target.offsetTop + (e.target.offsetHeight) -3 + "px";
      }
filterList = [];

//3case
if (mode === "All"){
    //전체리스트를 보여준다
    render();
} else if (mode === "Not_Done"){
    //진행중인 아이템을 보여준다.
    // task.isComplete=false
        //  for (let i = 0; i < list.length; i++){
        //  if (list[i].isComplete === false){
        //    filterList.push(list[i]);
        //  }
    console.log("進行中",filterList);
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].isComplete == false){
          filterList.push(taskList[i]);
        }
      }
    render();
    
} else if (mode === "Done"){
    //끝나는케이스
     // task.isComplete=ture
     for (let i = 0; i < taskList.length; i++){
        if (taskList[i].isComplete == true){
          filterList.push(taskList[i]);
        }
    }
     render();
}
}
function deleteTask(id) {
let confirmDelete = confirm("삭제합니다.");

if (confirmDelete) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            
            if (mode === "Not_Done" || mode === "Done") {
                filterList = filterList.filter(task => task.id !== id);
            }
            
            break;
        }
    }

    render();
}
}

let darkModeEnabled = false;
const toggleDarkModeButton = document.getElementById("toggle-dark-mode");
const modeIcon = document.querySelector("#toggle-dark-mode img");

toggleDarkModeButton.addEventListener("click", function() {
darkModeEnabled = !darkModeEnabled;
if (darkModeEnabled) {
    modeIcon.src = "images/moon.png"; // ダークモード用のアイコンに変更
} else {
    modeIcon.src = "images/sun.png"; // ライトモード用のアイコンに変更
}
applyDarkMode(darkModeEnabled);
});


function applyDarkMode(enabled) {
if (enabled) {
    document.body.classList.add("dark-mode"); // ダークモードクラスを追加
    document.body.classList.remove("light-mode"); // ライトモードクラスを削除
} else {
    document.body.classList.add("light-mode"); // ライトモードクラスを追加
    document.body.classList.remove("dark-mode"); // ダークモードクラスを削除
}
}


