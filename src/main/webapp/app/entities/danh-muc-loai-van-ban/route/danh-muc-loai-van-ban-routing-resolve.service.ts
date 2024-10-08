import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDanhMucLoaiVanBan } from '../danh-muc-loai-van-ban.model';
import { DanhMucLoaiVanBanService } from '../service/danh-muc-loai-van-ban.service';

const danhMucLoaiVanBanResolve = (route: ActivatedRouteSnapshot): Observable<null | IDanhMucLoaiVanBan> => {
  const id = route.params.idLoaiVb;
  if (id) {
    return inject(DanhMucLoaiVanBanService)
      .find(id)
      .pipe(
        mergeMap((danhMucLoaiVanBan: HttpResponse<IDanhMucLoaiVanBan>) => {
          if (danhMucLoaiVanBan.body) {
            return of(danhMucLoaiVanBan.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default danhMucLoaiVanBanResolve;
