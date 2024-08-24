import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DmHuyenTmpComponent } from './list/dm-huyen-tmp.component';
import { DmHuyenTmpDetailComponent } from './detail/dm-huyen-tmp-detail.component';
import { DmHuyenTmpUpdateComponent } from './update/dm-huyen-tmp-update.component';
import DmHuyenTmpResolve from './route/dm-huyen-tmp-routing-resolve.service';

const dmHuyenTmpRoute: Routes = [
  {
    path: '',
    component: DmHuyenTmpComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DmHuyenTmpDetailComponent,
    resolve: {
      dmHuyenTmp: DmHuyenTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DmHuyenTmpUpdateComponent,
    resolve: {
      dmHuyenTmp: DmHuyenTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DmHuyenTmpUpdateComponent,
    resolve: {
      dmHuyenTmp: DmHuyenTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmHuyenTmpRoute;
