import { Component } from '@angular/core';
import SharedModule from '../../shared/shared.module';
import {RouterLink} from "@angular/router";
import { LayoutService } from '../../shared/layout/layout.service';

@Component({
  selector: 'jhi-sidebar',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = true;

  constructor(private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.layoutService.isCollapsed$.subscribe((collapsed) => {
      this.isCollapsed = collapsed;
    });
  }
}
