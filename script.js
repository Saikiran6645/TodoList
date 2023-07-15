document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  // Load tasks from local storage on page load
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task));

  // Function to create a new task element and add it to the list
  function createTaskElement(task) {
    const newTaskItem = document.createElement("li");
    newTaskItem.textContent = task.text;
    newTaskItem.innerHTML += `
      <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      <input type="checkbox" onchange="toggleTaskStatus(this)" ${task.completed ? "checked" : ""}>
    `;
    taskList.appendChild(newTaskItem);
  }

  // Function to add a new task to the list
  function addTask() {
    const newTaskText = taskInput.value.trim();
    if (newTaskText === "") {
      return; // Prevent adding empty tasks
    }

    const task = { text: newTaskText, completed: false };
    createTaskElement(task);
    tasks.push(task);
    updateLocalStorage();
    taskInput.value = ""; // Clear the input field
  }

  // Function to delete a task
  function deleteTask(deleteBtn) {
    const taskItem = deleteBtn.parentNode;
    const index = Array.from(taskList.children).indexOf(taskItem);
    tasks.splice(index, 1);
    taskList.removeChild(taskItem);
    updateLocalStorage();
  }

  // Function to toggle task completion status
  function toggleTaskStatus(checkbox) {
    const taskItem = checkbox.parentNode;
    const index = Array.from(taskList.children).indexOf(taskItem);
    tasks[index].completed = checkbox.checked;
    updateLocalStorage();
    taskItem.classList.toggle("completed", checkbox.checked);
  }

  // Function to update tasks in local storage
  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});


// Function to edit a task
function editTask(taskItem, newText) {
  const index = Array.from(taskList.children).indexOf(taskItem);
  tasks[index].text = newText;
  taskItem.firstChild.textContent = newText;
  updateLocalStorage();
}

// Function to clear all completed tasks
function clearCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  completedTasks.forEach(task => {
    const taskItem = Array.from(taskList.children).find(item => item.textContent === task.text);
    deleteTask(taskItem.querySelector(".delete-btn"));
  });
}

// Function to filter tasks based on completion status
function filterTasks(filter) {
  const allTasks = taskList.children;
  Array.from(allTasks).forEach(taskItem => {
    switch (filter) {
      case "all":
        taskItem.style.display = "flex";
        break;
      case "active":
        taskItem.style.display = taskItem.classList.contains("completed") ? "none" : "flex";
        break;
      case "completed":
        taskItem.style.display = taskItem.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}

// Function to delete all completed tasks
function deleteAllCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  completedTasks.forEach(task => {
    const taskItem = Array.from(taskList.children).find(item => item.textContent === task.text);
    deleteTask(taskItem.querySelector(".delete-btn"));
  });
}
