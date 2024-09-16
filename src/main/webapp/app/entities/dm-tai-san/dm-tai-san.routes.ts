import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DmTaiSanResolve from './route/dm-tai-san-routing-resolve.service';

const dmTaiSanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/dm-tai-san.component').then(m => m.DmTaiSanComponent),
    data: {
      defaultSort: `idTaiSan,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idTaiSan/view',
    loadComponent: () => import('./detail/dm-tai-san-detail.component').then(m => m.DmTaiSanDetailComponent),
    resolve: {
      dmTaiSan: DmTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/dm-tai-san-update.component').then(m => m.DmTaiSanUpdateComponent),
    resolve: {
      dmTaiSan: DmTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idTaiSan/edit',
    loadComponent: () => import('./update/dm-tai-san-update.component').then(m => m.DmTaiSanUpdateComponent),
    resolve: {
      dmTaiSan: DmTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmTaiSanRoute;
