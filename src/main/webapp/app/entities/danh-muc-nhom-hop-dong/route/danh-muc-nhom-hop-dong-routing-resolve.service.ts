import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';
import { DanhMucNhomHopDongService } from '../service/danh-muc-nhom-hop-dong.service';

const danhMucNhomHopDongResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucNhomHopDong> => {
  const id = route.params.idNhom;
  if (id) {
    return inject(DanhMucNhomHopDongService)
      .find(id)
      .pipe(
        mergeMap((danhMucNhomHopDong: HttpResponse<IDanhMucNhomHopDong>) => {
          if (danhMucNhomHopDong.body) {
            return of(danhMucNhomHopDong.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default danhMucNhomHopDongResolve;
