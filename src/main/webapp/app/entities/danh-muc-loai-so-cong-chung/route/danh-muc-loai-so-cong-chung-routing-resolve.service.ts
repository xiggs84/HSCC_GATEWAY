import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';
import { DanhMucLoaiSoCongChungService } from '../service/danh-muc-loai-so-cong-chung.service';

const danhMucLoaiSoCongChungResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucLoaiSoCongChung> => {
  const id = route.params.idLoai;
  if (id) {
    return inject(DanhMucLoaiSoCongChungService)
      .find(id)
      .pipe(
        mergeMap((danhMucLoaiSoCongChung: HttpResponse<IDanhMucLoaiSoCongChung>) => {
          if (danhMucLoaiSoCongChung.body) {
            return of(danhMucLoaiSoCongChung.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default danhMucLoaiSoCongChungResolve;
