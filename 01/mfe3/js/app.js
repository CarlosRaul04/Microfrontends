document.addEventListener("DOMContentLoaded", () => {
    const mfeName = "mfe3";
    const messageList = document.querySelector(".message-list");
    const todoList = document.getElementById("todo-list");
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");

    let isDarkTheme = false;
    let todos = [];

    function addMessage(text, source)  {
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = `[${source}]: ${text}`;
        messageList.appendChild(messageElement);
    }

    function addTodo(task) {
        const id = Date.now().toString() + Math.ceil(Math.random()+100).toString();
        const todo = {
            id,
            text: task,
            completed: false
        }

        todos.push(todo);
        renderTodos();
        return todo;
    }

    function toggleTodo(id) {
        todos = todos.map(todo => {
            if(todo.id === id) {
                return { ...todo, completed: !todo.completed}
            }

            return todo;
        })

        renderTodos();
    }

    function shareTodos() {
        window.eventBus.publish("TODOS_SHARED", {
            source: mfeName,
            todos: todos.map(t=> ({ text: t.text, completed: t.completed}))
        })

        addMessage(`Shared ${todos.length} todo items`, mfeName);
    }

    function renderTodos() {
        todoList.innerHTML = "";

        todos.forEach(todo => {
            const li = document.createElement("li");
            li.className = `todo-item ${todo.completed ? "completed" : ""}`;
            li.dataset.id = todo.id;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", () => toggleTodo(todo.id));

            const span = document.createElement("span");
            span.textContent = todo.text;
            li.appendChild(checkbox);
            li.appendChild(span);

            todoList.appendChild(li);
        })
    }


    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        const theme = isDarkTheme ? "dark" : "light";
        document.body.classList.toggle("dark-theme", isDarkTheme);

        window.eventBus.publish("THEME_CHANGE", { theme });

        addMessage(`Theme changed to ${theme}`, mfeName);
    }

    function InitUI() {
        todoForm.addEventListener("submit", e => {
            e.preventDefault();
            const text = todoInput.value.trim();
            if(text) {
                addTodo(text);
                todoInput.value = "";
            }
        })

        document.getElementById("share-todos").addEventListener("click", shareTodos);
        document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

        addTodo("CursosDev. Microfrontends");
        addTodo("Build only with JavaScript");
        addTodo("Learn microfrontends");

    }

    function initEventListeners() {
        window.eventBus.subscribe("THEME_UPDATED", data => {
            isDarkTheme = data.theme === "dark";
            document.body.classList.toggle("dark-theme", isDarkTheme); 
            addMessage(`Theme updated to ${data.theme}`, "container");
        })

        window.eventBus.subscribe("NEW_MESSAGE", data => {
            if(data.source !== mfeName){
                addMessage(data.message, data.source);
            }
        })

        window.eventBus.subscribe("COUNTER_UPDATE", data => {
            if(data.source !== mfeName){
                addMessage(`Recieved count ${data.count} from ${data.source}`, data.source);
            }
        })

        window.eventBus.subscribe("TODOS_SHARED", data => {
            if(data.source !== mfeName){
                addMessage(`Recieved ${data.todos.length} todos from ${data.source}`, data.source);
            }
        })
    }

    function init() {
        InitUI();
        initEventListeners();

        window.eventBus.publish("MFE_LOADED", { name: mfeName});

        addMessage(`MFE1 initialized and ready`, mfeName);

        console.log(todos);
    }

    init();
})