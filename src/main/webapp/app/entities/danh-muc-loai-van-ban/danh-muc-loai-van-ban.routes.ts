import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhMucLoaiVanBanResolve from './route/danh-muc-loai-van-ban-routing-resolve.service';

const danhMucLoaiVanBanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-loai-van-ban.component').then(m => m.DanhMucLoaiVanBanComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiVb/view',
    loadComponent: () => import('./detail/danh-muc-loai-van-ban-detail.component').then(m => m.DanhMucLoaiVanBanDetailComponent),
    resolve: {
      danhMucLoaiVanBan: DanhMucLoaiVanBanResolve,
    },
    canActivate: [UserRouteAccessService],
  }
];

export default danhMucLoaiVanBanRoute;
