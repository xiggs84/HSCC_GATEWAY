import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import QuanHeMasterResolve from './route/quan-he-master-routing-resolve.service';

const quanHeMasterRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/quan-he-master.component').then(m => m.QuanHeMasterComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/quan-he-master-detail.component').then(m => m.QuanHeMasterDetailComponent),
    resolve: {
      quanHeMaster: QuanHeMasterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/quan-he-master-update.component').then(m => m.QuanHeMasterUpdateComponent),
    resolve: {
      quanHeMaster: QuanHeMasterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/quan-he-master-update.component').then(m => m.QuanHeMasterUpdateComponent),
    resolve: {
      quanHeMaster: QuanHeMasterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quanHeMasterRoute;
