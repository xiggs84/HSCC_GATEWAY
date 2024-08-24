import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SoCongChungTempComponent } from './list/so-cong-chung-temp.component';
import { SoCongChungTempDetailComponent } from './detail/so-cong-chung-temp-detail.component';
import { SoCongChungTempUpdateComponent } from './update/so-cong-chung-temp-update.component';
import SoCongChungTempResolve from './route/so-cong-chung-temp-routing-resolve.service';

const soCongChungTempRoute: Routes = [
  {
    path: '',
    component: SoCongChungTempComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SoCongChungTempDetailComponent,
    resolve: {
      soCongChungTemp: SoCongChungTempResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SoCongChungTempUpdateComponent,
    resolve: {
      soCongChungTemp: SoCongChungTempResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SoCongChungTempUpdateComponent,
    resolve: {
      soCongChungTemp: SoCongChungTempResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default soCongChungTempRoute;
