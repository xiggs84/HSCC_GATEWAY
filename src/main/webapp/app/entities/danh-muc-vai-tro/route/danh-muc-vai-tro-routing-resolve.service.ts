import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucVaiTro } from '../danh-muc-vai-tro.model';
import { DanhMucVaiTroService } from '../service/danh-muc-vai-tro.service';

const danhMucVaiTroResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucVaiTro> => {
  const id = route.params.idVaiTro;
  if (id) {
    return inject(DanhMucVaiTroService)
      .find(id)
      .pipe(
        mergeMap((danhMucVaiTro: HttpResponse<IDanhMucVaiTro>) => {
          if (danhMucVaiTro.body) {
            return of(danhMucVaiTro.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default danhMucVaiTroResolve;
