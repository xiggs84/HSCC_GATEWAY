import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISoCongChungTemp, NewSoCongChungTemp } from '../so-cong-chung-temp.model';

export type PartialUpdateSoCongChungTemp = Partial<ISoCongChungTemp> & Pick<ISoCongChungTemp, 'id'>;

type RestOf<T extends ISoCongChungTemp | NewSoCongChungTemp> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestSoCongChungTemp = RestOf<ISoCongChungTemp>;

export type NewRestSoCongChungTemp = RestOf<NewSoCongChungTemp>;

export type PartialUpdateRestSoCongChungTemp = RestOf<PartialUpdateSoCongChungTemp>;

export type EntityResponseType = HttpResponse<ISoCongChungTemp>;
export type EntityArrayResponseType = HttpResponse<ISoCongChungTemp[]>;

@Injectable({ providedIn: 'root' })
export class SoCongChungTempService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/so-cong-chung-temps');

  create(soCongChungTemp: NewSoCongChungTemp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(soCongChungTemp);
    return this.http
      .post<RestSoCongChungTemp>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(soCongChungTemp: ISoCongChungTemp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(soCongChungTemp);
    return this.http
      .put<RestSoCongChungTemp>(`${this.resourceUrl}/${this.getSoCongChungTempIdentifier(soCongChungTemp)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(soCongChungTemp: PartialUpdateSoCongChungTemp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(soCongChungTemp);
    return this.http
      .patch<RestSoCongChungTemp>(`${this.resourceUrl}/${this.getSoCongChungTempIdentifier(soCongChungTemp)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSoCongChungTemp>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSoCongChungTemp[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSoCongChungTempIdentifier(soCongChungTemp: Pick<ISoCongChungTemp, 'id'>): number {
    return soCongChungTemp.id;
  }

  compareSoCongChungTemp(o1: Pick<ISoCongChungTemp, 'id'> | null, o2: Pick<ISoCongChungTemp, 'id'> | null): boolean {
    return o1 && o2 ? this.getSoCongChungTempIdentifier(o1) === this.getSoCongChungTempIdentifier(o2) : o1 === o2;
  }

  addSoCongChungTempToCollectionIfMissing<Type extends Pick<ISoCongChungTemp, 'id'>>(
    soCongChungTempCollection: Type[],
    ...soCongChungTempsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const soCongChungTemps: Type[] = soCongChungTempsToCheck.filter(isPresent);
    if (soCongChungTemps.length > 0) {
      const soCongChungTempCollectionIdentifiers = soCongChungTempCollection.map(soCongChungTempItem =>
        this.getSoCongChungTempIdentifier(soCongChungTempItem),
      );
      const soCongChungTempsToAdd = soCongChungTemps.filter(soCongChungTempItem => {
        const soCongChungTempIdentifier = this.getSoCongChungTempIdentifier(soCongChungTempItem);
        if (soCongChungTempCollectionIdentifiers.includes(soCongChungTempIdentifier)) {
          return false;
        }
        soCongChungTempCollectionIdentifiers.push(soCongChungTempIdentifier);
        return true;
      });
      return [...soCongChungTempsToAdd, ...soCongChungTempCollection];
    }
    return soCongChungTempCollection;
  }

  protected convertDateFromClient<T extends ISoCongChungTemp | NewSoCongChungTemp | PartialUpdateSoCongChungTemp>(
    soCongChungTemp: T,
  ): RestOf<T> {
    return {
      ...soCongChungTemp,
      ngayThaoTac: soCongChungTemp.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restSoCongChungTemp: RestSoCongChungTemp): ISoCongChungTemp {
    return {
      ...restSoCongChungTemp,
      ngayThaoTac: restSoCongChungTemp.ngayThaoTac ? dayjs(restSoCongChungTemp.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSoCongChungTemp>): HttpResponse<ISoCongChungTemp> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSoCongChungTemp[]>): HttpResponse<ISoCongChungTemp[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
