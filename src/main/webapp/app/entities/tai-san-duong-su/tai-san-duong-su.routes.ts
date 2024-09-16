import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TaiSanDuongSuResolve from './route/tai-san-duong-su-routing-resolve.service';

const taiSanDuongSuRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/tai-san-duong-su.component').then(m => m.TaiSanDuongSuComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/tai-san-duong-su-detail.component').then(m => m.TaiSanDuongSuDetailComponent),
    resolve: {
      taiSanDuongSu: TaiSanDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/tai-san-duong-su-update.component').then(m => m.TaiSanDuongSuUpdateComponent),
    resolve: {
      taiSanDuongSu: TaiSanDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/tai-san-duong-su-update.component').then(m => m.TaiSanDuongSuUpdateComponent),
    resolve: {
      taiSanDuongSu: TaiSanDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taiSanDuongSuRoute;
