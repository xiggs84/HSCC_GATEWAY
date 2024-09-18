import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import QuanHeDuongSuResolve from './route/quan-he-duong-su-routing-resolve.service';

const quanHeDuongSuRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/quan-he-duong-su.component').then(m => m.QuanHeDuongSuComponent),
    data: {
      defaultSort: `idQuanHe,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idQuanHe/view',
    loadComponent: () => import('./detail/quan-he-duong-su-detail.component').then(m => m.QuanHeDuongSuDetailComponent),
    resolve: {
      quanHeDuongSu: QuanHeDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/quan-he-duong-su-update.component').then(m => m.QuanHeDuongSuUpdateComponent),
    resolve: {
      quanHeDuongSu: QuanHeDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idQuanHe/edit',
    loadComponent: () => import('./update/quan-he-duong-su-update.component').then(m => m.QuanHeDuongSuUpdateComponent),
    resolve: {
      quanHeDuongSu: QuanHeDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quanHeDuongSuRoute;
