import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DuongSuTrungCmndBakResolve from './route/duong-su-trung-cmnd-bak-routing-resolve.service';

const duongSuTrungCmndBakRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/duong-su-trung-cmnd-bak.component').then(m => m.DuongSuTrungCmndBakComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/duong-su-trung-cmnd-bak-detail.component').then(m => m.DuongSuTrungCmndBakDetailComponent),
    resolve: {
      duongSuTrungCmndBak: DuongSuTrungCmndBakResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/duong-su-trung-cmnd-bak-update.component').then(m => m.DuongSuTrungCmndBakUpdateComponent),
    resolve: {
      duongSuTrungCmndBak: DuongSuTrungCmndBakResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/duong-su-trung-cmnd-bak-update.component').then(m => m.DuongSuTrungCmndBakUpdateComponent),
    resolve: {
      duongSuTrungCmndBak: DuongSuTrungCmndBakResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default duongSuTrungCmndBakRoute;
