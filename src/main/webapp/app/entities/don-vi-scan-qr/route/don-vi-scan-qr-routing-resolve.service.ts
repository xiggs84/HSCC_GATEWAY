import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDonViScanQr } from '../don-vi-scan-qr.model';
import { DonViScanQrService } from '../service/don-vi-scan-qr.service';

const donViScanQrResolve = (route: ActivatedRouteSnapshot): Observable<null | IDonViScanQr> => {
  const id = route.params['id'];
  if (id) {
    return inject(DonViScanQrService)
      .find(id)
      .pipe(
        mergeMap((donViScanQr: HttpResponse<IDonViScanQr>) => {
          if (donViScanQr.body) {
            return of(donViScanQr.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default donViScanQrResolve;
