import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DuongSuTrungCmndResolve from './route/duong-su-trung-cmnd-routing-resolve.service';

const duongSuTrungCmndRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/duong-su-trung-cmnd.component').then(m => m.DuongSuTrungCmndComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/duong-su-trung-cmnd-detail.component').then(m => m.DuongSuTrungCmndDetailComponent),
    resolve: {
      duongSuTrungCmnd: DuongSuTrungCmndResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/duong-su-trung-cmnd-update.component').then(m => m.DuongSuTrungCmndUpdateComponent),
    resolve: {
      duongSuTrungCmnd: DuongSuTrungCmndResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/duong-su-trung-cmnd-update.component').then(m => m.DuongSuTrungCmndUpdateComponent),
    resolve: {
      duongSuTrungCmnd: DuongSuTrungCmndResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default duongSuTrungCmndRoute;
