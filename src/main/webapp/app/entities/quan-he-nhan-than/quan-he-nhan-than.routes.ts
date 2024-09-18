import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import QuanHeNhanThanResolve from './route/quan-he-nhan-than-routing-resolve.service';

const quanHeNhanThanRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/quan-he-nhan-than.component').then(m => m.QuanHeNhanThanComponent),
    data: {
      defaultSort: `idQuanHe,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idQuanHe/view',
    loadComponent: () => import('./detail/quan-he-nhan-than-detail.component').then(m => m.QuanHeNhanThanDetailComponent),
    resolve: {
      quanHeNhanThan: QuanHeNhanThanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/quan-he-nhan-than-update.component').then(m => m.QuanHeNhanThanUpdateComponent),
    resolve: {
      quanHeNhanThan: QuanHeNhanThanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idQuanHe/edit',
    loadComponent: () => import('./update/quan-he-nhan-than-update.component').then(m => m.QuanHeNhanThanUpdateComponent),
    resolve: {
      quanHeNhanThan: QuanHeNhanThanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quanHeNhanThanRoute;
