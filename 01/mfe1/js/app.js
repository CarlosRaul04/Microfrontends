document.addEventListener("DOMContentLoaded", () => {
    const mfeName = "mfe1";
    const messageList = document.querySelector(".message-list");
    let isDarkTheme = false;

    function addMessage(text, source) {
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = `[${source}]: ${text}`;
        messageList.appendChild(messageElement);
    }

    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        const theme = isDarkTheme ? "dark" : "light";
        document.body.classList.toggle("dark-theme", isDarkTheme);

        window.eventBus.publish("THEME_CHANGE", { theme });

        addMessage(`Theme changed to ${theme}`, mfeName);
    }

    function initUI() {
        const themeBtn = document.getElementById("theme-toggle");
        themeBtn.addEventListener("click", toggleTheme);

        const sendMessageBtn = document.getElementById("send-message");
        sendMessageBtn.addEventListener("click", () => {
            const message = `Hello from ${mfeName} at ${new Date().toLocaleTimeString()}`
            window.eventBus.publish("NEW_MESSAGE", {source: mfeName, message});
            addMessage(`Sent: ${message}`, mfeName);
        })
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

    }

    function init() {
        initUI();
        initEventListeners();

        window.eventBus.publish("MFE_LOADED", { name: mfeName});

        addMessage(`MFE1 initialized and ready`, mfeName);
    }

    init();
})