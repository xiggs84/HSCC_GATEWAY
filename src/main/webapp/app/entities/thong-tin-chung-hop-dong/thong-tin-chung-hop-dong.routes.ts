import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import ThongTinChungHopDongResolve from './route/thong-tin-chung-hop-dong-routing-resolve.service';

const thongTinChungHopDongRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/thong-tin-chung-hop-dong.component').then(m => m.ThongTinChungHopDongComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/thong-tin-chung-hop-dong-detail.component').then(m => m.ThongTinChungHopDongDetailComponent),
    resolve: {
      thongTinChungHopDong: ThongTinChungHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/thong-tin-chung-hop-dong-update.component').then(m => m.ThongTinChungHopDongUpdateComponent),
    resolve: {
      thongTinChungHopDong: ThongTinChungHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/thong-tin-chung-hop-dong-update.component').then(m => m.ThongTinChungHopDongUpdateComponent),
    resolve: {
      thongTinChungHopDong: ThongTinChungHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default thongTinChungHopDongRoute;
