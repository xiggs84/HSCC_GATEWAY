import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaisanSaiQsddDgc } from '../taisan-sai-qsdd-dgc.model';
import { TaisanSaiQsddDgcService } from '../service/taisan-sai-qsdd-dgc.service';

const taisanSaiQsddDgcResolve = (route: ActivatedRouteSnapshot): Observable<null | ITaisanSaiQsddDgc> => {
  const id = route.params.id;
  if (id) {
    return inject(TaisanSaiQsddDgcService)
      .find(id)
      .pipe(
        mergeMap((taisanSaiQsddDgc: HttpResponse<ITaisanSaiQsddDgc>) => {
          if (taisanSaiQsddDgc.body) {
            return of(taisanSaiQsddDgc.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default taisanSaiQsddDgcResolve;
