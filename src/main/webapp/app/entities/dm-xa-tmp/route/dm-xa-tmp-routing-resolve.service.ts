import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDmXaTmp } from '../dm-xa-tmp.model';
import { DmXaTmpService } from '../service/dm-xa-tmp.service';

const dmXaTmpResolve = (route: ActivatedRouteSnapshot): Observable<null | IDmXaTmp> => {
  const id = route.params['id'];
  if (id) {
    return inject(DmXaTmpService)
      .find(id)
      .pipe(
        mergeMap((dmXaTmp: HttpResponse<IDmXaTmp>) => {
          if (dmXaTmp.body) {
            return of(dmXaTmp.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default dmXaTmpResolve;
