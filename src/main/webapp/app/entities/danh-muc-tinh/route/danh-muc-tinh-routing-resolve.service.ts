import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucTinh } from '../danh-muc-tinh.model';
import { DanhMucTinhService } from '../service/danh-muc-tinh.service';

const danhMucTinhResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucTinh> => {
  const id = route.params.maTinh;
  if (id) {
    return inject(DanhMucTinhService)
      .find(id)
      .pipe(
        mergeMap((danhMucTinh: HttpResponse<IDanhMucTinh>) => {
          if (danhMucTinh.body) {
            return of(danhMucTinh.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default danhMucTinhResolve;
