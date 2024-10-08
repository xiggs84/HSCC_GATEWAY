import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDmLoaiHd, NewDmLoaiHd } from '../dm-loai-hd.model';

export type PartialUpdateDmLoaiHd = Partial<IDmLoaiHd> & Pick<IDmLoaiHd, 'idLoaiHd'>;

type RestOf<T extends IDmLoaiHd | NewDmLoaiHd> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDmLoaiHd = RestOf<IDmLoaiHd>;

export type NewRestDmLoaiHd = RestOf<NewDmLoaiHd>;

export type PartialUpdateRestDmLoaiHd = RestOf<PartialUpdateDmLoaiHd>;

export type EntityResponseType = HttpResponse<IDmLoaiHd>;
export type EntityArrayResponseType = HttpResponse<IDmLoaiHd[]>;

@Injectable({ providedIn: 'root' })
export class DmLoaiHdService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dm-loai-hds');

  create(dmLoaiHd: NewDmLoaiHd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmLoaiHd);
    return this.http
      .post<RestDmLoaiHd>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(dmLoaiHd: IDmLoaiHd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmLoaiHd);
    return this.http
      .put<RestDmLoaiHd>(`${this.resourceUrl}/${this.getDmLoaiHdIdentifier(dmLoaiHd)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(dmLoaiHd: PartialUpdateDmLoaiHd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmLoaiHd);
    return this.http
      .patch<RestDmLoaiHd>(`${this.resourceUrl}/${this.getDmLoaiHdIdentifier(dmLoaiHd)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestDmLoaiHd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDmLoaiHd[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDmLoaiHdIdentifier(dmLoaiHd: Pick<IDmLoaiHd, 'idLoaiHd'>): string {
    return dmLoaiHd.idLoaiHd;
  }

  compareDmLoaiHd(o1: Pick<IDmLoaiHd, 'idLoaiHd'> | null, o2: Pick<IDmLoaiHd, 'idLoaiHd'> | null): boolean {
    return o1 && o2 ? this.getDmLoaiHdIdentifier(o1) === this.getDmLoaiHdIdentifier(o2) : o1 === o2;
  }

  addDmLoaiHdToCollectionIfMissing<Type extends Pick<IDmLoaiHd, 'idLoaiHd'>>(
    dmLoaiHdCollection: Type[],
    ...dmLoaiHdsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dmLoaiHds: Type[] = dmLoaiHdsToCheck.filter(isPresent);
    if (dmLoaiHds.length > 0) {
      const dmLoaiHdCollectionIdentifiers = dmLoaiHdCollection.map(dmLoaiHdItem => this.getDmLoaiHdIdentifier(dmLoaiHdItem));
      const dmLoaiHdsToAdd = dmLoaiHds.filter(dmLoaiHdItem => {
        const dmLoaiHdIdentifier = this.getDmLoaiHdIdentifier(dmLoaiHdItem);
        if (dmLoaiHdCollectionIdentifiers.includes(dmLoaiHdIdentifier)) {
          return false;
        }
        dmLoaiHdCollectionIdentifiers.push(dmLoaiHdIdentifier);
        return true;
      });
      return [...dmLoaiHdsToAdd, ...dmLoaiHdCollection];
    }
    return dmLoaiHdCollection;
  }

  protected convertDateFromClient<T extends IDmLoaiHd | NewDmLoaiHd | PartialUpdateDmLoaiHd>(dmLoaiHd: T): RestOf<T> {
    return {
      ...dmLoaiHd,
      ngayThaoTac: dmLoaiHd.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDmLoaiHd: RestDmLoaiHd): IDmLoaiHd {
    return {
      ...restDmLoaiHd,
      ngayThaoTac: restDmLoaiHd.ngayThaoTac ? dayjs(restDmLoaiHd.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDmLoaiHd>): HttpResponse<IDmLoaiHd> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDmLoaiHd[]>): HttpResponse<IDmLoaiHd[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
