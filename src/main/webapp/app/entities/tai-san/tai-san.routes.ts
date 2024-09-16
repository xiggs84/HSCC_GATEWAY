import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TaiSanResolve from './route/tai-san-routing-resolve.service';

const taiSanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/tai-san.component').then(m => m.TaiSanComponent),
    data: {
      defaultSort: `idTaiSan,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idTaiSan/view',
    loadComponent: () => import('./detail/tai-san-detail.component').then(m => m.TaiSanDetailComponent),
    resolve: {
      taiSan: TaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/tai-san-update.component').then(m => m.TaiSanUpdateComponent),
    resolve: {
      taiSan: TaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idTaiSan/edit',
    loadComponent: () => import('./update/tai-san-update.component').then(m => m.TaiSanUpdateComponent),
    resolve: {
      taiSan: TaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taiSanRoute;
