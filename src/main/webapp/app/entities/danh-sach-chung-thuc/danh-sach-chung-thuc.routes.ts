import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DanhSachChungThucComponent } from './list/danh-sach-chung-thuc.component';
import { DanhSachChungThucDetailComponent } from './detail/danh-sach-chung-thuc-detail.component';
import { DanhSachChungThucUpdateComponent } from './update/danh-sach-chung-thuc-update.component';
import DanhSachChungThucResolve from './route/danh-sach-chung-thuc-routing-resolve.service';

const danhSachChungThucRoute: Routes = [
  {
    path: '',
    component: DanhSachChungThucComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DanhSachChungThucDetailComponent,
    resolve: {
      danhSachChungThuc: DanhSachChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DanhSachChungThucUpdateComponent,
    resolve: {
      danhSachChungThuc: DanhSachChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DanhSachChungThucUpdateComponent,
    resolve: {
      danhSachChungThuc: DanhSachChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default danhSachChungThucRoute;
