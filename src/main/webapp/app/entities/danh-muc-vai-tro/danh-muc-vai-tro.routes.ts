import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DanhMucVaiTroResolve from './route/danh-muc-vai-tro-routing-resolve.service';

const danhMucVaiTroRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-vai-tro.component').then(m => m.DanhMucVaiTroComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idVaiTro/view',
    loadComponent: () => import('./detail/danh-muc-vai-tro-detail.component').then(m => m.DanhMucVaiTroDetailComponent),
    resolve: {
      danhMucVaiTro: DanhMucVaiTroResolve,
    },
    canActivate: [UserRouteAccessService],
  }
];

export default danhMucVaiTroRoute;
