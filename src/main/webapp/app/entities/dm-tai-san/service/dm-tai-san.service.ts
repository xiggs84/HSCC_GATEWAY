import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDmTaiSan, NewDmTaiSan } from '../dm-tai-san.model';

export type PartialUpdateDmTaiSan = Partial<IDmTaiSan> & Pick<IDmTaiSan, 'idTaiSan'>;

type RestOf<T extends IDmTaiSan | NewDmTaiSan> = Omit<T, 'ngayThaoTac' | 'ngayBdNganChan' | 'ngayKtNganChan'> & {
  ngayThaoTac?: string | null;
  ngayBdNganChan?: string | null;
  ngayKtNganChan?: string | null;
};

export type RestDmTaiSan = RestOf<IDmTaiSan>;

export type NewRestDmTaiSan = RestOf<NewDmTaiSan>;

export type PartialUpdateRestDmTaiSan = RestOf<PartialUpdateDmTaiSan>;

export type EntityResponseType = HttpResponse<IDmTaiSan>;
export type EntityArrayResponseType = HttpResponse<IDmTaiSan[]>;

@Injectable({ providedIn: 'root' })
export class DmTaiSanService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dm-tai-sans');

  create(dmTaiSan: NewDmTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmTaiSan);
    return this.http
      .post<RestDmTaiSan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(dmTaiSan: IDmTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmTaiSan);
    return this.http
      .put<RestDmTaiSan>(`${this.resourceUrl}/${this.getDmTaiSanIdentifier(dmTaiSan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(dmTaiSan: PartialUpdateDmTaiSan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmTaiSan);
    return this.http
      .patch<RestDmTaiSan>(`${this.resourceUrl}/${this.getDmTaiSanIdentifier(dmTaiSan)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDmTaiSan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDmTaiSan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDmTaiSanIdentifier(dmTaiSan: Pick<IDmTaiSan, 'idTaiSan'>): number {
    return dmTaiSan.idTaiSan;
  }

  compareDmTaiSan(o1: Pick<IDmTaiSan, 'idTaiSan'> | null, o2: Pick<IDmTaiSan, 'idTaiSan'> | null): boolean {
    return o1 && o2 ? this.getDmTaiSanIdentifier(o1) === this.getDmTaiSanIdentifier(o2) : o1 === o2;
  }

  addDmTaiSanToCollectionIfMissing<Type extends Pick<IDmTaiSan, 'idTaiSan'>>(
    dmTaiSanCollection: Type[],
    ...dmTaiSansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dmTaiSans: Type[] = dmTaiSansToCheck.filter(isPresent);
    if (dmTaiSans.length > 0) {
      const dmTaiSanCollectionIdentifiers = dmTaiSanCollection.map(dmTaiSanItem => this.getDmTaiSanIdentifier(dmTaiSanItem));
      const dmTaiSansToAdd = dmTaiSans.filter(dmTaiSanItem => {
        const dmTaiSanIdentifier = this.getDmTaiSanIdentifier(dmTaiSanItem);
        if (dmTaiSanCollectionIdentifiers.includes(dmTaiSanIdentifier)) {
          return false;
        }
        dmTaiSanCollectionIdentifiers.push(dmTaiSanIdentifier);
        return true;
      });
      return [...dmTaiSansToAdd, ...dmTaiSanCollection];
    }
    return dmTaiSanCollection;
  }

  protected convertDateFromClient<T extends IDmTaiSan | NewDmTaiSan | PartialUpdateDmTaiSan>(dmTaiSan: T): RestOf<T> {
    return {
      ...dmTaiSan,
      ngayThaoTac: dmTaiSan.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayBdNganChan: dmTaiSan.ngayBdNganChan?.format(DATE_FORMAT) ?? null,
      ngayKtNganChan: dmTaiSan.ngayKtNganChan?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDmTaiSan: RestDmTaiSan): IDmTaiSan {
    return {
      ...restDmTaiSan,
      ngayThaoTac: restDmTaiSan.ngayThaoTac ? dayjs(restDmTaiSan.ngayThaoTac) : undefined,
      ngayBdNganChan: restDmTaiSan.ngayBdNganChan ? dayjs(restDmTaiSan.ngayBdNganChan) : undefined,
      ngayKtNganChan: restDmTaiSan.ngayKtNganChan ? dayjs(restDmTaiSan.ngayKtNganChan) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDmTaiSan>): HttpResponse<IDmTaiSan> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDmTaiSan[]>): HttpResponse<IDmTaiSan[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
