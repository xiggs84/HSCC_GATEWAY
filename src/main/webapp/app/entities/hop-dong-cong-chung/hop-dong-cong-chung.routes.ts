import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import HopDongCongChungResolve from './route/hop-dong-cong-chung-routing-resolve.service';

const hopDongCongChungRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/hop-dong-cong-chung.component').then(m => m.HopDongCongChungComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idHopDong/view',
    loadComponent: () => import('./detail/hop-dong-cong-chung-detail.component').then(m => m.HopDongCongChungDetailComponent),
    resolve: {
      hopDongCongChung: HopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/hop-dong-cong-chung-update.component').then(m => m.HopDongCongChungUpdateComponent),
    resolve: {
      hopDongCongChung: HopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idHopDong/edit',
    loadComponent: () => import('./update/hop-dong-cong-chung-update.component').then(m => m.HopDongCongChungUpdateComponent),
    resolve: {
      hopDongCongChung: HopDongCongChungResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default hopDongCongChungRoute;
