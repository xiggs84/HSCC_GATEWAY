import { Component } from '@angular/core';
import SharedModule from '../../shared/shared.module';
import { LayoutService } from '../../shared/layout/layout.service';

@Component({
  selector: 'jhi-header',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isCollapsed = false;
  constructor(private layoutService: LayoutService) {}

  toggleSidebar() {
    this.layoutService.toggleCollapse();
  }
}
