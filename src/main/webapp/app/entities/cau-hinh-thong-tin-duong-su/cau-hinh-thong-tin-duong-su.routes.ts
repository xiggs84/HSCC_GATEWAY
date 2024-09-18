import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CauHinhThongTinDuongSuResolve from './route/cau-hinh-thong-tin-duong-su-routing-resolve.service';

const cauHinhThongTinDuongSuRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/cau-hinh-thong-tin-duong-su.component').then(m => m.CauHinhThongTinDuongSuComponent),
    data: {
      defaultSort: `idCauHinh,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idCauHinh/view',
    loadComponent: () => import('./detail/cau-hinh-thong-tin-duong-su-detail.component').then(m => m.CauHinhThongTinDuongSuDetailComponent),
    resolve: {
      cauHinhThongTinDuongSu: CauHinhThongTinDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/cau-hinh-thong-tin-duong-su-update.component').then(m => m.CauHinhThongTinDuongSuUpdateComponent),
    resolve: {
      cauHinhThongTinDuongSu: CauHinhThongTinDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':idCauHinh/edit',
    loadComponent: () => import('./update/cau-hinh-thong-tin-duong-su-update.component').then(m => m.CauHinhThongTinDuongSuUpdateComponent),
    resolve: {
      cauHinhThongTinDuongSu: CauHinhThongTinDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhThongTinDuongSuRoute;
