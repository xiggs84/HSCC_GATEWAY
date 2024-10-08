import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DanhMucLoaiTaiSanResolve from './route/danh-muc-loai-tai-san-routing-resolve.service';

const danhMucLoaiTaiSanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-loai-tai-san.component').then(m => m.DanhMucLoaiTaiSanComponent),
    data: {
      defaultSort: `idLoaiTs,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiTs/view',
    loadComponent: () => import('./detail/danh-muc-loai-tai-san-detail.component').then(m => m.DanhMucLoaiTaiSanDetailComponent),
    resolve: {
      danhMucLoaiTaiSan: DanhMucLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-muc-loai-tai-san-update.component').then(m => m.DanhMucLoaiTaiSanUpdateComponent),
    resolve: {
      danhMucLoaiTaiSan: DanhMucLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiTs/edit',
    loadComponent: () => import('./update/danh-muc-loai-tai-san-update.component').then(m => m.DanhMucLoaiTaiSanUpdateComponent),
    resolve: {
      danhMucLoaiTaiSan: DanhMucLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiTaiSanRoute;
