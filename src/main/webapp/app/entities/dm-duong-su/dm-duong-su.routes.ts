import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DmDuongSuComponent } from './list/dm-duong-su.component';
import { DmDuongSuDetailComponent } from './detail/dm-duong-su-detail.component';
import { DmDuongSuUpdateComponent } from './update/dm-duong-su-update.component';
import DmDuongSuResolve from './route/dm-duong-su-routing-resolve.service';

const dmDuongSuRoute: Routes = [
  {
    path: '',
    component: DmDuongSuComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DmDuongSuDetailComponent,
    resolve: {
      dmDuongSu: DmDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DmDuongSuUpdateComponent,
    resolve: {
      dmDuongSu: DmDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DmDuongSuUpdateComponent,
    resolve: {
      dmDuongSu: DmDuongSuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmDuongSuRoute;
