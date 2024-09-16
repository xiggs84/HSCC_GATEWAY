import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TaiSanDgcResolve from './route/tai-san-dgc-routing-resolve.service';

const taiSanDgcRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/tai-san-dgc.component').then(m => m.TaiSanDgcComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/tai-san-dgc-detail.component').then(m => m.TaiSanDgcDetailComponent),
    resolve: {
      taiSanDgc: TaiSanDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/tai-san-dgc-update.component').then(m => m.TaiSanDgcUpdateComponent),
    resolve: {
      taiSanDgc: TaiSanDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/tai-san-dgc-update.component').then(m => m.TaiSanDgcUpdateComponent),
    resolve: {
      taiSanDgc: TaiSanDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taiSanDgcRoute;
