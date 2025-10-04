import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./attentions/attentions').then(m => m.Attentions)
    },
    {
        path: '**',
        redirectTo: '',
    }
];
