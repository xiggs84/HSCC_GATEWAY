import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhMucLoaiGiayToChungThucComponent } from './list/danh-muc-loai-giay-to-chung-thuc.component';
import { DanhMucLoaiGiayToChungThucDetailComponent } from './detail/danh-muc-loai-giay-to-chung-thuc-detail.component';
import { DanhMucLoaiGiayToChungThucUpdateComponent } from './update/danh-muc-loai-giay-to-chung-thuc-update.component';
import DanhMucLoaiGiayToChungThucResolve from './route/danh-muc-loai-giay-to-chung-thuc-routing-resolve.service';

const danhMucLoaiGiayToChungThucRoute: Routes = [
  {
    path: '',
    component: DanhMucLoaiGiayToChungThucComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhMucLoaiGiayToChungThucDetailComponent,
    resolve: {
      danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhMucLoaiGiayToChungThucUpdateComponent,
    resolve: {
      danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhMucLoaiGiayToChungThucUpdateComponent,
    resolve: {
      danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhMucLoaiGiayToChungThucRoute;
