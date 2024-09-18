import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDuongSuTrungCmndBak, NewDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';

export type PartialUpdateDuongSuTrungCmndBak = Partial<IDuongSuTrungCmndBak> & Pick<IDuongSuTrungCmndBak, 'id'>;

type RestOf<T extends IDuongSuTrungCmndBak | NewDuongSuTrungCmndBak> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDuongSuTrungCmndBak = RestOf<IDuongSuTrungCmndBak>;

export type NewRestDuongSuTrungCmndBak = RestOf<NewDuongSuTrungCmndBak>;

export type PartialUpdateRestDuongSuTrungCmndBak = RestOf<PartialUpdateDuongSuTrungCmndBak>;

export type EntityResponseType = HttpResponse<IDuongSuTrungCmndBak>;
export type EntityArrayResponseType = HttpResponse<IDuongSuTrungCmndBak[]>;

@Injectable({ providedIn: 'root' })
export class DuongSuTrungCmndBakService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/duong-su-trung-cmnd-baks');

  create(duongSuTrungCmndBak: NewDuongSuTrungCmndBak): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duongSuTrungCmndBak);
    return this.http
      .post<RestDuongSuTrungCmndBak>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(duongSuTrungCmndBak: IDuongSuTrungCmndBak): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duongSuTrungCmndBak);
    return this.http
      .put<RestDuongSuTrungCmndBak>(`${this.resourceUrl}/${this.getDuongSuTrungCmndBakIdentifier(duongSuTrungCmndBak)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(duongSuTrungCmndBak: PartialUpdateDuongSuTrungCmndBak): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(duongSuTrungCmndBak);
    return this.http
      .patch<RestDuongSuTrungCmndBak>(`${this.resourceUrl}/${this.getDuongSuTrungCmndBakIdentifier(duongSuTrungCmndBak)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDuongSuTrungCmndBak>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDuongSuTrungCmndBak[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDuongSuTrungCmndBakIdentifier(duongSuTrungCmndBak: Pick<IDuongSuTrungCmndBak, 'id'>): number {
    return duongSuTrungCmndBak.id;
  }

  compareDuongSuTrungCmndBak(o1: Pick<IDuongSuTrungCmndBak, 'id'> | null, o2: Pick<IDuongSuTrungCmndBak, 'id'> | null): boolean {
    return o1 && o2 ? this.getDuongSuTrungCmndBakIdentifier(o1) === this.getDuongSuTrungCmndBakIdentifier(o2) : o1 === o2;
  }

  addDuongSuTrungCmndBakToCollectionIfMissing<Type extends Pick<IDuongSuTrungCmndBak, 'id'>>(
    duongSuTrungCmndBakCollection: Type[],
    ...duongSuTrungCmndBaksToCheck: (Type | null | undefined)[]
  ): Type[] {
    const duongSuTrungCmndBaks: Type[] = duongSuTrungCmndBaksToCheck.filter(isPresent);
    if (duongSuTrungCmndBaks.length > 0) {
      const duongSuTrungCmndBakCollectionIdentifiers = duongSuTrungCmndBakCollection.map(duongSuTrungCmndBakItem =>
        this.getDuongSuTrungCmndBakIdentifier(duongSuTrungCmndBakItem),
      );
      const duongSuTrungCmndBaksToAdd = duongSuTrungCmndBaks.filter(duongSuTrungCmndBakItem => {
        const duongSuTrungCmndBakIdentifier = this.getDuongSuTrungCmndBakIdentifier(duongSuTrungCmndBakItem);
        if (duongSuTrungCmndBakCollectionIdentifiers.includes(duongSuTrungCmndBakIdentifier)) {
          return false;
        }
        duongSuTrungCmndBakCollectionIdentifiers.push(duongSuTrungCmndBakIdentifier);
        return true;
      });
      return [...duongSuTrungCmndBaksToAdd, ...duongSuTrungCmndBakCollection];
    }
    return duongSuTrungCmndBakCollection;
  }

  protected convertDateFromClient<T extends IDuongSuTrungCmndBak | NewDuongSuTrungCmndBak | PartialUpdateDuongSuTrungCmndBak>(
    duongSuTrungCmndBak: T,
  ): RestOf<T> {
    return {
      ...duongSuTrungCmndBak,
      ngayThaoTac: duongSuTrungCmndBak.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDuongSuTrungCmndBak: RestDuongSuTrungCmndBak): IDuongSuTrungCmndBak {
    return {
      ...restDuongSuTrungCmndBak,
      ngayThaoTac: restDuongSuTrungCmndBak.ngayThaoTac ? dayjs(restDuongSuTrungCmndBak.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDuongSuTrungCmndBak>): HttpResponse<IDuongSuTrungCmndBak> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDuongSuTrungCmndBak[]>): HttpResponse<IDuongSuTrungCmndBak[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
