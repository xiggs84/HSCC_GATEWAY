import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CauHinhMauChungThucResolve from './route/cau-hinh-mau-chung-thuc-routing-resolve.service';

const cauHinhMauChungThucRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/cau-hinh-mau-chung-thuc.component').then(m => m.CauHinhMauChungThucComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/cau-hinh-mau-chung-thuc-detail.component').then(m => m.CauHinhMauChungThucDetailComponent),
    resolve: {
      cauHinhMauChungThuc: CauHinhMauChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/cau-hinh-mau-chung-thuc-update.component').then(m => m.CauHinhMauChungThucUpdateComponent),
    resolve: {
      cauHinhMauChungThuc: CauHinhMauChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/cau-hinh-mau-chung-thuc-update.component').then(m => m.CauHinhMauChungThucUpdateComponent),
    resolve: {
      cauHinhMauChungThuc: CauHinhMauChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhMauChungThucRoute;
