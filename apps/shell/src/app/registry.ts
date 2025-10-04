import { loadRemoteModule } from "@angular-architects/module-federation";
import { APP_VERSION } from "./app.constants";

export type IRegistry = {
    headerApp: () => Promise<any>;
    historiesApp: () => Promise<any>;
    homeApp: () => Promise<any>;
    patientsApp: () => Promise<any>;
}

export const registry: IRegistry = {
    headerApp: () => loadRemoteModule({
        type: "module",
        remoteEntry: `http://localhost:4240/remoteEntry.js?v=${APP_VERSION}`,
        exposedModule: './web-components'
    }),
    historiesApp: () => loadRemoteModule({
        type: "module",
        remoteEntry: `http://localhost:4230/remoteEntry.js?v=${APP_VERSION}`,
        exposedModule: './web-components'
    }),
    homeApp: () => loadRemoteModule({
        type: "module",
        remoteEntry: `http://localhost:4220/remoteEntry.js?v=${APP_VERSION}`,
        exposedModule: './web-components'
    }),
    patientsApp: () => loadRemoteModule({
        type: "module",
        remoteEntry: `http://localhost:4210/remoteEntry.js?v=${APP_VERSION}`,
        exposedModule: './web-components'
    }),
}