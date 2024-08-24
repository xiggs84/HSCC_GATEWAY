import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DmTaiSanComponent } from './list/dm-tai-san.component';
import { DmTaiSanDetailComponent } from './detail/dm-tai-san-detail.component';
import { DmTaiSanUpdateComponent } from './update/dm-tai-san-update.component';
import DmTaiSanResolve from './route/dm-tai-san-routing-resolve.service';

const dmTaiSanRoute: Routes = [
  {
    path: '',
    component: DmTaiSanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DmTaiSanDetailComponent,
    resolve: {
      dmTaiSan: DmTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DmTaiSanUpdateComponent,
    resolve: {
      dmTaiSan: DmTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DmTaiSanUpdateComponent,
    resolve: {
      dmTaiSan: DmTaiSanResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmTaiSanRoute;
