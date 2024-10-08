import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CauHinhMauHopDongResolve from './route/cau-hinh-mau-hop-dong-routing-resolve.service';

const cauHinhMauHopDongRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/cau-hinh-mau-hop-dong.component').then(m => m.CauHinhMauHopDongComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/cau-hinh-mau-hop-dong-detail.component').then(m => m.CauHinhMauHopDongDetailComponent),
    resolve: {
      cauHinhMauHopDong: CauHinhMauHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/cau-hinh-mau-hop-dong-update.component').then(m => m.CauHinhMauHopDongUpdateComponent),
    resolve: {
      cauHinhMauHopDong: CauHinhMauHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/cau-hinh-mau-hop-dong-update.component').then(m => m.CauHinhMauHopDongUpdateComponent),
    resolve: {
      cauHinhMauHopDong: CauHinhMauHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhMauHopDongRoute;
