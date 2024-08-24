import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChungThuc } from '../chung-thuc.model';
import { ChungThucService } from '../service/chung-thuc.service';

const chungThucResolve = (route: ActivatedRouteSnapshot): Observable<null | IChungThuc> => {
  const id = route.params['id'];
  if (id) {
    return inject(ChungThucService)
      .find(id)
      .pipe(
        mergeMap((chungThuc: HttpResponse<IChungThuc>) => {
          if (chungThuc.body) {
            return of(chungThuc.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default chungThucResolve;
