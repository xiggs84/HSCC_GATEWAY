import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DmHopDongComponent } from './list/dm-hop-dong.component';
import { DmHopDongDetailComponent } from './detail/dm-hop-dong-detail.component';
import { DmHopDongUpdateComponent } from './update/dm-hop-dong-update.component';
import DmHopDongResolve from './route/dm-hop-dong-routing-resolve.service';

const dmHopDongRoute: Routes = [
  {
    path: '',
    component: DmHopDongComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DmHopDongDetailComponent,
    resolve: {
      dmHopDong: DmHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DmHopDongUpdateComponent,
    resolve: {
      dmHopDong: DmHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DmHopDongUpdateComponent,
    resolve: {
      dmHopDong: DmHopDongResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmHopDongRoute;
