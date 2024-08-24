import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDmDuongSu } from '../dm-duong-su.model';
import { DmDuongSuService } from '../service/dm-duong-su.service';

const dmDuongSuResolve = (route: ActivatedRouteSnapshot): Observable<null | IDmDuongSu> => {
  const id = route.params['id'];
  if (id) {
    return inject(DmDuongSuService)
      .find(id)
      .pipe(
        mergeMap((dmDuongSu: HttpResponse<IDmDuongSu>) => {
          if (dmDuongSu.body) {
            return of(dmDuongSu.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default dmDuongSuResolve;
