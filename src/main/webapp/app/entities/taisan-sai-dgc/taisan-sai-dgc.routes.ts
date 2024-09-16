import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TaisanSaiDgcResolve from './route/taisan-sai-dgc-routing-resolve.service';

const taisanSaiDgcRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/taisan-sai-dgc.component').then(m => m.TaisanSaiDgcComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/taisan-sai-dgc-detail.component').then(m => m.TaisanSaiDgcDetailComponent),
    resolve: {
      taisanSaiDgc: TaisanSaiDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/taisan-sai-dgc-update.component').then(m => m.TaisanSaiDgcUpdateComponent),
    resolve: {
      taisanSaiDgc: TaisanSaiDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/taisan-sai-dgc-update.component').then(m => m.TaisanSaiDgcUpdateComponent),
    resolve: {
      taisanSaiDgc: TaisanSaiDgcResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taisanSaiDgcRoute;
