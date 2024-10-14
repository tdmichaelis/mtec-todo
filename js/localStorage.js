export function updateLocalStorage(key, value) {
  const uid = localStorage.getItem("user-id");
  localStorage.setItem(`${uid}-${key}`, JSON.stringify(value));
}

export function getLocalStorage(key) {
  const uid = localStorage.getItem("user-id");
  return JSON.parse(localStorage.getItem(`${uid}-${key}`));
}

export function removeLocalStorage(key) {
  const uid = localStorage.getItem("user-id");
  localStorage.removeItem(`${uid}-${key}`);
}

export function getAllTaskFromLocalStorage() {
  const uid = localStorage.getItem("user-id");
  const tasks = Object.keys(localStorage).filter((key) => key.includes(uid));

  return tasks.map((key) => {
    return JSON.parse(localStorage.getItem(key));
  });
}
