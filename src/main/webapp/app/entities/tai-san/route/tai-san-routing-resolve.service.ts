import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaiSan } from '../tai-san.model';
import { TaiSanService } from '../service/tai-san.service';

const taiSanResolve = (route: ActivatedRouteSnapshot): Observable<null | ITaiSan> => {
  const id = route.params.idTaiSan;
  if (id) {
    return inject(TaiSanService)
      .find(id)
      .pipe(
        mergeMap((taiSan: HttpResponse<ITaiSan>) => {
          if (taiSan.body) {
            return of(taiSan.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default taiSanResolve;
