import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DmTinhTmpComponent } from './list/dm-tinh-tmp.component';
import { DmTinhTmpDetailComponent } from './detail/dm-tinh-tmp-detail.component';
import { DmTinhTmpUpdateComponent } from './update/dm-tinh-tmp-update.component';
import DmTinhTmpResolve from './route/dm-tinh-tmp-routing-resolve.service';

const dmTinhTmpRoute: Routes = [
  {
    path: '',
    component: DmTinhTmpComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DmTinhTmpDetailComponent,
    resolve: {
      dmTinhTmp: DmTinhTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DmTinhTmpUpdateComponent,
    resolve: {
      dmTinhTmp: DmTinhTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DmTinhTmpUpdateComponent,
    resolve: {
      dmTinhTmp: DmTinhTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmTinhTmpRoute;
