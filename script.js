// DOM ELEMENTS
const input = document.getElementById("inputbtn");
const todo = document.getElementById("todo-list");
const addbtn = document.getElementById("add-btn");

// Add new todo
addbtn.addEventListener("click", () => {
    const taskText = input.value;
    if (!taskText) return; // don't add empty tasks

    const uniqueId = "checkbox-" + Date.now(); // unique checkbox id

    todo.innerHTML += `
        <li>
        <input type="checkbox" id="${uniqueId}">
        <div id="first">
            <label id="task1" for="${uniqueId}">${taskText}</label>
            </div>
            <button class="delete-btn">Delete</button>
        </li>
    `;

    input.value = ""; // clear input
});

// Delete task using event delegation
todo.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    }
});

// Click to the checkbox
todo.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        const label = e.target.nextElementSibling; // the label next to the checkbox
        if (e.target.checked) {
            label.style.textDecoration = "line-through"; // mark as done
        } else {
            label.style.textDecoration = "none"; // unmark
        }
    }
});

// click to enter for click add
input.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        addbtn.click();
    }
})