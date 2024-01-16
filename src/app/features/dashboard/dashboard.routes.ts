import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const DashboardRoute: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'daily-tasks',
                pathMatch: 'full'
            },
            {
                path: 'daily-tasks',
                loadChildren: () => import('../daily-tasks/daily-tasks.routes').then(r => r.DailyTasksRoute)
            },
            {
                path: 'done-tasks',
                loadChildren: () => import('../done-tasks/done-tasks.routes').then(r => r.DoneTasksRoute)
            },
            {
                path: 'lists',
                loadChildren: () => import('../lists/lists.routes').then(r => r.ListsRoute)
            },
        ]
    },


]