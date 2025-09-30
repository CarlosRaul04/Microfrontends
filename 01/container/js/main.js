document.addEventListener("DOMContentLoaded", () => {
    window.appState = {
        user: null,
        theme: 'light',
        language: 'en'
    }

    if(window.eventBus){
        window.eventBus.subscribe("ROUTE_CHANGED", data => console.log(`Route changed to: ${data.route}`));
        window.eventBus.subscribe("MFE_LOADED", data => console.log(`Microfrontend ${data.name} has loaded`));
        window.eventBus.subscribe("THEME_CHANGE", data => {
            window.appState.theme = data.theme;
            console.log(`Theme changed to: ${data.theme}`);
        
            window.eventBus.publish("THEME_UPDATED", {theme: data.theme})
        });
        
    }  
})