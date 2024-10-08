import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import LoaiHopDongCongChungResolve from './route/loai-hop-dong-cong-chung-routing-resolve.service';

const loaiHopDongCongChungRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/loai-hop-dong-cong-chung.component').then(m => m.LoaiHopDongCongChungComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiHopDongCongChung/view',
    loadComponent: () => import('./detail/loai-hop-dong-cong-chung-detail.component').then(m => m.LoaiHopDongCongChungDetailComponent),
    resolve: {
      loaiHopDongCongChung: LoaiHopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/loai-hop-dong-cong-chung-update.component').then(m => m.LoaiHopDongCongChungUpdateComponent),
    resolve: {
      loaiHopDongCongChung: LoaiHopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiHopDongCongChung/edit',
    loadComponent: () => import('./update/loai-hop-dong-cong-chung-update.component').then(m => m.LoaiHopDongCongChungUpdateComponent),
    resolve: {
      loaiHopDongCongChung: LoaiHopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default loaiHopDongCongChungRoute;
