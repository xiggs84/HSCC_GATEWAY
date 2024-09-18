import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DanhSachDuongSuResolve from './route/danh-sach-duong-su-routing-resolve.service';

const danhSachDuongSuRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-sach-duong-su.component').then(m => m.DanhSachDuongSuComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/danh-sach-duong-su-detail.component').then(m => m.DanhSachDuongSuDetailComponent),
    resolve: {
      danhSachDuongSu: DanhSachDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-sach-duong-su-update.component').then(m => m.DanhSachDuongSuUpdateComponent),
    resolve: {
      danhSachDuongSu: DanhSachDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/danh-sach-duong-su-update.component').then(m => m.DanhSachDuongSuUpdateComponent),
    resolve: {
      danhSachDuongSu: DanhSachDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhSachDuongSuRoute;
