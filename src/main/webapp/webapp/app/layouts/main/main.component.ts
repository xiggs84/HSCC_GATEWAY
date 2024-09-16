import { Component, inject, OnInit, RendererFactory2, Renderer2 } from '@angular/core';
import {RouterOutlet, Router, RouterLink, RouterLinkActive} from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import SharedModule from '../../shared/shared.module';
import dayjs from 'dayjs/esm';

import { AccountService } from 'app/core/auth/account.service';
import { AppPageTitleStrategy } from 'app/app-page-title-strategy';
import FooterComponent from '../footer/footer.component';
import PageRibbonComponent from '../profiles/page-ribbon.component';
import { LayoutService } from '../../shared/layout/layout.service';
import {LoginService} from "../../login/login.service";
import {ProfileService} from "../profiles/profile.service";

@Component({
  standalone: true,
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  providers: [AppPageTitleStrategy],
  imports: [RouterOutlet, FooterComponent, PageRibbonComponent, SharedModule, RouterLink, RouterLinkActive],
})
export default class MainComponent implements OnInit {
  isCollapsed = false;
  inProduction?: boolean;
  openAPIEnabled?: boolean;
  private renderer: Renderer2;

  private router = inject(Router);
  private appPageTitleStrategy = inject(AppPageTitleStrategy);
  private accountService = inject(AccountService);
  private translateService = inject(TranslateService);
  private rootRenderer = inject(RendererFactory2);
  private layoutService = inject(LayoutService);
  private loginService = inject(LoginService);
  private profileService = inject(ProfileService);
  account = inject(AccountService).trackCurrentAccount();

  constructor() {
    this.renderer = this.rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });
    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.appPageTitleStrategy.updateTitle(this.router.routerState.snapshot);
      dayjs.locale(langChangeEvent.lang);
      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });

    this.layoutService.isCollapsed$.subscribe(isCollapsed => {
      this.isCollapsed = isCollapsed;
    });
  }
  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
