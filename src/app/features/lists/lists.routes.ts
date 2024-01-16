import { Routes } from "@angular/router";
import { ListsComponent } from "./lists.component";

export const ListsRoute: Routes = [
    {
        path: '',
        component: ListsComponent,
    },
    {
        path: ':id',
        loadChildren: () => import('./features/list-detail/list-detail.routes').then(r => r.ListDetailRoute)
    },
]