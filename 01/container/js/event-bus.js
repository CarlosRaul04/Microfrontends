class EventBus {
    constructor() {
        this.events = {};
    }

    // Subscribe to an event ( ex: 'eventName' )
    subscribe(eventName, action) {
        if(!this.events[eventName]){
            this.events[eventName] = [];
        }

        this.events[eventName].push(action);

        return () => {
            // Unsubscribe from the event 
            this.events[eventName] = this.events[eventName].filter(cb => cb !== action);
        }
    }

    publish(eventName, data) {
        if(this.events[eventName]){
            this.events[eventName].forEach(action => action(data));
        }

        this.publishToMicrofrontend(eventName, data);
    }

    publishToMicrofrontend(eventName, data){
        const iframes = document.querySelectorAll("iframe");

        iframes.forEach(iframe => {
            try {
                if(iframe.contentWindow && iframe.contentWindow.postMessage){
                    iframe.contentWindow.postMessage({
                        type: "EVENT_BUS",
                        eventName,
                        data
                    }, '*'); 
                }    
            } catch (error) {
                console.log(error);
            }
            
        })
    }

    init() {
        window.addEventListener("message", event => {
            if(event.data && event.data.type === "EVENT_BUS") {
                const { eventName, data } = event.data;
                this.publish(eventName, data);
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.eventBus = new EventBus();
    window.eventBus.init();
})