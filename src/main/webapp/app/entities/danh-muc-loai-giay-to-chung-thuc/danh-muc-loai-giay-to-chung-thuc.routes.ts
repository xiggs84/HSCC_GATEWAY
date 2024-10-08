import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhMucLoaiGiayToChungThucResolve from './route/danh-muc-loai-giay-to-chung-thuc-routing-resolve.service';

const danhMucLoaiGiayToChungThucRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-loai-giay-to-chung-thuc.component').then(m => m.DanhMucLoaiGiayToChungThucComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiGiayTo/view',
    loadComponent: () =>
      import('./detail/danh-muc-loai-giay-to-chung-thuc-detail.component').then(m => m.DanhMucLoaiGiayToChungThucDetailComponent),
    resolve: {
      danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/danh-muc-loai-giay-to-chung-thuc-update.component').then(m => m.DanhMucLoaiGiayToChungThucUpdateComponent),
    resolve: {
      danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiGiayTo/edit',
    loadComponent: () =>
      import('./update/danh-muc-loai-giay-to-chung-thuc-update.component').then(m => m.DanhMucLoaiGiayToChungThucUpdateComponent),
    resolve: {
      danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiGiayToChungThucRoute;
