import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IDashboardTab } from '../../shared/interfaces/dashboard-tab.interface';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatButtonModule, RouterOutlet, MatIconModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  tabs: IDashboardTab[] = [
    {title: 'daily tasks', routes: 'daily-tasks', icon: 'event'},
    {title: 'done tasks', routes: 'done-tasks', icon: 'task'},
    {title: 'lists', routes: 'lists', icon: 'description'},
  ]

}
