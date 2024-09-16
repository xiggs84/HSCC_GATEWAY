import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TaiSanDatNhaResolve from './route/tai-san-dat-nha-routing-resolve.service';

const taiSanDatNhaRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/tai-san-dat-nha.component').then(m => m.TaiSanDatNhaComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/tai-san-dat-nha-detail.component').then(m => m.TaiSanDatNhaDetailComponent),
    resolve: {
      taiSanDatNha: TaiSanDatNhaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/tai-san-dat-nha-update.component').then(m => m.TaiSanDatNhaUpdateComponent),
    resolve: {
      taiSanDatNha: TaiSanDatNhaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/tai-san-dat-nha-update.component').then(m => m.TaiSanDatNhaUpdateComponent),
    resolve: {
      taiSanDatNha: TaiSanDatNhaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taiSanDatNhaRoute;
