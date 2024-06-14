//todo_app
//userが入力する
//+ボタンを押すと入力された内容が追加されるクリックイベント
//削除のボタンを押すとTodo内容が削除される
//チェックボタンを押すと内容に線がはいるようになる。
//進行中終わりのタップを押すと、アンダーバーが移動する
//終わりタップは終わったアイテムだけて、進行中タップは進行中のアイテムだけが出るように。

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add_button");
let taskList = [];
 addButton.addEventListener("click",addTask);

 function addTask() {
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log(taskList);
 }