import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhMucHuyenResolve from './route/danh-muc-huyen-routing-resolve.service';

const danhMucHuyenRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-huyen.component').then(m => m.DanhMucHuyenComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':maHuyen/view',
    loadComponent: () => import('./detail/danh-muc-huyen-detail.component').then(m => m.DanhMucHuyenDetailComponent),
    resolve: {
      danhMucHuyen: DanhMucHuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-muc-huyen-update.component').then(m => m.DanhMucHuyenUpdateComponent),
    resolve: {
      danhMucHuyen: DanhMucHuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':maHuyen/edit',
    loadComponent: () => import('./update/danh-muc-huyen-update.component').then(m => m.DanhMucHuyenUpdateComponent),
    resolve: {
      danhMucHuyen: DanhMucHuyenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucHuyenRoute;
