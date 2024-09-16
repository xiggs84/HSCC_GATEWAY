import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import ThuaTachResolve from './route/thua-tach-routing-resolve.service';

const thuaTachRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/thua-tach.component').then(m => m.ThuaTachComponent),
    data: {
      defaultSort: `idThuaTach,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idThuaTach/view',
    loadComponent: () => import('./detail/thua-tach-detail.component').then(m => m.ThuaTachDetailComponent),
    resolve: {
      thuaTach: ThuaTachResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/thua-tach-update.component').then(m => m.ThuaTachUpdateComponent),
    resolve: {
      thuaTach: ThuaTachResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idThuaTach/edit',
    loadComponent: () => import('./update/thua-tach-update.component').then(m => m.ThuaTachUpdateComponent),
    resolve: {
      thuaTach: ThuaTachResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default thuaTachRoute;
