const reservationForm = document.querySelector("#reservation-form");
if (reservationForm) {
    reservationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const date = document.querySelector("#date").value;
        const time = document.querySelector("#time").value;
        const guests = document.querySelector("#guests").value;

        if(document.querySelector("#requirements").value == ""){
           requirements = "<No Requirement>";
        }
        else{
            requirements = document.querySelector("#requirements").value; 
        }

        const reservationMessage = document.querySelector("#reservation-message");


        reservationMessage.textContent = `Thank you, ${name}!  ${email} Your reservation for ${guests} on ${date} at ${time} Your Speciel Requirement ${requirements} has been noted`;
    });
}

const darkModeToggle = document.querySelector("#dark-mode-toggle");
const body = document.body;

// Load theme from localStorage on page load
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    
    // Update button text
    if (body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "Light Mode";
        localStorage.setItem("darkMode", "enabled");
    } else {
        darkModeToggle.textContent = "Dark Mode";
        localStorage.setItem("darkMode", "disabled");
    }
});


let tasks = [];

// Add Task
document.querySelector("#new-task-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const task = {
        id: Date.now(),
        name: document.querySelector("#task-name").value,
        description: document.querySelector("#task-desc").value,
        dueDate: document.querySelector("#task-date").value,
        status: "pending"
    };

    tasks.push(task);
    displayTasks();
    event.target.reset();
});

// Display Tasks
function displayTasks() {
    const tableBody = document.querySelector("#task-table-body");
    tableBody.innerHTML = "";

    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.dueDate}</td>
            <td>${task.status}</td>
            <td>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="markCompleted(${task.id})">Complete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Edit Task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    document.querySelector("#task-name").value = task.name;
    document.querySelector("#task-desc").value = task.description;
    document.querySelector("#task-date").value = task.dueDate;

    deleteTask(id);
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

// Mark Task as Completed
function markCompleted(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.status = "completed";
        displayTasks();
    }
}

// Filter Tasks
function filterTasks(status) {
    const filteredTasks = status === "all" ? tasks : tasks.filter(task => task.status === status);
    const tableBody = document.querySelector("#task-table-body");
    tableBody.innerHTML = "";

    filteredTasks.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.dueDate}</td>
            <td>${task.status}</td>
            <td>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="markCompleted(${task.id})">Complete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Sort Tasks
function sortTasks() {
    const sortValue = document.querySelector("#sort-tasks").value;
    tasks.sort((a, b) => {
        if (sortValue === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortValue === "date") {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
    });
    displayTasks();
}

