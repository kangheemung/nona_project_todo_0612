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
    let taskList = [];
    console.log(taskInput);
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
    let add_button = document.getElementById("add_button");
    add_button.addEventListener("click",addTask);

function addTask(){
        let task={
            id: randomIDGenerate(),//유니크한 값을 넣는것이 중요하다.
            taskContent: taskInput.value,
            isComplete: false,
        };//객체
        taskList.push(task);//追加情報
        console.log("cliked")
        console.log(taskList)
        render();
        taskInput.value = "";
    }

    function render() {
        let resultHTML = "";
        for (let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === true){
                resultHTML+=
                `<div class = "taskzoon">
                    <div class="task_done">${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="checkTask('${taskList[i].id}')">
                        <img class= "image" src="images/free-icon-checking.png" >
                        </button>
                        <button  onclick="deleteTask('${taskList[i].id}')">
                        <img class= "image" src="images/delete.png" >
                        </button>
                    </div>
                </div>`;
            }else{
            resultHTML += `
               <div class = "task">
                    <div class = "task_text">${taskList[i].taskContent}</div>
                    <div>
                        <button  onclick="checkTask('${taskList[i].id}')">
                        <img class= "image" src="images/free-icon.png" >
                        </button>
                        <button  onclick="deleteTask('${taskList[i].id}')">
                        <img class= "image" src="images/delete.png" ></button>
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
    let currentId = null;
function checkTask(id) {
    // Add the logic to add underline or any styling to the task
    //선택한 아이템을 ture로 바꾼다.
    console.log("ok");
    console.log("id:",id);//ok
    // Example: taskElement.style.textDecoration = 'line-through'
    for( let i=0; i<taskList.length; i++){
        if (taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete;
            //true변환!taskList[i].isComplete;스위치같은기능
            break;
        }
    }
    render();//함수 호출!// 끝난거로 간주하고 밑줄 보여주기
    console.log(taskList);
}
function randomIDGenerate(){
      //id를 부여해준다.(generate random did javascript 로 검색해본다ㅣ)
      return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
    console.log("delete");
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
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



