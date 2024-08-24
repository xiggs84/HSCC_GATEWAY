import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CauHinhMauChungThucComponent } from './list/cau-hinh-mau-chung-thuc.component';
import { CauHinhMauChungThucDetailComponent } from './detail/cau-hinh-mau-chung-thuc-detail.component';
import { CauHinhMauChungThucUpdateComponent } from './update/cau-hinh-mau-chung-thuc-update.component';
import CauHinhMauChungThucResolve from './route/cau-hinh-mau-chung-thuc-routing-resolve.service';

const cauHinhMauChungThucRoute: Routes = [
  {
    path: '',
    component: CauHinhMauChungThucComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CauHinhMauChungThucDetailComponent,
    resolve: {
      cauHinhMauChungThuc: CauHinhMauChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CauHinhMauChungThucUpdateComponent,
    resolve: {
      cauHinhMauChungThuc: CauHinhMauChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CauHinhMauChungThucUpdateComponent,
    resolve: {
      cauHinhMauChungThuc: CauHinhMauChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cauHinhMauChungThucRoute;
