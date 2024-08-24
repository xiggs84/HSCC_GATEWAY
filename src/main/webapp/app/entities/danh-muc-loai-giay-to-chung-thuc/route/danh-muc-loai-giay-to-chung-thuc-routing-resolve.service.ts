import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';
import { DanhMucLoaiGiayToChungThucService } from '../service/danh-muc-loai-giay-to-chung-thuc.service';

const danhMucLoaiGiayToChungThucResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucLoaiGiayToChungThuc> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhMucLoaiGiayToChungThucService)
      .find(id)
      .pipe(
        mergeMap((danhMucLoaiGiayToChungThuc: HttpResponse<IDanhMucLoaiGiayToChungThuc>) => {
          if (danhMucLoaiGiayToChungThuc.body) {
            return of(danhMucLoaiGiayToChungThuc.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhMucLoaiGiayToChungThucResolve;
