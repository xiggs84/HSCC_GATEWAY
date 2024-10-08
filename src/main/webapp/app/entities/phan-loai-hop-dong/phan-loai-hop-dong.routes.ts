import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import PhanLoaiHopDongResolve from './route/phan-loai-hop-dong-routing-resolve.service';

const phanLoaiHopDongRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/phan-loai-hop-dong.component').then(m => m.PhanLoaiHopDongComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idPhanLoaiHopDong/view',
    loadComponent: () => import('./detail/phan-loai-hop-dong-detail.component').then(m => m.PhanLoaiHopDongDetailComponent),
    resolve: {
      phanLoaiHopDong: PhanLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/phan-loai-hop-dong-update.component').then(m => m.PhanLoaiHopDongUpdateComponent),
    resolve: {
      phanLoaiHopDong: PhanLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idPhanLoaiHopDong/edit',
    loadComponent: () => import('./update/phan-loai-hop-dong-update.component').then(m => m.PhanLoaiHopDongUpdateComponent),
    resolve: {
      phanLoaiHopDong: PhanLoaiHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default phanLoaiHopDongRoute;
