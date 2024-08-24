import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DmXaTmpComponent } from './list/dm-xa-tmp.component';
import { DmXaTmpDetailComponent } from './detail/dm-xa-tmp-detail.component';
import { DmXaTmpUpdateComponent } from './update/dm-xa-tmp-update.component';
import DmXaTmpResolve from './route/dm-xa-tmp-routing-resolve.service';

const dmXaTmpRoute: Routes = [
  {
    path: '',
    component: DmXaTmpComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DmXaTmpDetailComponent,
    resolve: {
      dmXaTmp: DmXaTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DmXaTmpUpdateComponent,
    resolve: {
      dmXaTmp: DmXaTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DmXaTmpUpdateComponent,
    resolve: {
      dmXaTmp: DmXaTmpResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dmXaTmpRoute;
