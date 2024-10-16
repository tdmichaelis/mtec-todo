import { removeLocalStorage } from "./localStorage.js";

export function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.id);
  event.currentTarget.style.backgroundColor = "yellow";
}
export function onDragDrop(event) {
  event.preventDefault();
  event.currentTarget.style.backgroundColor = "";
}

export function onDragOver(event) {
  event.preventDefault();
  event.currentTarget.style.backgroundColor = "lightblue";
}

export function onDropDelete(event) {
  event.preventDefault();
  const dropzone = event.target;
  // add the task to the dropzone
  const taskId = event.dataTransfer.getData("text/plain");
  console.log(taskId);
  const task = document.querySelector(`li[data-id="${taskId}"]`);
  task.remove();
  // remove the task from the local storage
  removeLocalStorage(taskId);
}
