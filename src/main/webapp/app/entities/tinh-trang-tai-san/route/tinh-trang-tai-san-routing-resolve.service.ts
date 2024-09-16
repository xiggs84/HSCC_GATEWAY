import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITinhTrangTaiSan } from '../tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from '../service/tinh-trang-tai-san.service';

const tinhTrangTaiSanResolve = (route: ActivatedRouteSnapshot): Observable<null | ITinhTrangTaiSan> => {
  const id = route.params.idTinhTrang;
  if (id) {
    return inject(TinhTrangTaiSanService)
      .find(id)
      .pipe(
        mergeMap((tinhTrangTaiSan: HttpResponse<ITinhTrangTaiSan>) => {
          if (tinhTrangTaiSan.body) {
            return of(tinhTrangTaiSan.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default tinhTrangTaiSanResolve;
