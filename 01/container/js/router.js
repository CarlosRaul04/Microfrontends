class Router {
    constructor() {
        this.routes = {
            "mfe1": "..//mfe1/index.html",
            "mfe2": "../mfe2/index.html",
            "mfe3": "../mfe3/index.html"
        };
        this.contentElement = document.getElementById("content");
        this.defaultRoute = "mfe1";
        this.currentMfe = null;
    }

    init(){
        const navLinks = document.querySelectorAll("nav a");
        navLinks.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const mfe = e.target.getAttribute("data-mfe");
                
                this.navigate(mfe);

                navLinks.forEach(el => el.classList.remove("active"));
                e.target.classList.add("active");
            })
        })

        const hash = window.location.hash.substring(1);
        const initialRoute = hash | this.defaultRoute;
        this.navigate(initialRoute);
    }

    navigate(route){


        if(!this.routes[route]){
            console.error('Route not found:', route);
            route = this.defaultRoute;
        }

        window.location.hash = route;

        this.loadMicroFrontend(route);
    }

    loadMicroFrontend(mfeName){
        this.contentElement.innerHTML = "";

        const iframe = document.createElement("iframe");
        iframe.src = this.routes[mfeName];
        iframe.id = `${mfeName}-frame`;
        iframe.title = `${mfeName} application`;

        this.contentElement.appendChild(iframe);

        this.currentMfe = mfeName;

        if(window.eventBus){
            window.eventBus.publish("ROUTE CHANGED", { route: mfeName });
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.router = new Router();
    window.router.init();
})