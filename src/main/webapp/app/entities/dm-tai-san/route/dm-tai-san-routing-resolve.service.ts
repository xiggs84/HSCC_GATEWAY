import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDmTaiSan } from '../dm-tai-san.model';
import { DmTaiSanService } from '../service/dm-tai-san.service';

const dmTaiSanResolve = (route: ActivatedRouteSnapshot): Observable<null | IDmTaiSan> => {
  const id = route.params.idTaiSan;
  if (id) {
    return inject(DmTaiSanService)
      .find(id)
      .pipe(
        mergeMap((dmTaiSan: HttpResponse<IDmTaiSan>) => {
          if (dmTaiSan.body) {
            return of(dmTaiSan.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default dmTaiSanResolve;
