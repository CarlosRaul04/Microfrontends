class MfeEventBus {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event ( ex: 'eventName' )
  subscribe(eventName, action) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(action);

    return () => {
      // Unsubscribe from the event
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== action
      );
    };
  }

  publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((action) => action(data));
    }

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: "EVENT_BUS",
          eventName,
          data,
        },
        "*"
      );
    }
  }

  init() {
    window.addEventListener("message", (event) => {
      if (event.data && event.data.type === "EVENT_BUS") {
        const { eventName, data } = event.data;
        
        if(this.events[eventName]) {
            this.events[eventName].forEach((action) => action(data));
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.eventBus = new MfeEventBus();
  window.eventBus.init();
});
