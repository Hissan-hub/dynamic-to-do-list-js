document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function createTaskElement(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        removeBtn.onclick = function () {
            if (taskList.contains(li)) {
                taskList.removeChild(li);
            }

            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };
 
        li.appendChild(removeBtn);
        return li;
    }
    function addTask(taskTextFromArg = null, save = true) {
        const taskText = taskTextFromArg !== null ? String(taskTextFromArg).trim() : taskInput.value.trim();

        if (taskText === "") {
            if (taskTextFromArg === null) {
                alert("Please enter a task.");
            }
            return;
        }

        const taskElement = createTaskElement(taskText);
        taskList.appendChild(taskElement);

        if (save) {
            tasks.push(taskText);
            saveTasks();
            taskInput.value = "";
        } else {
        }
    }

    function loadTasks() {
        tasks.forEach(taskText => {
            addTask(taskText, false);
        });
    }

    addButton.addEventListener("click", function () {
        addTask(); 
    });

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    loadTasks();
});
