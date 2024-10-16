import { onDragDrop, onDragStart } from "./draggable.js";
import { updateLocalStorage } from "./localStorage.js";
import { trash as trashIcon } from "./svg.js";

export function createListItem(task) {
  var taskItem = document.createElement("li");
  // add task id
  taskItem.dataset.id = task.id;
  taskItem.dataset.priority = task.priority;
  taskItem.draggable = true;
  // add tailwind classes
  taskItem.className =
    "item-dropzone flex justify-between items-center bg-white text-gray-800 p-2";
  // add a checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", function (ev) {
    task.setComplete(ev.target.checked);
  });
  taskItem.appendChild(checkbox);
  // add task
  var taskText = document.createElement("span");
  taskText.className = "flex-grow px-2 cursor-pointer";
  taskText.innerHTML = task.text;
  taskText.addEventListener("click", function () {
    // replace with input
    var input = document.createElement("input");
    input.value = task.text;
    input.className = "w-4 flex-grow outline-none pl-2";
    taskText.replaceWith(input);
    input.focus();

    input.addEventListener("blur", function () {
      task.text = input.value;
      // add span back
      let span = document.createElement("span");
      span.className = "flex-grow px-2";
      span.innerHTML = task.text;
      taskText.replaceWith(span);
      updateLocalStorage(task.id, task);
    });
    input.addEventListener("keyup", function (ev) {
      if (ev.key === "Enter") {
        input.blur();
      }
    });
  });
  taskItem.appendChild(taskText);
  taskText;
  // add a delete button
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = trashIcon;
  deleteButton.className = "delete-button text-red-500";
  deleteButton.addEventListener("click", function () {
    task.delete();
  });
  taskItem.appendChild(deleteButton);

  taskItem.addEventListener("dragstart", onDragStart);
  taskItem.addEventListener("dragend", onDragDrop);
  return taskItem;
}
