import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarMenuItem } from '../../components/sidebarMenuItem/sidebarMenuItem';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterModule, SidebarMenuItem],
  templateUrl: './dashboardLayout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayout {
  public routes = routes[0].children!.filter((route) => route.data);
}
