import { onDragOver, onDropDelete } from "./draggable.js";
import { createListItem } from "./html.js";
import {
  getAllTaskFromLocalStorage,
  updateLocalStorage,
} from "./localStorage.js";
import { Task } from "./task.js";

let taskList = [];

function addTaskToList(task) {
  if (typeof task === "string") {
    task = new Task(task, null, false, taskList.length);
  }

  const existingTaskInList = document.querySelector(`li[data-id="${task.id}"]`);
  if (existingTaskInList) {
    return;
  }
  taskList.push(task);
  var list = document.getElementById("task-list");
  var taskItem = createListItem(task);
  // add task item to the list
  list.appendChild(taskItem);
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
  taskList = getAllTaskFromLocalStorage();
  taskList
    .sort((a, b) => a.priority - b.priority)
    .forEach((task) => {
      const newTask = new Task(
        task.text,
        task.id,
        task.completed,
        task.priority
      );
      addTaskToList(newTask);
    });
  const deleteZones = document.querySelectorAll(".delete-dropzone");
  deleteZones.forEach((dropzone) => {
    dropzone.addEventListener("dragover", onDragOver);
    dropzone.addEventListener("drop", onDropDelete);
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
