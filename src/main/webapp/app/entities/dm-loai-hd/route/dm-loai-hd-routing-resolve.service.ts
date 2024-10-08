import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDmLoaiHd } from '../dm-loai-hd.model';
import { DmLoaiHdService } from '../service/dm-loai-hd.service';

const dmLoaiHdResolve = (route: ActivatedRouteSnapshot): Observable<null | IDmLoaiHd> => {
  const id = route.params.idLoaiHd;
  if (id) {
    return inject(DmLoaiHdService)
      .find(id)
      .pipe(
        mergeMap((dmLoaiHd: HttpResponse<IDmLoaiHd>) => {
          if (dmLoaiHd.body) {
            return of(dmLoaiHd.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default dmLoaiHdResolve;
