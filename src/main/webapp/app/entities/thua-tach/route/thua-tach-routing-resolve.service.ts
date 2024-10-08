import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IThuaTach } from '../thua-tach.model';
import { ThuaTachService } from '../service/thua-tach.service';

const thuaTachResolve = (route: ActivatedRouteSnapshot): Observable<null | IThuaTach> => {
  const id = route.params.idThuaTach;
  if (id) {
    return inject(ThuaTachService)
      .find(id)
      .pipe(
        mergeMap((thuaTach: HttpResponse<IThuaTach>) => {
          if (thuaTach.body) {
            return of(thuaTach.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default thuaTachResolve;
