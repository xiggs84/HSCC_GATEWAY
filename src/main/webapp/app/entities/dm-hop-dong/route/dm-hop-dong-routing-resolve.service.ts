import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDmHopDong } from '../dm-hop-dong.model';
import { DmHopDongService } from '../service/dm-hop-dong.service';

const dmHopDongResolve = (route: ActivatedRouteSnapshot): Observable<null | IDmHopDong> => {
  const id = route.params.idHopDong;
  if (id) {
    return inject(DmHopDongService)
      .find(id)
      .pipe(
        mergeMap((dmHopDong: HttpResponse<IDmHopDong>) => {
          if (dmHopDong.body) {
            return of(dmHopDong.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default dmHopDongResolve;
