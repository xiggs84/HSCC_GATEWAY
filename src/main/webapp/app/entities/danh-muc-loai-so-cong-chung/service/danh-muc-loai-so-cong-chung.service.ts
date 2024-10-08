import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhMucLoaiSoCongChung, NewDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';

export type PartialUpdateDanhMucLoaiSoCongChung = Partial<IDanhMucLoaiSoCongChung> & Pick<IDanhMucLoaiSoCongChung, 'idLoai'>;

export type EntityResponseType = HttpResponse<IDanhMucLoaiSoCongChung>;
export type EntityArrayResponseType = HttpResponse<IDanhMucLoaiSoCongChung[]>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiSoCongChungService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-muc-loai-so-cong-chungs');

  create(danhMucLoaiSoCongChung: NewDanhMucLoaiSoCongChung): Observable<EntityResponseType> {
    return this.http.post<IDanhMucLoaiSoCongChung>(this.resourceUrl, danhMucLoaiSoCongChung, { observe: 'response' });
  }

  update(danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung): Observable<EntityResponseType> {
    return this.http.put<IDanhMucLoaiSoCongChung>(
      `${this.resourceUrl}/${this.getDanhMucLoaiSoCongChungIdentifier(danhMucLoaiSoCongChung)}`,
      danhMucLoaiSoCongChung,
      { observe: 'response' },
    );
  }

  partialUpdate(danhMucLoaiSoCongChung: PartialUpdateDanhMucLoaiSoCongChung): Observable<EntityResponseType> {
    return this.http.patch<IDanhMucLoaiSoCongChung>(
      `${this.resourceUrl}/${this.getDanhMucLoaiSoCongChungIdentifier(danhMucLoaiSoCongChung)}`,
      danhMucLoaiSoCongChung,
      { observe: 'response' },
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDanhMucLoaiSoCongChung>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDanhMucLoaiSoCongChung[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhMucLoaiSoCongChungIdentifier(danhMucLoaiSoCongChung: Pick<IDanhMucLoaiSoCongChung, 'idLoai'>): string {
    return danhMucLoaiSoCongChung.idLoai;
  }

  compareDanhMucLoaiSoCongChung(
    o1: Pick<IDanhMucLoaiSoCongChung, 'idLoai'> | null,
    o2: Pick<IDanhMucLoaiSoCongChung, 'idLoai'> | null,
  ): boolean {
    return o1 && o2 ? this.getDanhMucLoaiSoCongChungIdentifier(o1) === this.getDanhMucLoaiSoCongChungIdentifier(o2) : o1 === o2;
  }

  addDanhMucLoaiSoCongChungToCollectionIfMissing<Type extends Pick<IDanhMucLoaiSoCongChung, 'idLoai'>>(
    danhMucLoaiSoCongChungCollection: Type[],
    ...danhMucLoaiSoCongChungsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhMucLoaiSoCongChungs: Type[] = danhMucLoaiSoCongChungsToCheck.filter(isPresent);
    if (danhMucLoaiSoCongChungs.length > 0) {
      const danhMucLoaiSoCongChungCollectionIdentifiers = danhMucLoaiSoCongChungCollection.map(danhMucLoaiSoCongChungItem =>
        this.getDanhMucLoaiSoCongChungIdentifier(danhMucLoaiSoCongChungItem),
      );
      const danhMucLoaiSoCongChungsToAdd = danhMucLoaiSoCongChungs.filter(danhMucLoaiSoCongChungItem => {
        const danhMucLoaiSoCongChungIdentifier = this.getDanhMucLoaiSoCongChungIdentifier(danhMucLoaiSoCongChungItem);
        if (danhMucLoaiSoCongChungCollectionIdentifiers.includes(danhMucLoaiSoCongChungIdentifier)) {
          return false;
        }
        danhMucLoaiSoCongChungCollectionIdentifiers.push(danhMucLoaiSoCongChungIdentifier);
        return true;
      });
      return [...danhMucLoaiSoCongChungsToAdd, ...danhMucLoaiSoCongChungCollection];
    }
    return danhMucLoaiSoCongChungCollection;
  }
}
