// DOM Elements
const taskInput = document.getElementById("task-input");
const pendingTasksContainer = document.getElementById("pending-tasks");
const completedTasksContainer = document.getElementById("completed-tasks");
const addTaskButton = document.getElementById("add-task-btn");

// Load tasks from Local Storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task Event Listener
addTaskButton.addEventListener("click", addTask);

// Functions

function loadTasks() {
    const pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    pendingTasks.forEach(task => renderTask(task, pendingTasksContainer, false));
    completedTasks.forEach(task => renderTask(task, completedTasksContainer, true));
}

function saveTasks() {
    const pendingTasks = Array.from(pendingTasksContainer.children).map(task => task.dataset.task);
    const completedTasks = Array.from(completedTasksContainer.children).map(task => task.dataset.task);

    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    renderTask(taskText, pendingTasksContainer, false);
    saveTasks();
    taskInput.value = '';
}

function renderTask(taskText, container, isCompleted) {
    const taskItem = document.createElement("li");
    taskItem.className = isCompleted ? "completed" : "";
    taskItem.dataset.task = taskText;
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div class="task-actions">
            <button onclick="toggleTaskStatus(this)">${isCompleted ? "Unmark" : "Complete"}</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    container.appendChild(taskItem);
}

function toggleTaskStatus(button) {
    const taskItem = button.parentElement.parentElement;
    const isCompleted = taskItem.classList.toggle("completed");

    if (isCompleted) {
        completedTasksContainer.appendChild(taskItem);
    } else {
        pendingTasksContainer.appendChild(taskItem);
    }
    saveTasks();
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
    saveTasks();
}
