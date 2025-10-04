import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { APP_VERSION } from './app.constants';
import { enviroment } from '../environment';
import { HeaderAppWrapperComponent } from './header-app-wrapper/header-app-wrapper.component';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => loadRemoteModule({
            type: "module",
            remoteEntry: `${enviroment.remotesUrl.homeApp}/remoteEntry.js?v=${APP_VERSION}`,
            exposedModule: './web-components'
        }).then(m => m.AppComponent),
    },

    {
        path: "views",
        loadComponent: () => import("./view-app-wrapper/view-app-wrapper.component").then(m => m.ViewAppWrapperComponent)
    }


    // {
    //     path: "histories",
    //     loadComponent: () => loadRemoteModule({
    //         type: "module",
    //         remoteEntry: `${enviroment.remotesUrl.historiesApp}/remoteEntry.js?v=${APP_VERSION}`,
    //         exposedModule: './web-components'
    //     }).then(m => m.AppComponent),
    // },
    // {
    //     path: "patients",
    //     loadComponent: () => loadRemoteModule({
    //         type: "module",
    //         remoteEntry: `${enviroment.remotesUrl.patientsApp}/remoteEntry.js?v=${APP_VERSION}`,
    //         exposedModule: './web-components'
    //     }).then(m => m.AppComponent),
    //     // loadComponent: () => import('./patients-app-wrapper/patients-app-wrapper.component').then(m => m.PatientsAppWrapperComponent),
    // },
    // {
    //     path: "header",
    //     // component: HeaderAppWrapperComponent
    //     loadComponent: () => loadRemoteModule({
    //         type: "module",
    //         remoteEntry: `${enviroment.remotesUrl.headerApp}/remoteEntry.js?v=${APP_VERSION}`,
    //         exposedModule: './web-components'
    //     }).then(m => m.AppComponent),
    // },

];