import { Component } from '@angular/core';
import {NzSiderComponent} from "ng-zorro-antd/layout";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {RouterLink} from "@angular/router";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'jhi-sidebar',
  standalone: true,
  imports: [
    NzSiderComponent,
    NzMenuDirective,
    RouterLink,
    NzMenuItemComponent,
    NzIconDirective,
    NzSubMenuComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = false;
}
