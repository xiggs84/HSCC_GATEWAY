import { Component } from '@angular/core';
import SharedModule from '../../shared/shared.module';

@Component({
  selector: 'jhi-sidebar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = false;
}
