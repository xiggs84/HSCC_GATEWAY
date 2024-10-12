import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DanhMucCanBoResolve from './route/danh-muc-can-bo-routing-resolve.service';

const danhMucCanBoRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-can-bo.component').then(m => m.DanhMucCanBoComponent),
    data: {
      defaultSort: `idCanBo,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idCanBo/view',
    loadComponent: () => import('./detail/danh-muc-can-bo-detail.component').then(m => m.DanhMucCanBoDetailComponent),
    resolve: {
      danhMucCanBo: DanhMucCanBoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-muc-can-bo-update.component').then(m => m.DanhMucCanBoUpdateComponent),
    resolve: {
      danhMucCanBo: DanhMucCanBoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idCanBo/edit',
    loadComponent: () => import('./update/danh-muc-can-bo-update.component').then(m => m.DanhMucCanBoUpdateComponent),
    resolve: {
      danhMucCanBo: DanhMucCanBoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucCanBoRoute;
