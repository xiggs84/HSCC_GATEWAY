import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import ChungThucResolve from './route/chung-thuc-routing-resolve.service';

const chungThucRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/chung-thuc.component').then(m => m.ChungThucComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idChungThuc/view',
    loadComponent: () => import('./detail/chung-thuc-detail.component').then(m => m.ChungThucDetailComponent),
    resolve: {
      chungThuc: ChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/chung-thuc-update.component').then(m => m.ChungThucUpdateComponent),
    resolve: {
      chungThuc: ChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idChungThuc/edit',
    loadComponent: () => import('./update/chung-thuc-update.component').then(m => m.ChungThucUpdateComponent),
    resolve: {
      chungThuc: ChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default chungThucRoute;
