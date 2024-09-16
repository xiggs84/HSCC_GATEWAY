import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TinhTrangTaiSanResolve from './route/tinh-trang-tai-san-routing-resolve.service';

const tinhTrangTaiSanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/tinh-trang-tai-san.component').then(m => m.TinhTrangTaiSanComponent),
    data: {
      defaultSort: `idTinhTrang,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idTinhTrang/view',
    loadComponent: () => import('./detail/tinh-trang-tai-san-detail.component').then(m => m.TinhTrangTaiSanDetailComponent),
    resolve: {
      tinhTrangTaiSan: TinhTrangTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/tinh-trang-tai-san-update.component').then(m => m.TinhTrangTaiSanUpdateComponent),
    resolve: {
      tinhTrangTaiSan: TinhTrangTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idTinhTrang/edit',
    loadComponent: () => import('./update/tinh-trang-tai-san-update.component').then(m => m.TinhTrangTaiSanUpdateComponent),
    resolve: {
      tinhTrangTaiSan: TinhTrangTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tinhTrangTaiSanRoute;
