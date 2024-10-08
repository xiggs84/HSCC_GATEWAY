import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import SoCongChungResolve from './route/so-cong-chung-routing-resolve.service';

const soCongChungRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/so-cong-chung.component').then(m => m.SoCongChungComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idSo/view',
    loadComponent: () => import('./detail/so-cong-chung-detail.component').then(m => m.SoCongChungDetailComponent),
    resolve: {
      soCongChung: SoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/so-cong-chung-update.component').then(m => m.SoCongChungUpdateComponent),
    resolve: {
      soCongChung: SoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idSo/edit',
    loadComponent: () => import('./update/so-cong-chung-update.component').then(m => m.SoCongChungUpdateComponent),
    resolve: {
      soCongChung: SoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default soCongChungRoute;
