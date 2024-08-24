import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DonViScanQrComponent } from './list/don-vi-scan-qr.component';
import { DonViScanQrDetailComponent } from './detail/don-vi-scan-qr-detail.component';
import { DonViScanQrUpdateComponent } from './update/don-vi-scan-qr-update.component';
import DonViScanQrResolve from './route/don-vi-scan-qr-routing-resolve.service';

const donViScanQrRoute: Routes = [
  {
    path: '',
    component: DonViScanQrComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DonViScanQrDetailComponent,
    resolve: {
      donViScanQr: DonViScanQrResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DonViScanQrUpdateComponent,
    resolve: {
      donViScanQr: DonViScanQrResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DonViScanQrUpdateComponent,
    resolve: {
      donViScanQr: DonViScanQrResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default donViScanQrRoute;
