import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICauHinhMauChungThuc, NewCauHinhMauChungThuc } from '../cau-hinh-mau-chung-thuc.model';

export type PartialUpdateCauHinhMauChungThuc = Partial<ICauHinhMauChungThuc> & Pick<ICauHinhMauChungThuc, 'id'>;

type RestOf<T extends ICauHinhMauChungThuc | NewCauHinhMauChungThuc> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestCauHinhMauChungThuc = RestOf<ICauHinhMauChungThuc>;

export type NewRestCauHinhMauChungThuc = RestOf<NewCauHinhMauChungThuc>;

export type PartialUpdateRestCauHinhMauChungThuc = RestOf<PartialUpdateCauHinhMauChungThuc>;

export type EntityResponseType = HttpResponse<ICauHinhMauChungThuc>;
export type EntityArrayResponseType = HttpResponse<ICauHinhMauChungThuc[]>;

@Injectable({ providedIn: 'root' })
export class CauHinhMauChungThucService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cau-hinh-mau-chung-thucs');

  create(cauHinhMauChungThuc: NewCauHinhMauChungThuc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cauHinhMauChungThuc);
    return this.http
      .post<RestCauHinhMauChungThuc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cauHinhMauChungThuc: ICauHinhMauChungThuc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cauHinhMauChungThuc);
    return this.http
      .put<RestCauHinhMauChungThuc>(`${this.resourceUrl}/${this.getCauHinhMauChungThucIdentifier(cauHinhMauChungThuc)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cauHinhMauChungThuc: PartialUpdateCauHinhMauChungThuc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cauHinhMauChungThuc);
    return this.http
      .patch<RestCauHinhMauChungThuc>(`${this.resourceUrl}/${this.getCauHinhMauChungThucIdentifier(cauHinhMauChungThuc)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCauHinhMauChungThuc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCauHinhMauChungThuc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCauHinhMauChungThucIdentifier(cauHinhMauChungThuc: Pick<ICauHinhMauChungThuc, 'id'>): number {
    return cauHinhMauChungThuc.id;
  }

  compareCauHinhMauChungThuc(o1: Pick<ICauHinhMauChungThuc, 'id'> | null, o2: Pick<ICauHinhMauChungThuc, 'id'> | null): boolean {
    return o1 && o2 ? this.getCauHinhMauChungThucIdentifier(o1) === this.getCauHinhMauChungThucIdentifier(o2) : o1 === o2;
  }

  addCauHinhMauChungThucToCollectionIfMissing<Type extends Pick<ICauHinhMauChungThuc, 'id'>>(
    cauHinhMauChungThucCollection: Type[],
    ...cauHinhMauChungThucsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cauHinhMauChungThucs: Type[] = cauHinhMauChungThucsToCheck.filter(isPresent);
    if (cauHinhMauChungThucs.length > 0) {
      const cauHinhMauChungThucCollectionIdentifiers = cauHinhMauChungThucCollection.map(cauHinhMauChungThucItem =>
        this.getCauHinhMauChungThucIdentifier(cauHinhMauChungThucItem),
      );
      const cauHinhMauChungThucsToAdd = cauHinhMauChungThucs.filter(cauHinhMauChungThucItem => {
        const cauHinhMauChungThucIdentifier = this.getCauHinhMauChungThucIdentifier(cauHinhMauChungThucItem);
        if (cauHinhMauChungThucCollectionIdentifiers.includes(cauHinhMauChungThucIdentifier)) {
          return false;
        }
        cauHinhMauChungThucCollectionIdentifiers.push(cauHinhMauChungThucIdentifier);
        return true;
      });
      return [...cauHinhMauChungThucsToAdd, ...cauHinhMauChungThucCollection];
    }
    return cauHinhMauChungThucCollection;
  }

  protected convertDateFromClient<T extends ICauHinhMauChungThuc | NewCauHinhMauChungThuc | PartialUpdateCauHinhMauChungThuc>(
    cauHinhMauChungThuc: T,
  ): RestOf<T> {
    return {
      ...cauHinhMauChungThuc,
      ngayThaoTac: cauHinhMauChungThuc.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCauHinhMauChungThuc: RestCauHinhMauChungThuc): ICauHinhMauChungThuc {
    return {
      ...restCauHinhMauChungThuc,
      ngayThaoTac: restCauHinhMauChungThuc.ngayThaoTac ? dayjs(restCauHinhMauChungThuc.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCauHinhMauChungThuc>): HttpResponse<ICauHinhMauChungThuc> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCauHinhMauChungThuc[]>): HttpResponse<ICauHinhMauChungThuc[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
