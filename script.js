let taskList = [];

function addTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const dueDate = document.getElementById('taskDueDate').value;
  const priority = document.getElementById('taskPriority').value;
  const tags = document.getElementById('taskTags').value.split(',');

  if (title && dueDate) {
    const task = {
      title,
      description,
      dueDate,
      priority,
      tags,
      completed: false,
    };

    taskList.push(task);
    displayTasks();
    clearInputs();
    saveTaskListToLocalStorage();
  }
}

function displayTasks() {
  const taskListElement = document.getElementById('taskList');
  taskListElement.innerHTML = '';

  taskList.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><b>Due Date:</b> ${task.dueDate}</p>
      <p><b>Priority:</b> ${task.priority}</p>
      <p><b>Tags:</b> ${task.tags.join(', ')}</p>
      <button onclick="completeTask(${index})">Complete</button>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskListElement.appendChild(taskItem);
  });
}

function completeTask(index) {
  taskList[index].completed = !taskList[index].completed;
  displayTasks();
  saveTaskListToLocalStorage();
}

function editTask(index) {
  const task = taskList[index];
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDescription').value = task.description;
  document.getElementById('taskDueDate').value = task.dueDate;
  document.getElementById('taskPriority').value = task.priority;
  document.getElementById('taskTags').value = task.tags.join(',');
}

function deleteTask(index) {
  taskList.splice(index, 1);
  displayTasks();
  saveTaskListToLocalStorage();
}

function completeAllTasks() {
  taskList.forEach((task) => {
    task.completed = true;
  });
  displayTasks();
  saveTaskListToLocalStorage();
}

function clearCompletedTasks() {
  taskList = taskList.filter((task) => !task.completed);
  displayTasks();
  saveTaskListToLocalStorage();
}

function deleteAllTasks() {
  taskList = [];
  displayTasks();
  saveTaskListToLocalStorage();
}

function clearInputs() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  document.getElementById('taskDueDate').value = '';
  document.getElementById('taskPriority').value = 'low';
  document.getElementById('taskTags').value = '';
}

function loadTaskListFromLocalStorage() {
  const savedTaskList = localStorage.getItem('taskList');
  if (savedTaskList) {
    taskList = JSON.parse(savedTaskList);
  }
}

function saveTaskListToLocalStorage() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

loadTaskListFromLocalStorage();
displayTasks();
