import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DmDuongSuResolve from './route/dm-duong-su-routing-resolve.service';

const dmDuongSuRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/dm-duong-su.component').then(m => m.DmDuongSuComponent),
    data: {
      defaultSort: `idDuongSu,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idDuongSu/view',
    loadComponent: () => import('./detail/dm-duong-su-detail.component').then(m => m.DmDuongSuDetailComponent),
    resolve: {
      dmDuongSu: DmDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/dm-duong-su-update.component').then(m => m.DmDuongSuUpdateComponent),
    resolve: {
      dmDuongSu: DmDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idDuongSu/edit',
    loadComponent: () => import('./update/dm-duong-su-update.component').then(m => m.DmDuongSuUpdateComponent),
    resolve: {
      dmDuongSu: DmDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmDuongSuRoute;
