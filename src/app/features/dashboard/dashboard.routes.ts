import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const DashboardRoute: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'daily-task',
                pathMatch: 'full'
            },
            // {
            //     path: 'daily-task',
            //     loadChildren: () => import('../../order-container/routes/order.routes').then(r => r.ORDER_ROUTES)
            // },
        ]
    },


]