import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./menu/menu').then(m => m.Menu)
    },
    {
        path: 'stock',
        loadComponent: () => import('./stock/stock').then(m => m.Stock)
    },
    {
        path: 'inventory',
        loadComponent: () => import('./inventory/inventory').then(m => m.Inventory)
    },
    {
        path: 'kardex',
        loadComponent: () => import('./kardex/kardex').then(m => m.Kardex)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
