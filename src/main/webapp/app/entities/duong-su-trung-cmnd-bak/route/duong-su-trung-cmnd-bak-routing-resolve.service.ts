import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';
import { DuongSuTrungCmndBakService } from '../service/duong-su-trung-cmnd-bak.service';

const duongSuTrungCmndBakResolve = (route: ActivatedRouteSnapshot): Observable<null | IDuongSuTrungCmndBak> => {
  const id = route.params.id;
  if (id) {
    return inject(DuongSuTrungCmndBakService)
      .find(id)
      .pipe(
        mergeMap((duongSuTrungCmndBak: HttpResponse<IDuongSuTrungCmndBak>) => {
          if (duongSuTrungCmndBak.body) {
            return of(duongSuTrungCmndBak.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default duongSuTrungCmndBakResolve;
