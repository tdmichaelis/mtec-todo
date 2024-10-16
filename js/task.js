import { removeLocalStorage, updateLocalStorage } from "./localStorage.js";

export class Task {
  constructor(task, id, completed, priority) {
    this.id = id || Math.floor(Math.random() * 1000000);
    this.text = task;
    this.completed = !!completed;
    this.priority = priority || 0;
    this.status = "new";
  }

  setComplete(val) {
    this.completed = val;
    updateLocalStorage(this.id, this);
  }

  delete() {
    document.querySelector(`li[data-id="${this.id}"]`).remove();
    removeLocalStorage(this.id);
  }
}
