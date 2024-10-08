import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhMucLoaiHopDongResolve from './route/danh-muc-loai-hop-dong-routing-resolve.service';

const danhMucLoaiHopDongRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-loai-hop-dong.component').then(m => m.DanhMucLoaiHopDongComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiHd/view',
    loadComponent: () => import('./detail/danh-muc-loai-hop-dong-detail.component').then(m => m.DanhMucLoaiHopDongDetailComponent),
    resolve: {
      danhMucLoaiHopDong: DanhMucLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-muc-loai-hop-dong-update.component').then(m => m.DanhMucLoaiHopDongUpdateComponent),
    resolve: {
      danhMucLoaiHopDong: DanhMucLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiHd/edit',
    loadComponent: () => import('./update/danh-muc-loai-hop-dong-update.component').then(m => m.DanhMucLoaiHopDongUpdateComponent),
    resolve: {
      danhMucLoaiHopDong: DanhMucLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiHopDongRoute;
