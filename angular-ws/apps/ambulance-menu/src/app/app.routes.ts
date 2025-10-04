import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: "",
        loadComponent: () => import('./menu/menu').then(m => m.Menu)
    },
    {
        path: "master-tables",
        loadChildren: () => import('@ambulance/master-tables/app.routes').then(m => m.appRoutes)
    },
    {
        path: "billing",
        loadChildren: () => import('@ambulance/billing/app.routes').then(m => m.appRoutes)
    },
    {
        path: "medical-attentions",
        loadChildren: () => import('@ambulance/medical-attentions/app.routes').then(m => m.appRoutes)
    },
    {
        path: "store",
        loadChildren: () => import('@ambulance/store/app.routes').then(m => m.appRoutes)
    },
    {
        path: "accounting",
        loadChildren: () => import('@ambulance/accounting/app.routes').then(m => m.appRoutes)
    },
    {
        path: "**",
        redirectTo: '/'
    }
];
