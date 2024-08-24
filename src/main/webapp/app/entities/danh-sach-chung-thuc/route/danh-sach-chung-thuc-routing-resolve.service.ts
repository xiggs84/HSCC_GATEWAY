import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhSachChungThuc } from '../danh-sach-chung-thuc.model';
import { DanhSachChungThucService } from '../service/danh-sach-chung-thuc.service';

const danhSachChungThucResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhSachChungThuc> => {
  const id = route.params['id'];
  if (id) {
    return inject(DanhSachChungThucService)
      .find(id)
      .pipe(
        mergeMap((danhSachChungThuc: HttpResponse<IDanhSachChungThuc>) => {
          if (danhSachChungThuc.body) {
            return of(danhSachChungThuc.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default danhSachChungThucResolve;
