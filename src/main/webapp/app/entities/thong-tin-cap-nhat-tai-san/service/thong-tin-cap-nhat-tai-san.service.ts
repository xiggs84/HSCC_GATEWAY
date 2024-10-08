import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IThongTinCapNhatTaiSan, NewThongTinCapNhatTaiSan } from '../thong-tin-cap-nhat-tai-san.model';

export type PartialUpdateThongTinCapNhatTaiSan = Partial<IThongTinCapNhatTaiSan> & Pick<IThongTinCapNhatTaiSan, 'idCapNhat'>;

type RestOf<T extends IThongTinCapNhatTaiSan | NewThongTinCapNhatTaiSan> = Omit<T, 'ngayCapNhat'> & {
  ngayCapNhat?: string | null;
};

export type RestThongTinCapNhatTaiSan = RestOf<IThongTinCapNhatTaiSan>;

export type NewRestThongTinCapNhatTaiSan = RestOf<NewThongTinCapNhatTaiSan>;

export type PartialUpdateRestThongTinCapNhatTaiSan = RestOf<PartialUpdateThongTinCapNhatTaiSan>;

export type EntityResponseType = HttpResponse<IThongTinCapNhatTaiSan>;
export type EntityArrayResponseType = HttpResponse<IThongTinCapNhatTaiSan[]>;

@Injectable({ providedIn: 'root' })
export class ThongTinCapNhatTaiSanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/thong-tin-cap-nhat-tai-sans', 'taisan');

  create(thongTinCapNhatTaiSan: NewThongTinCapNhatTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thongTinCapNhatTaiSan);
    return this.http
      .post<RestThongTinCapNhatTaiSan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(thongTinCapNhatTaiSan: IThongTinCapNhatTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thongTinCapNhatTaiSan);
    return this.http
      .put<RestThongTinCapNhatTaiSan>(`${this.resourceUrl}/${this.getThongTinCapNhatTaiSanIdentifier(thongTinCapNhatTaiSan)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(thongTinCapNhatTaiSan: PartialUpdateThongTinCapNhatTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thongTinCapNhatTaiSan);
    return this.http
      .patch<RestThongTinCapNhatTaiSan>(`${this.resourceUrl}/${this.getThongTinCapNhatTaiSanIdentifier(thongTinCapNhatTaiSan)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestThongTinCapNhatTaiSan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestThongTinCapNhatTaiSan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getThongTinCapNhatTaiSanIdentifier(thongTinCapNhatTaiSan: Pick<IThongTinCapNhatTaiSan, 'idCapNhat'>): number {
    return thongTinCapNhatTaiSan.idCapNhat;
  }

  compareThongTinCapNhatTaiSan(
    o1: Pick<IThongTinCapNhatTaiSan, 'idCapNhat'> | null,
    o2: Pick<IThongTinCapNhatTaiSan, 'idCapNhat'> | null,
  ): boolean {
    return o1 && o2 ? this.getThongTinCapNhatTaiSanIdentifier(o1) === this.getThongTinCapNhatTaiSanIdentifier(o2) : o1 === o2;
  }

  addThongTinCapNhatTaiSanToCollectionIfMissing<Type extends Pick<IThongTinCapNhatTaiSan, 'idCapNhat'>>(
    thongTinCapNhatTaiSanCollection: Type[],
    ...thongTinCapNhatTaiSansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const thongTinCapNhatTaiSans: Type[] = thongTinCapNhatTaiSansToCheck.filter(isPresent);
    if (thongTinCapNhatTaiSans.length > 0) {
      const thongTinCapNhatTaiSanCollectionIdentifiers = thongTinCapNhatTaiSanCollection.map(thongTinCapNhatTaiSanItem =>
        this.getThongTinCapNhatTaiSanIdentifier(thongTinCapNhatTaiSanItem),
      );
      const thongTinCapNhatTaiSansToAdd = thongTinCapNhatTaiSans.filter(thongTinCapNhatTaiSanItem => {
        const thongTinCapNhatTaiSanIdentifier = this.getThongTinCapNhatTaiSanIdentifier(thongTinCapNhatTaiSanItem);
        if (thongTinCapNhatTaiSanCollectionIdentifiers.includes(thongTinCapNhatTaiSanIdentifier)) {
          return false;
        }
        thongTinCapNhatTaiSanCollectionIdentifiers.push(thongTinCapNhatTaiSanIdentifier);
        return true;
      });
      return [...thongTinCapNhatTaiSansToAdd, ...thongTinCapNhatTaiSanCollection];
    }
    return thongTinCapNhatTaiSanCollection;
  }

  protected convertDateFromClient<T extends IThongTinCapNhatTaiSan | NewThongTinCapNhatTaiSan | PartialUpdateThongTinCapNhatTaiSan>(
    thongTinCapNhatTaiSan: T,
  ): RestOf<T> {
    return {
      ...thongTinCapNhatTaiSan,
      ngayCapNhat: thongTinCapNhatTaiSan.ngayCapNhat?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restThongTinCapNhatTaiSan: RestThongTinCapNhatTaiSan): IThongTinCapNhatTaiSan {
    return {
      ...restThongTinCapNhatTaiSan,
      ngayCapNhat: restThongTinCapNhatTaiSan.ngayCapNhat ? dayjs(restThongTinCapNhatTaiSan.ngayCapNhat) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestThongTinCapNhatTaiSan>): HttpResponse<IThongTinCapNhatTaiSan> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestThongTinCapNhatTaiSan[]>): HttpResponse<IThongTinCapNhatTaiSan[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
