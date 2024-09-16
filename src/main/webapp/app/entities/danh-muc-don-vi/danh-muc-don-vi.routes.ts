import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DanhMucDonViResolve from './route/danh-muc-don-vi-routing-resolve.service';

const danhMucDonViRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/danh-muc-don-vi.component').then(m => m.DanhMucDonViComponent),
    data: {
      defaultSort: `idDonVi,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idDonVi/view',
    loadComponent: () => import('./detail/danh-muc-don-vi-detail.component').then(m => m.DanhMucDonViDetailComponent),
    resolve: {
      danhMucDonVi: DanhMucDonViResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/danh-muc-don-vi-update.component').then(m => m.DanhMucDonViUpdateComponent),
    resolve: {
      danhMucDonVi: DanhMucDonViResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idDonVi/edit',
    loadComponent: () => import('./update/danh-muc-don-vi-update.component').then(m => m.DanhMucDonViUpdateComponent),
    resolve: {
      danhMucDonVi: DanhMucDonViResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucDonViRoute;
