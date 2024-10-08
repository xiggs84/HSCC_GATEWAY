import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';
import { CauHinhMauHopDongService } from '../service/cau-hinh-mau-hop-dong.service';

const cauHinhMauHopDongResolve = (route: ActivatedRouteSnapshot): Observable<null | ICauHinhMauHopDong> => {
  const id = route.params.id;
  if (id) {
    return inject(CauHinhMauHopDongService)
      .find(id)
      .pipe(
        mergeMap((cauHinhMauHopDong: HttpResponse<ICauHinhMauHopDong>) => {
          if (cauHinhMauHopDong.body) {
            return of(cauHinhMauHopDong.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default cauHinhMauHopDongResolve;
