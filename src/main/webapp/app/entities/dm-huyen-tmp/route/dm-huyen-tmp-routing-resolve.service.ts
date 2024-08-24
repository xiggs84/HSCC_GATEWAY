import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDmHuyenTmp } from '../dm-huyen-tmp.model';
import { DmHuyenTmpService } from '../service/dm-huyen-tmp.service';

const dmHuyenTmpResolve = (route: ActivatedRouteSnapshot): Observable<null | IDmHuyenTmp> => {
  const id = route.params['id'];
  if (id) {
    return inject(DmHuyenTmpService)
      .find(id)
      .pipe(
        mergeMap((dmHuyenTmp: HttpResponse<IDmHuyenTmp>) => {
          if (dmHuyenTmp.body) {
            return of(dmHuyenTmp.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default dmHuyenTmpResolve;
