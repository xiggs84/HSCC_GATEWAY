import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import DmLoaiHdResolve from './route/dm-loai-hd-routing-resolve.service';

const dmLoaiHdRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/dm-loai-hd.component').then(m => m.DmLoaiHdComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiHd/view',
    loadComponent: () => import('./detail/dm-loai-hd-detail.component').then(m => m.DmLoaiHdDetailComponent),
    resolve: {
      dmLoaiHd: DmLoaiHdResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/dm-loai-hd-update.component').then(m => m.DmLoaiHdUpdateComponent),
    resolve: {
      dmLoaiHd: DmLoaiHdResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idLoaiHd/edit',
    loadComponent: () => import('./update/dm-loai-hd-update.component').then(m => m.DmLoaiHdUpdateComponent),
    resolve: {
      dmLoaiHd: DmLoaiHdResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmLoaiHdRoute;
