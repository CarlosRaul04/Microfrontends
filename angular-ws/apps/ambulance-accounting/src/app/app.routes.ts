import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./menu/menu').then(m => m.Menu)
    },
    {
        path: 'manage',
        loadComponent: () => import('./manage/manage').then(m => m.Manage)
    },
    {
        path: 'reports',
        loadComponent: () => import('./reports/reports').then(m => m.Reports)
    },
    {
        path: 'analytics',
        loadComponent: () => import('./analytics/analytics').then(m => m.Analytics)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
