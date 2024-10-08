import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import SoCongChungTempResolve from './route/so-cong-chung-temp-routing-resolve.service';

const soCongChungTempRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/so-cong-chung-temp.component').then(m => m.SoCongChungTempComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/so-cong-chung-temp-detail.component').then(m => m.SoCongChungTempDetailComponent),
    resolve: {
      soCongChungTemp: SoCongChungTempResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/so-cong-chung-temp-update.component').then(m => m.SoCongChungTempUpdateComponent),
    resolve: {
      soCongChungTemp: SoCongChungTempResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/so-cong-chung-temp-update.component').then(m => m.SoCongChungTempUpdateComponent),
    resolve: {
      soCongChungTemp: SoCongChungTempResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default soCongChungTempRoute;
