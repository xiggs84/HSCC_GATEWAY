import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhSachHopDongResolve from './route/danh-sach-hop-dong-routing-resolve.service';

const danhSachHopDongRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-sach-hop-dong.component').then(m => m.DanhSachHopDongComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idHopDong/view',
    loadComponent: () => import('./detail/danh-sach-hop-dong-detail.component').then(m => m.DanhSachHopDongDetailComponent),
    resolve: {
      danhSachHopDong: DanhSachHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-sach-hop-dong-update.component').then(m => m.DanhSachHopDongUpdateComponent),
    resolve: {
      danhSachHopDong: DanhSachHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idHopDong/edit',
    loadComponent: () => import('./update/danh-sach-hop-dong-update.component').then(m => m.DanhSachHopDongUpdateComponent),
    resolve: {
      danhSachHopDong: DanhSachHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhSachHopDongRoute;
