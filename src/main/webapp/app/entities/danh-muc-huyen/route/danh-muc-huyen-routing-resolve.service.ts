import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucHuyen } from '../danh-muc-huyen.model';
import { DanhMucHuyenService } from '../service/danh-muc-huyen.service';

const danhMucHuyenResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucHuyen> => {
  const id = route.params.maHuyen;
  if (id) {
    return inject(DanhMucHuyenService)
      .find(id)
      .pipe(
        mergeMap((danhMucHuyen: HttpResponse<IDanhMucHuyen>) => {
          if (danhMucHuyen.body) {
            return of(danhMucHuyen.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default danhMucHuyenResolve;
