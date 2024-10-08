import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChungThuc, NewChungThuc } from '../chung-thuc.model';

export type PartialUpdateChungThuc = Partial<IChungThuc> & Pick<IChungThuc, 'idChungThuc'>;

type RestOf<T extends IChungThuc | NewChungThuc> = Omit<T, 'ngayChungThuc' | 'ngayThaoTac'> & {
  ngayChungThuc?: string | null;
  ngayThaoTac?: string | null;
};

export type RestChungThuc = RestOf<IChungThuc>;

export type NewRestChungThuc = RestOf<NewChungThuc>;

export type PartialUpdateRestChungThuc = RestOf<PartialUpdateChungThuc>;

export type EntityResponseType = HttpResponse<IChungThuc>;
export type EntityArrayResponseType = HttpResponse<IChungThuc[]>;

@Injectable({ providedIn: 'root' })
export class ChungThucService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chung-thucs');

  create(chungThuc: NewChungThuc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chungThuc);
    return this.http
      .post<RestChungThuc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(chungThuc: IChungThuc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chungThuc);
    return this.http
      .put<RestChungThuc>(`${this.resourceUrl}/${this.getChungThucIdentifier(chungThuc)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(chungThuc: PartialUpdateChungThuc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chungThuc);
    return this.http
      .patch<RestChungThuc>(`${this.resourceUrl}/${this.getChungThucIdentifier(chungThuc)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestChungThuc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestChungThuc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getChungThucIdentifier(chungThuc: Pick<IChungThuc, 'idChungThuc'>): string {
    return chungThuc.idChungThuc;
  }

  compareChungThuc(o1: Pick<IChungThuc, 'idChungThuc'> | null, o2: Pick<IChungThuc, 'idChungThuc'> | null): boolean {
    return o1 && o2 ? this.getChungThucIdentifier(o1) === this.getChungThucIdentifier(o2) : o1 === o2;
  }

  addChungThucToCollectionIfMissing<Type extends Pick<IChungThuc, 'idChungThuc'>>(
    chungThucCollection: Type[],
    ...chungThucsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const chungThucs: Type[] = chungThucsToCheck.filter(isPresent);
    if (chungThucs.length > 0) {
      const chungThucCollectionIdentifiers = chungThucCollection.map(chungThucItem => this.getChungThucIdentifier(chungThucItem));
      const chungThucsToAdd = chungThucs.filter(chungThucItem => {
        const chungThucIdentifier = this.getChungThucIdentifier(chungThucItem);
        if (chungThucCollectionIdentifiers.includes(chungThucIdentifier)) {
          return false;
        }
        chungThucCollectionIdentifiers.push(chungThucIdentifier);
        return true;
      });
      return [...chungThucsToAdd, ...chungThucCollection];
    }
    return chungThucCollection;
  }

  protected convertDateFromClient<T extends IChungThuc | NewChungThuc | PartialUpdateChungThuc>(chungThuc: T): RestOf<T> {
    return {
      ...chungThuc,
      ngayChungThuc: chungThuc.ngayChungThuc?.format(DATE_FORMAT) ?? null,
      ngayThaoTac: chungThuc.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restChungThuc: RestChungThuc): IChungThuc {
    return {
      ...restChungThuc,
      ngayChungThuc: restChungThuc.ngayChungThuc ? dayjs(restChungThuc.ngayChungThuc) : undefined,
      ngayThaoTac: restChungThuc.ngayThaoTac ? dayjs(restChungThuc.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestChungThuc>): HttpResponse<IChungThuc> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestChungThuc[]>): HttpResponse<IChungThuc[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
