import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuanHeDuongSu } from '../quan-he-duong-su.model';
import { QuanHeDuongSuService } from '../service/quan-he-duong-su.service';

const quanHeDuongSuResolve = (route: ActivatedRouteSnapshot): Observable<null | IQuanHeDuongSu> => {
  const id = route.params.idQuanHe;
  if (id) {
    return inject(QuanHeDuongSuService)
      .find(id)
      .pipe(
        mergeMap((quanHeDuongSu: HttpResponse<IQuanHeDuongSu>) => {
          if (quanHeDuongSu.body) {
            return of(quanHeDuongSu.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default quanHeDuongSuResolve;
