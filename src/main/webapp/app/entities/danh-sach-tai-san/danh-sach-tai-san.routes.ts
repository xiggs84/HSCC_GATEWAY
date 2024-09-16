import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DanhSachTaiSanResolve from './route/danh-sach-tai-san-routing-resolve.service';

const danhSachTaiSanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-sach-tai-san.component').then(m => m.DanhSachTaiSanComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/danh-sach-tai-san-detail.component').then(m => m.DanhSachTaiSanDetailComponent),
    resolve: {
      danhSachTaiSan: DanhSachTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-sach-tai-san-update.component').then(m => m.DanhSachTaiSanUpdateComponent),
    resolve: {
      danhSachTaiSan: DanhSachTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/danh-sach-tai-san-update.component').then(m => m.DanhSachTaiSanUpdateComponent),
    resolve: {
      danhSachTaiSan: DanhSachTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhSachTaiSanRoute;
