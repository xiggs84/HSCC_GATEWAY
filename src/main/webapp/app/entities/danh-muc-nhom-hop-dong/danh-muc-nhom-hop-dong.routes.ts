import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhMucNhomHopDongResolve from './route/danh-muc-nhom-hop-dong-routing-resolve.service';

const danhMucNhomHopDongRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-nhom-hop-dong.component').then(m => m.DanhMucNhomHopDongComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idNhom/view',
    loadComponent: () => import('./detail/danh-muc-nhom-hop-dong-detail.component').then(m => m.DanhMucNhomHopDongDetailComponent),
    resolve: {
      danhMucNhomHopDong: DanhMucNhomHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-muc-nhom-hop-dong-update.component').then(m => m.DanhMucNhomHopDongUpdateComponent),
    resolve: {
      danhMucNhomHopDong: DanhMucNhomHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idNhom/edit',
    loadComponent: () => import('./update/danh-muc-nhom-hop-dong-update.component').then(m => m.DanhMucNhomHopDongUpdateComponent),
    resolve: {
      danhMucNhomHopDong: DanhMucNhomHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucNhomHopDongRoute;
