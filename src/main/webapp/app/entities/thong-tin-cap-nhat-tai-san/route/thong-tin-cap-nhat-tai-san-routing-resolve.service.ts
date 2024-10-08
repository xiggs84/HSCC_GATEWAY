import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IThongTinCapNhatTaiSan } from '../thong-tin-cap-nhat-tai-san.model';
import { ThongTinCapNhatTaiSanService } from '../service/thong-tin-cap-nhat-tai-san.service';

const thongTinCapNhatTaiSanResolve = (route: ActivatedRouteSnapshot): Observable<null | IThongTinCapNhatTaiSan> => {
  const id = route.params.idCapNhat;
  if (id) {
    return inject(ThongTinCapNhatTaiSanService)
      .find(id)
      .pipe(
        mergeMap((thongTinCapNhatTaiSan: HttpResponse<IThongTinCapNhatTaiSan>) => {
          if (thongTinCapNhatTaiSan.body) {
            return of(thongTinCapNhatTaiSan.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default thongTinCapNhatTaiSanResolve;
