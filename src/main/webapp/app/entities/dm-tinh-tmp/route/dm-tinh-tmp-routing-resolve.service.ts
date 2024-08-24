import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDmTinhTmp } from '../dm-tinh-tmp.model';
import { DmTinhTmpService } from '../service/dm-tinh-tmp.service';

const dmTinhTmpResolve = (route: ActivatedRouteSnapshot): Observable<null | IDmTinhTmp> => {
  const id = route.params['id'];
  if (id) {
    return inject(DmTinhTmpService)
      .find(id)
      .pipe(
        mergeMap((dmTinhTmp: HttpResponse<IDmTinhTmp>) => {
          if (dmTinhTmp.body) {
            return of(dmTinhTmp.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default dmTinhTmpResolve;
