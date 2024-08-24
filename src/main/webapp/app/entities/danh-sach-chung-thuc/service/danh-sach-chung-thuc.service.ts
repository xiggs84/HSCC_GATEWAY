import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDanhSachChungThuc, NewDanhSachChungThuc } from '../danh-sach-chung-thuc.model';

export type PartialUpdateDanhSachChungThuc = Partial<IDanhSachChungThuc> & Pick<IDanhSachChungThuc, 'id'>;

type RestOf<T extends IDanhSachChungThuc | NewDanhSachChungThuc> = Omit<T, 'ngayChungThuc' | 'ngayThaoTac'> & {
  ngayChungThuc?: string | null;
  ngayThaoTac?: string | null;
};

export type RestDanhSachChungThuc = RestOf<IDanhSachChungThuc>;

export type NewRestDanhSachChungThuc = RestOf<NewDanhSachChungThuc>;

export type PartialUpdateRestDanhSachChungThuc = RestOf<PartialUpdateDanhSachChungThuc>;

export type EntityResponseType = HttpResponse<IDanhSachChungThuc>;
export type EntityArrayResponseType = HttpResponse<IDanhSachChungThuc[]>;

@Injectable({ providedIn: 'root' })
export class DanhSachChungThucService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/danh-sach-chung-thucs');

  create(danhSachChungThuc: NewDanhSachChungThuc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachChungThuc);
    return this.http
      .post<RestDanhSachChungThuc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(danhSachChungThuc: IDanhSachChungThuc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachChungThuc);
    return this.http
      .put<RestDanhSachChungThuc>(`${this.resourceUrl}/${this.getDanhSachChungThucIdentifier(danhSachChungThuc)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(danhSachChungThuc: PartialUpdateDanhSachChungThuc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(danhSachChungThuc);
    return this.http
      .patch<RestDanhSachChungThuc>(`${this.resourceUrl}/${this.getDanhSachChungThucIdentifier(danhSachChungThuc)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDanhSachChungThuc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDanhSachChungThuc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDanhSachChungThucIdentifier(danhSachChungThuc: Pick<IDanhSachChungThuc, 'id'>): number {
    return danhSachChungThuc.id;
  }

  compareDanhSachChungThuc(o1: Pick<IDanhSachChungThuc, 'id'> | null, o2: Pick<IDanhSachChungThuc, 'id'> | null): boolean {
    return o1 && o2 ? this.getDanhSachChungThucIdentifier(o1) === this.getDanhSachChungThucIdentifier(o2) : o1 === o2;
  }

  addDanhSachChungThucToCollectionIfMissing<Type extends Pick<IDanhSachChungThuc, 'id'>>(
    danhSachChungThucCollection: Type[],
    ...danhSachChungThucsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const danhSachChungThucs: Type[] = danhSachChungThucsToCheck.filter(isPresent);
    if (danhSachChungThucs.length > 0) {
      const danhSachChungThucCollectionIdentifiers = danhSachChungThucCollection.map(danhSachChungThucItem =>
        this.getDanhSachChungThucIdentifier(danhSachChungThucItem),
      );
      const danhSachChungThucsToAdd = danhSachChungThucs.filter(danhSachChungThucItem => {
        const danhSachChungThucIdentifier = this.getDanhSachChungThucIdentifier(danhSachChungThucItem);
        if (danhSachChungThucCollectionIdentifiers.includes(danhSachChungThucIdentifier)) {
          return false;
        }
        danhSachChungThucCollectionIdentifiers.push(danhSachChungThucIdentifier);
        return true;
      });
      return [...danhSachChungThucsToAdd, ...danhSachChungThucCollection];
    }
    return danhSachChungThucCollection;
  }

  protected convertDateFromClient<T extends IDanhSachChungThuc | NewDanhSachChungThuc | PartialUpdateDanhSachChungThuc>(
    danhSachChungThuc: T,
  ): RestOf<T> {
    return {
      ...danhSachChungThuc,
      ngayChungThuc: danhSachChungThuc.ngayChungThuc?.format(DATE_FORMAT) ?? null,
      ngayThaoTac: danhSachChungThuc.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDanhSachChungThuc: RestDanhSachChungThuc): IDanhSachChungThuc {
    return {
      ...restDanhSachChungThuc,
      ngayChungThuc: restDanhSachChungThuc.ngayChungThuc ? dayjs(restDanhSachChungThuc.ngayChungThuc) : undefined,
      ngayThaoTac: restDanhSachChungThuc.ngayThaoTac ? dayjs(restDanhSachChungThuc.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDanhSachChungThuc>): HttpResponse<IDanhSachChungThuc> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDanhSachChungThuc[]>): HttpResponse<IDanhSachChungThuc[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
