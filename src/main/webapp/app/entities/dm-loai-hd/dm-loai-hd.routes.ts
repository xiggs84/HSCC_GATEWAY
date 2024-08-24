import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DmLoaiHdComponent } from './list/dm-loai-hd.component';
import { DmLoaiHdDetailComponent } from './detail/dm-loai-hd-detail.component';
import { DmLoaiHdUpdateComponent } from './update/dm-loai-hd-update.component';
import DmLoaiHdResolve from './route/dm-loai-hd-routing-resolve.service';

const dmLoaiHdRoute: Routes = [
  {
    path: '',
    component: DmLoaiHdComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DmLoaiHdDetailComponent,
    resolve: {
      dmLoaiHd: DmLoaiHdResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DmLoaiHdUpdateComponent,
    resolve: {
      dmLoaiHd: DmLoaiHdResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DmLoaiHdUpdateComponent,
    resolve: {
      dmLoaiHd: DmLoaiHdResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmLoaiHdRoute;
