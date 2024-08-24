import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DuongSuTrungCmndBakComponent } from './list/duong-su-trung-cmnd-bak.component';
import { DuongSuTrungCmndBakDetailComponent } from './detail/duong-su-trung-cmnd-bak-detail.component';
import { DuongSuTrungCmndBakUpdateComponent } from './update/duong-su-trung-cmnd-bak-update.component';
import DuongSuTrungCmndBakResolve from './route/duong-su-trung-cmnd-bak-routing-resolve.service';

const duongSuTrungCmndBakRoute: Routes = [
  {
    path: '',
    component: DuongSuTrungCmndBakComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DuongSuTrungCmndBakDetailComponent,
    resolve: {
      duongSuTrungCmndBak: DuongSuTrungCmndBakResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DuongSuTrungCmndBakUpdateComponent,
    resolve: {
      duongSuTrungCmndBak: DuongSuTrungCmndBakResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DuongSuTrungCmndBakUpdateComponent,
    resolve: {
      duongSuTrungCmndBak: DuongSuTrungCmndBakResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default duongSuTrungCmndBakRoute;
