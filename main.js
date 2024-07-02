//유저가 값을  인풋 안에 입력
//버튼 +를 누르면 입력갑이 표시된다
//delete버튼을 누르면 할일이 삭제된다.
//check버튼을 누르면 할일에 밑줄이 그어진다.
//진행중 끝남 탭을 누르면 ,바가 이동한다.
//끝남탭은 ,끝난 아이템만
//===================================
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
    console.log(taskInput);
    let add_button = document.getElementById("add_button");
    let taskList = []

    add_button.addEventListener("click",addTask)

function addTask(){
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log("cliked")
    console.log(taskList)
    render();
    }
    function render(){
        let resultHTML = "";
        for (let i = 0; i < taskList.length; i++) {
            resultHTML += `
               <div class = "task">
                    <div>${taskList[i]}</div>
                    <div>
                        <button onclick="checkTask(${i})">Check</button>
                        <button onclick="deleteTask(${i})">Delete</button>
                    </div>
                </div>`;
        }
        document.getElementById("task-board").innerHTML = resultHTML;
    }
    
function checkTask(index) {
    // Add the logic to add underline or any styling to the task
    let taskElement = document.querySelector(`#task-board div.task:nth-child(${index + 1})`);
    // Example: taskElement.style.textDecoration = 'line-through';
}

function deleteTask(index) {
    taskList.splice(index, 1);
    render();
}