import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: "",
        loadComponent: () => import('./billing/billing').then(m => m.Billing)
    },
    {
        path: "**",
        redirectTo: "",
    }
];
