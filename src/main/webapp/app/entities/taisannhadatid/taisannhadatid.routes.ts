import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TaisannhadatidResolve from './route/taisannhadatid-routing-resolve.service';

const taisannhadatidRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/taisannhadatid.component').then(m => m.TaisannhadatidComponent),
    data: {
      defaultSort: `idTaiSan,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idTaiSan/view',
    loadComponent: () => import('./detail/taisannhadatid-detail.component').then(m => m.TaisannhadatidDetailComponent),
    resolve: {
      taisannhadatid: TaisannhadatidResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/taisannhadatid-update.component').then(m => m.TaisannhadatidUpdateComponent),
    resolve: {
      taisannhadatid: TaisannhadatidResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idTaiSan/edit',
    loadComponent: () => import('./update/taisannhadatid-update.component').then(m => m.TaisannhadatidUpdateComponent),
    resolve: {
      taisannhadatid: TaisannhadatidResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taisannhadatidRoute;
