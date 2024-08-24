import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISoCongChungTemp } from '../so-cong-chung-temp.model';
import { SoCongChungTempService } from '../service/so-cong-chung-temp.service';

const soCongChungTempResolve = (route: ActivatedRouteSnapshot): Observable<null | ISoCongChungTemp> => {
  const id = route.params['id'];
  if (id) {
    return inject(SoCongChungTempService)
      .find(id)
      .pipe(
        mergeMap((soCongChungTemp: HttpResponse<ISoCongChungTemp>) => {
          if (soCongChungTemp.body) {
            return of(soCongChungTemp.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default soCongChungTempResolve;
