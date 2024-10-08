import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhMucLoaiSoCongChungResolve from './route/danh-muc-loai-so-cong-chung-routing-resolve.service';

const danhMucLoaiSoCongChungRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-loai-so-cong-chung.component').then(m => m.DanhMucLoaiSoCongChungComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoai/view',
    loadComponent: () => import('./detail/danh-muc-loai-so-cong-chung-detail.component').then(m => m.DanhMucLoaiSoCongChungDetailComponent),
    resolve: {
      danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-muc-loai-so-cong-chung-update.component').then(m => m.DanhMucLoaiSoCongChungUpdateComponent),
    resolve: {
      danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoai/edit',
    loadComponent: () => import('./update/danh-muc-loai-so-cong-chung-update.component').then(m => m.DanhMucLoaiSoCongChungUpdateComponent),
    resolve: {
      danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiSoCongChungRoute;
