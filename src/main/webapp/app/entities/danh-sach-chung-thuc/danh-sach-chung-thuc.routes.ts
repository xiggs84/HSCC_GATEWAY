import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhSachChungThucResolve from './route/danh-sach-chung-thuc-routing-resolve.service';

const danhSachChungThucRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-sach-chung-thuc.component').then(m => m.DanhSachChungThucComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idChungThuc/view',
    loadComponent: () => import('./detail/danh-sach-chung-thuc-detail.component').then(m => m.DanhSachChungThucDetailComponent),
    resolve: {
      danhSachChungThuc: DanhSachChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-sach-chung-thuc-update.component').then(m => m.DanhSachChungThucUpdateComponent),
    resolve: {
      danhSachChungThuc: DanhSachChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idChungThuc/edit',
    loadComponent: () => import('./update/danh-sach-chung-thuc-update.component').then(m => m.DanhSachChungThucUpdateComponent),
    resolve: {
      danhSachChungThuc: DanhSachChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhSachChungThucRoute;
