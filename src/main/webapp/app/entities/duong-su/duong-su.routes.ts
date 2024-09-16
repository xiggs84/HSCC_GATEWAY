import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DuongSuResolve from './route/duong-su-routing-resolve.service';

const duongSuRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/duong-su.component').then(m => m.DuongSuComponent),
    data: {
      defaultSort: `idDuongSu,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idDuongSu/view',
    loadComponent: () => import('./detail/duong-su-detail.component').then(m => m.DuongSuDetailComponent),
    resolve: {
      duongSu: DuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/duong-su-update.component').then(m => m.DuongSuUpdateComponent),
    resolve: {
      duongSu: DuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idDuongSu/edit',
    loadComponent: () => import('./update/duong-su-update.component').then(m => m.DuongSuUpdateComponent),
    resolve: {
      duongSu: DuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default duongSuRoute;
