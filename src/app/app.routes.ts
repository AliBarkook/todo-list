import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(r => r.DashboardRoute),
    },
];
