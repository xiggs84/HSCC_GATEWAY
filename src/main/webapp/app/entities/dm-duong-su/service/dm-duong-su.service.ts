import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDmDuongSu, NewDmDuongSu } from '../dm-duong-su.model';

export type PartialUpdateDmDuongSu = Partial<IDmDuongSu> & Pick<IDmDuongSu, 'idDuongSu'>;

type RestOf<T extends IDmDuongSu | NewDmDuongSu> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDmDuongSu = RestOf<IDmDuongSu>;

export type NewRestDmDuongSu = RestOf<NewDmDuongSu>;

export type PartialUpdateRestDmDuongSu = RestOf<PartialUpdateDmDuongSu>;

export type EntityResponseType = HttpResponse<IDmDuongSu>;
export type EntityArrayResponseType = HttpResponse<IDmDuongSu[]>;

@Injectable({ providedIn: 'root' })
export class DmDuongSuService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dm-duong-sus');

  create(dmDuongSu: NewDmDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmDuongSu);
    return this.http
      .post<RestDmDuongSu>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(dmDuongSu: IDmDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmDuongSu);
    return this.http
      .put<RestDmDuongSu>(`${this.resourceUrl}/${this.getDmDuongSuIdentifier(dmDuongSu)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(dmDuongSu: PartialUpdateDmDuongSu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmDuongSu);
    return this.http
      .patch<RestDmDuongSu>(`${this.resourceUrl}/${this.getDmDuongSuIdentifier(dmDuongSu)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDmDuongSu>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDmDuongSu[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDmDuongSuIdentifier(dmDuongSu: Pick<IDmDuongSu, 'idDuongSu'>): number {
    return dmDuongSu.idDuongSu;
  }

  compareDmDuongSu(o1: Pick<IDmDuongSu, 'idDuongSu'> | null, o2: Pick<IDmDuongSu, 'idDuongSu'> | null): boolean {
    return o1 && o2 ? this.getDmDuongSuIdentifier(o1) === this.getDmDuongSuIdentifier(o2) : o1 === o2;
  }

  addDmDuongSuToCollectionIfMissing<Type extends Pick<IDmDuongSu, 'idDuongSu'>>(
    dmDuongSuCollection: Type[],
    ...dmDuongSusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dmDuongSus: Type[] = dmDuongSusToCheck.filter(isPresent);
    if (dmDuongSus.length > 0) {
      const dmDuongSuCollectionIdentifiers = dmDuongSuCollection.map(dmDuongSuItem => this.getDmDuongSuIdentifier(dmDuongSuItem));
      const dmDuongSusToAdd = dmDuongSus.filter(dmDuongSuItem => {
        const dmDuongSuIdentifier = this.getDmDuongSuIdentifier(dmDuongSuItem);
        if (dmDuongSuCollectionIdentifiers.includes(dmDuongSuIdentifier)) {
          return false;
        }
        dmDuongSuCollectionIdentifiers.push(dmDuongSuIdentifier);
        return true;
      });
      return [...dmDuongSusToAdd, ...dmDuongSuCollection];
    }
    return dmDuongSuCollection;
  }

  protected convertDateFromClient<T extends IDmDuongSu | NewDmDuongSu | PartialUpdateDmDuongSu>(dmDuongSu: T): RestOf<T> {
    return {
      ...dmDuongSu,
      ngayThaoTac: dmDuongSu.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDmDuongSu: RestDmDuongSu): IDmDuongSu {
    return {
      ...restDmDuongSu,
      ngayThaoTac: restDmDuongSu.ngayThaoTac ? dayjs(restDmDuongSu.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDmDuongSu>): HttpResponse<IDmDuongSu> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDmDuongSu[]>): HttpResponse<IDmDuongSu[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
