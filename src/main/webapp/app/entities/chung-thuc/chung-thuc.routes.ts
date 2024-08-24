import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ChungThucComponent } from './list/chung-thuc.component';
import { ChungThucDetailComponent } from './detail/chung-thuc-detail.component';
import { ChungThucUpdateComponent } from './update/chung-thuc-update.component';
import ChungThucResolve from './route/chung-thuc-routing-resolve.service';

const chungThucRoute: Routes = [
  {
    path: '',
    component: ChungThucComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChungThucDetailComponent,
    resolve: {
      chungThuc: ChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChungThucUpdateComponent,
    resolve: {
      chungThuc: ChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChungThucUpdateComponent,
    resolve: {
      chungThuc: ChungThucResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default chungThucRoute;
