import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: "",
        loadComponent: () => import('./menu/menu').then(m => m.Menu)
    },
    {
        path: "district",
        loadComponent: () => import('./district/district').then(m => m.District)
    },
    {
        path: "driver",
        loadComponent: () => import('./driver/driver').then(m => m.Driver)
    },
    {
        path: "medic",
        loadComponent: () => import('./medic/medic').then(m => m.Medic)
    },
    {
        path: "paramedic",
        loadComponent: () => import('./paramedic/paramedic').then(m => m.Paramedic)
    },
    {
        path: "patient",
        loadComponent: () => import('./patient/patient').then(m => m.Patient)
    },
    {
        path: "**",
        redirectTo: "/"
    }
];
