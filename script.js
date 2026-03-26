const todoList = document.getElementById("todo-list");
const addbtn = document.getElementById("addbtn");
const input = document.getElementById("input");
const counter = document.getElementById("count");
const clear = document.getElementById("clear");

// Helper to keep display and storage in sync
function updateUI() {
  const currentCount = todoList.children.length;
  counter.textContent = currentCount;
  localStorage.setItem("todos", todoList.innerHTML);
}

// Add Task
addbtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  const unique = Date.now();

  li.innerHTML = `
    <input type="checkbox" id="${unique}">
    <span class="task-label">${taskText}</span>
    <img src="img/edit.svg" alt="edit" width="20px" class="edit">
    <button class="deletebtn">Delete</button>
  `;

  todoList.appendChild(li);
  input.value = "";
  updateUI();
});

// Delete & Checkbox Logic
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deletebtn")) {
    e.target.parentElement.remove();
    updateUI();
  }

  if (e.target.type === "checkbox") {
    const label = e.target.nextElementSibling;

    label.style.textDecoration = e.target.checked ? "line-through" : "none";

    e.target.checked
      ? e.target.setAttribute("checked", "")
      : e.target.removeAttribute("checked");

    updateUI();
  }
});

// Clear All
clear.addEventListener("click", () => {
  if (confirm("Delete all tasks?")) {
    todoList.innerHTML = "";
    updateUI();
  }
});

// Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addbtn.click();
  }
});

// Load Data on start
function getData() {
  todoList.innerHTML = localStorage.getItem("todos") || "";
  counter.textContent = todoList.children.length;
}

getData();