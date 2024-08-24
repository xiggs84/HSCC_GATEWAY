import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucLoaiGiayToChungThuc, NewDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';

export type PartialUpdateDanhMucLoaiGiayToChungThuc = Partial<IDanhMucLoaiGiayToChungThuc> & Pick<IDanhMucLoaiGiayToChungThuc, 'id'>;

export type EntityResponseType = HttpResponse<IDanhMucLoaiGiayToChungThuc>;
export type EntityArrayResponseType = HttpResponse<IDanhMucLoaiGiayToChungThuc[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiGiayToChungThucService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-loai-giay-to-chung-thucs');

  create(danhMucLoaiGiayToChungThuc: NewDanhMucLoaiGiayToChungThuc): Observable<EntityResponseType> {
    return this.http.post<IDanhMucLoaiGiayToChungThuc>(this.resourceUrl, danhMucLoaiGiayToChungThuc, { observe: 'response' });
  }

  update(danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc): Observable<EntityResponseType> {
    return this.http.put<IDanhMucLoaiGiayToChungThuc>(
      `${this.resourceUrl}/${this.getDanhMucLoaiGiayToChungThucIdentifier(danhMucLoaiGiayToChungThuc)}`,
      danhMucLoaiGiayToChungThuc,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucLoaiGiayToChungThuc: PartialUpdateDanhMucLoaiGiayToChungThuc): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucLoaiGiayToChungThuc>(
      `${this.resourceUrl}/${this.getDanhMucLoaiGiayToChungThucIdentifier(danhMucLoaiGiayToChungThuc)}`,
      danhMucLoaiGiayToChungThuc,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDanhMucLoaiGiayToChungThuc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucLoaiGiayToChungThuc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucLoaiGiayToChungThucIdentifier(danhMucLoaiGiayToChungThuc: Pick<IDanhMucLoaiGiayToChungThuc, 'id'>): number {
    return danhMucLoaiGiayToChungThuc.id;
  }

  compareDanhMucLoaiGiayToChungThuc(
    o1: Pick<IDanhMucLoaiGiayToChungThuc, 'id'> | null,
    o2: Pick<IDanhMucLoaiGiayToChungThuc, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getDanhMucLoaiGiayToChungThucIdentifier(o1) === this.getDanhMucLoaiGiayToChungThucIdentifier(o2) : o1 === o2;
  }

  addDanhMucLoaiGiayToChungThucToCollectionIfMissing<Type extends Pick<IDanhMucLoaiGiayToChungThuc, 'id'>>(
    danhMucLoaiGiayToChungThucCollection: Type[],
    ...danhMucLoaiGiayToChungThucsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucLoaiGiayToChungThucs: Type[] = danhMucLoaiGiayToChungThucsToCheck.filter(isPresent);
    if (danhMucLoaiGiayToChungThucs.length > 0) {
      const danhMucLoaiGiayToChungThucCollectionIdentifiers = danhMucLoaiGiayToChungThucCollection.map(danhMucLoaiGiayToChungThucItem =>
        this.getDanhMucLoaiGiayToChungThucIdentifier(danhMucLoaiGiayToChungThucItem),
      );
      const danhMucLoaiGiayToChungThucsToAdd = danhMucLoaiGiayToChungThucs.filter(danhMucLoaiGiayToChungThucItem => {
        const danhMucLoaiGiayToChungThucIdentifier = this.getDanhMucLoaiGiayToChungThucIdentifier(danhMucLoaiGiayToChungThucItem);
        if (danhMucLoaiGiayToChungThucCollectionIdentifiers.includes(danhMucLoaiGiayToChungThucIdentifier)) {
          return false;
        }
        danhMucLoaiGiayToChungThucCollectionIdentifiers.push(danhMucLoaiGiayToChungThucIdentifier);
        return true;
      });
      return [...danhMucLoaiGiayToChungThucsToAdd, ...danhMucLoaiGiayToChungThucCollection];
    }
    return danhMucLoaiGiayToChungThucCollection;
  }
}
