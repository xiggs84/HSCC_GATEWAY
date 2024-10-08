import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from '../service/danh-muc-loai-tai-san.service';

const danhMucLoaiTaiSanResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucLoaiTaiSan> => {
  const id = route.params.idLoaiTs;
  if (id) {
    return inject(DanhMucLoaiTaiSanService)
      .find(id)
      .pipe(
        mergeMap((danhMucLoaiTaiSan: HttpResponse<IDanhMucLoaiTaiSan>) => {
          if (danhMucLoaiTaiSan.body) {
            return of(danhMucLoaiTaiSan.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default danhMucLoaiTaiSanResolve;
