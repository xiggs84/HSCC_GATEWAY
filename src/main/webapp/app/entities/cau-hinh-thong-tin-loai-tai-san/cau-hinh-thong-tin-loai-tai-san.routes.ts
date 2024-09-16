import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CauHinhThongTinLoaiTaiSanResolve from './route/cau-hinh-thong-tin-loai-tai-san-routing-resolve.service';

const cauHinhThongTinLoaiTaiSanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/cau-hinh-thong-tin-loai-tai-san.component').then(m => m.CauHinhThongTinLoaiTaiSanComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/cau-hinh-thong-tin-loai-tai-san-detail.component').then(m => m.CauHinhThongTinLoaiTaiSanDetailComponent),
    resolve: {
      cauHinhThongTinLoaiTaiSan: CauHinhThongTinLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/cau-hinh-thong-tin-loai-tai-san-update.component').then(m => m.CauHinhThongTinLoaiTaiSanUpdateComponent),
    resolve: {
      cauHinhThongTinLoaiTaiSan: CauHinhThongTinLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/cau-hinh-thong-tin-loai-tai-san-update.component').then(m => m.CauHinhThongTinLoaiTaiSanUpdateComponent),
    resolve: {
      cauHinhThongTinLoaiTaiSan: CauHinhThongTinLoaiTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhThongTinLoaiTaiSanRoute;
