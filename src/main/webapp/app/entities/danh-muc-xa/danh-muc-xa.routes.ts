import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhMucXaResolve from './route/danh-muc-xa-routing-resolve.service';

const danhMucXaRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-xa.component').then(m => m.DanhMucXaComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':maXa/view',
    loadComponent: () => import('./detail/danh-muc-xa-detail.component').then(m => m.DanhMucXaDetailComponent),
    resolve: {
      danhMucXa: DanhMucXaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-muc-xa-update.component').then(m => m.DanhMucXaUpdateComponent),
    resolve: {
      danhMucXa: DanhMucXaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':maXa/edit',
    loadComponent: () => import('./update/danh-muc-xa-update.component').then(m => m.DanhMucXaUpdateComponent),
    resolve: {
      danhMucXa: DanhMucXaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucXaRoute;
