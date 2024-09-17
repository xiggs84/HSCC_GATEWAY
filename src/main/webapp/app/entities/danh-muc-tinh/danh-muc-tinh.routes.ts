import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhMucTinhResolve from './route/danh-muc-tinh-routing-resolve.service';

const danhMucTinhRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-tinh.component').then(m => m.DanhMucTinhComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':maTinh/view',
    loadComponent: () => import('./detail/danh-muc-tinh-detail.component').then(m => m.DanhMucTinhDetailComponent),
    resolve: {
      danhMucTinh: DanhMucTinhResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-muc-tinh-update.component').then(m => m.DanhMucTinhUpdateComponent),
    resolve: {
      danhMucTinh: DanhMucTinhResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':maTinh/edit',
    loadComponent: () => import('./update/danh-muc-tinh-update.component').then(m => m.DanhMucTinhUpdateComponent),
    resolve: {
      danhMucTinh: DanhMucTinhResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucTinhRoute;
