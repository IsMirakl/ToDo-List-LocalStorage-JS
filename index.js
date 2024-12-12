window.onload = loadTasksFromLocalStorage;

function loadTasksFromLocalStorage() {
  const tasksHTML = localStorage.getItem("tasks");
  if (tasksHTML) {
    document.getElementById("taskList").innerHTML = tasksHTML;
    reassignDeleteButtons();
  }
}

function saveTasksToLocalStorage() {
  const taskList = document.getElementById("taskList");
  localStorage.setItem("tasks", taskList.innerHTML);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if (!taskValue) return;

  const newTask = document.createElement("li");
  newTask.className = "task-item";
  newTask.textContent = taskValue;

  const taskList = document.getElementById("taskList");
  taskList.prepend(newTask);

  taskInput.value = "";

  addDescription(newTask);
  addDeleteButton(newTask);

  saveTasksToLocalStorage();
}

function addDescription(taskItem) {
  const descriptionInput = document.getElementById("descriptionInput");
  const descriptionValue = descriptionInput.value.trim();

  if (!descriptionValue) return;

  const newDescription = document.createElement("span");
  newDescription.className = "task-description";
  newDescription.textContent = descriptionValue;

  taskItem.appendChild(newDescription);

  descriptionInput.value = "";

  saveTasksToLocalStorage();
}

function addDeleteButton(taskItem) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerText = "Удалить";

  deleteButton.addEventListener("click", function () {
    taskItem.remove();
    saveTasksToLocalStorage();
  });

  taskItem.appendChild(deleteButton);
}

function reassignDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.parentNode.remove();
      saveTasksToLocalStorage();
    });
  });
}

function addTaskAndDescription() {
  addTask();
}
