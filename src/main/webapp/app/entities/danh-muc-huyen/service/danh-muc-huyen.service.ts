import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucHuyen, NewDanhMucHuyen } from '../danh-muc-huyen.model';

export type PartialUpdateDanhMucHuyen = Partial<IDanhMucHuyen> & Pick<IDanhMucHuyen, 'maHuyen'>;

export type EntityResponseType = HttpResponse<IDanhMucHuyen>;
export type EntityArrayResponseType = HttpResponse<IDanhMucHuyen[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucHuyenService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-huyens','canbodonvi');

  create(danhMucHuyen: NewDanhMucHuyen): Observable<EntityResponseType> {
    return this.http.post<IDanhMucHuyen>(this.resourceUrl, danhMucHuyen, { observe: 'response' });
  }

  update(danhMucHuyen: IDanhMucHuyen): Observable<EntityResponseType> {
    return this.http.put<IDanhMucHuyen>(`${this.resourceUrl}/${this.getDanhMucHuyenIdentifier(danhMucHuyen)}`, danhMucHuyen, {
      observe: 'response',
    });
  }

  partialUpdate(danhMucHuyen: PartialUpdateDanhMucHuyen): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucHuyen>(`${this.resourceUrl}/${this.getDanhMucHuyenIdentifier(danhMucHuyen)}`, danhMucHuyen, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDanhMucHuyen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucHuyen[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucHuyenIdentifier(danhMucHuyen: Pick<IDanhMucHuyen, 'maHuyen'>): string {
    return danhMucHuyen.maHuyen;
  }

  compareDanhMucHuyen(o1: Pick<IDanhMucHuyen, 'maHuyen'> | null, o2: Pick<IDanhMucHuyen, 'maHuyen'> | null): boolean {
    return o1 && o2 ? this.getDanhMucHuyenIdentifier(o1) === this.getDanhMucHuyenIdentifier(o2) : o1 === o2;
  }

  addDanhMucHuyenToCollectionIfMissing<Type extends Pick<IDanhMucHuyen, 'maHuyen'>>(
    danhMucHuyenCollection: Type[],
    ...danhMucHuyensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucHuyens: Type[] = danhMucHuyensToCheck.filter(isPresent);
    if (danhMucHuyens.length > 0) {
      const danhMucHuyenCollectionIdentifiers = danhMucHuyenCollection.map(danhMucHuyenItem =>
        this.getDanhMucHuyenIdentifier(danhMucHuyenItem),
      );
      const danhMucHuyensToAdd = danhMucHuyens.filter(danhMucHuyenItem => {
        const danhMucHuyenIdentifier = this.getDanhMucHuyenIdentifier(danhMucHuyenItem);
        if (danhMucHuyenCollectionIdentifiers.includes(danhMucHuyenIdentifier)) {
          return false;
        }
        danhMucHuyenCollectionIdentifiers.push(danhMucHuyenIdentifier);
        return true;
      });
      return [...danhMucHuyensToAdd, ...danhMucHuyenCollection];
    }
    return danhMucHuyenCollection;
  }

  getQuanHuyenByTinh(maTinh: string): Observable<EntityArrayResponseType> {
    return this.http.get<IDanhMucHuyen[]>(`${this.resourceUrl}/by-ma-tinh/${maTinh}`, {
      observe: 'response',
    });
  }
}
