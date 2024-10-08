import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CauHinhHopDongResolve from './route/cau-hinh-hop-dong-routing-resolve.service';

const cauHinhHopDongRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/cau-hinh-hop-dong.component').then(m => m.CauHinhHopDongComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/cau-hinh-hop-dong-detail.component').then(m => m.CauHinhHopDongDetailComponent),
    resolve: {
      cauHinhHopDong: CauHinhHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/cau-hinh-hop-dong-update.component').then(m => m.CauHinhHopDongUpdateComponent),
    resolve: {
      cauHinhHopDong: CauHinhHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/cau-hinh-hop-dong-update.component').then(m => m.CauHinhHopDongUpdateComponent),
    resolve: {
      cauHinhHopDong: CauHinhHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhHopDongRoute;
