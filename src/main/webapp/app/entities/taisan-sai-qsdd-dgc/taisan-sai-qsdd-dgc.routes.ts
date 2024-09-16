import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TaisanSaiQsddDgcResolve from './route/taisan-sai-qsdd-dgc-routing-resolve.service';

const taisanSaiQsddDgcRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/taisan-sai-qsdd-dgc.component').then(m => m.TaisanSaiQsddDgcComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/taisan-sai-qsdd-dgc-detail.component').then(m => m.TaisanSaiQsddDgcDetailComponent),
    resolve: {
      taisanSaiQsddDgc: TaisanSaiQsddDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/taisan-sai-qsdd-dgc-update.component').then(m => m.TaisanSaiQsddDgcUpdateComponent),
    resolve: {
      taisanSaiQsddDgc: TaisanSaiQsddDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/taisan-sai-qsdd-dgc-update.component').then(m => m.TaisanSaiQsddDgcUpdateComponent),
    resolve: {
      taisanSaiQsddDgc: TaisanSaiQsddDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taisanSaiQsddDgcRoute;
