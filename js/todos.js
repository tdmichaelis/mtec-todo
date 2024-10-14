import {
  getAllTaskFromLocalStorage,
  removeLocalStorage,
  updateLocalStorage,
} from "./localStorage.js";
const trash = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7h16" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /><path d="M10 12l4 4m0 -4l-4 4" /></svg>`;
class Task {
  constructor(task, id, completed) {
    this.id = id || Math.floor(Math.random() * 1000000);
    this.text = task;
    this.completed = !!completed;
  }
  complete() {
    this.completed = true;
  }
  uncomplete() {
    this.completed = false;
  }
  delete() {
    document.querySelector(`li[data-id="${this.id}"]`).remove();
    removeLocalStorage(this.id);
  }
}

function addTaskToList(task) {
  if (typeof task === "string") {
    task = new Task(task);
  } else {
    task = task;
  }
  const existingTask = document.querySelector(`li[data-id="${task.id}"]`);
  if (existingTask) {
    return;
  }
  var taskList = document.getElementById("task-list");
  var taskItem = document.createElement("li");
  // add task id
  taskItem.dataset.id = task.id;
  // add tailwind classes
  taskItem.className =
    "flex justify-between items-center bg-white text-gray-800 my-2";
  // add a checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", function (ev) {
    if (ev.target.checked) task.complete();
    else task.uncomplete();
    console.log(task);
    updateLocalStorage(task.id, task);
  });
  taskItem.appendChild(checkbox);
  // add task
  var taskText = document.createElement("span");
  taskText.innerHTML = task.text;
  taskItem.appendChild(taskText);
  // add a delete button
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = trash;
  deleteButton.className = "delete-button text-red-500";
  deleteButton.addEventListener("click", function () {
    task.delete();
  });
  taskItem.appendChild(deleteButton);
  // add task item to the list
  taskList.appendChild(taskItem);
  updateLocalStorage(task.id, task);
}

function addTask() {
  var taskInput = document.getElementById("task-input");
  var task = taskInput.value;
  if (task === "") return;
  addTaskToList(task);
  taskInput.value = "";
}

function loadContent() {
  const tasks = getAllTaskFromLocalStorage();
  tasks.forEach((task) => {
    const newTask = new Task(task.text, task.id, task.completed);
    addTaskToList(newTask);
  });
}

const addTaskButton = document.getElementById("add-task-button");
const taskInput = document.getElementById("task-input");
// Add task on button click
addTaskButton?.addEventListener("click", addTask);
// Add task on Enter key press
taskInput?.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

document.addEventListener("DOMContentLoaded", loadContent);
