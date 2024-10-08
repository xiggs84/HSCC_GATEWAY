import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import ThongTinCapNhatTaiSanResolve from './route/thong-tin-cap-nhat-tai-san-routing-resolve.service';

const thongTinCapNhatTaiSanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/thong-tin-cap-nhat-tai-san.component').then(m => m.ThongTinCapNhatTaiSanComponent),
    data: {
      defaultSort: `idCapNhat,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idCapNhat/view',
    loadComponent: () => import('./detail/thong-tin-cap-nhat-tai-san-detail.component').then(m => m.ThongTinCapNhatTaiSanDetailComponent),
    resolve: {
      thongTinCapNhatTaiSan: ThongTinCapNhatTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/thong-tin-cap-nhat-tai-san-update.component').then(m => m.ThongTinCapNhatTaiSanUpdateComponent),
    resolve: {
      thongTinCapNhatTaiSan: ThongTinCapNhatTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idCapNhat/edit',
    loadComponent: () => import('./update/thong-tin-cap-nhat-tai-san-update.component').then(m => m.ThongTinCapNhatTaiSanUpdateComponent),
    resolve: {
      thongTinCapNhatTaiSan: ThongTinCapNhatTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default thongTinCapNhatTaiSanRoute;
