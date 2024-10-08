import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DmHopDongResolve from './route/dm-hop-dong-routing-resolve.service';

const dmHopDongRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/dm-hop-dong.component').then(m => m.DmHopDongComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idHopDong/view',
    loadComponent: () => import('./detail/dm-hop-dong-detail.component').then(m => m.DmHopDongDetailComponent),
    resolve: {
      dmHopDong: DmHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/dm-hop-dong-update.component').then(m => m.DmHopDongUpdateComponent),
    resolve: {
      dmHopDong: DmHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idHopDong/edit',
    loadComponent: () => import('./update/dm-hop-dong-update.component').then(m => m.DmHopDongUpdateComponent),
    resolve: {
      dmHopDong: DmHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmHopDongRoute;
