import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDonViScanQr, NewDonViScanQr } from '../don-vi-scan-qr.model';

export type PartialUpdateDonViScanQr = Partial<IDonViScanQr> & Pick<IDonViScanQr, 'id'>;

type RestOf<T extends IDonViScanQr | NewDonViScanQr> = Omit<T, 'ngayThaoTac'> & {
  ngayThaoTac?: string | null;
};

export type RestDonViScanQr = RestOf<IDonViScanQr>;

export type NewRestDonViScanQr = RestOf<NewDonViScanQr>;

export type PartialUpdateRestDonViScanQr = RestOf<PartialUpdateDonViScanQr>;

export type EntityResponseType = HttpResponse<IDonViScanQr>;
export type EntityArrayResponseType = HttpResponse<IDonViScanQr[]>;

@Injectable({ providedIn: 'root' })
export class DonViScanQrService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/don-vi-scan-qrs');

  create(donViScanQr: NewDonViScanQr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(donViScanQr);
    return this.http
      .post<RestDonViScanQr>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(donViScanQr: IDonViScanQr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(donViScanQr);
    return this.http
      .put<RestDonViScanQr>(`${this.resourceUrl}/${this.getDonViScanQrIdentifier(donViScanQr)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(donViScanQr: PartialUpdateDonViScanQr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(donViScanQr);
    return this.http
      .patch<RestDonViScanQr>(`${this.resourceUrl}/${this.getDonViScanQrIdentifier(donViScanQr)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDonViScanQr>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDonViScanQr[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDonViScanQrIdentifier(donViScanQr: Pick<IDonViScanQr, 'id'>): number {
    return donViScanQr.id;
  }

  compareDonViScanQr(o1: Pick<IDonViScanQr, 'id'> | null, o2: Pick<IDonViScanQr, 'id'> | null): boolean {
    return o1 && o2 ? this.getDonViScanQrIdentifier(o1) === this.getDonViScanQrIdentifier(o2) : o1 === o2;
  }

  addDonViScanQrToCollectionIfMissing<Type extends Pick<IDonViScanQr, 'id'>>(
    donViScanQrCollection: Type[],
    ...donViScanQrsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const donViScanQrs: Type[] = donViScanQrsToCheck.filter(isPresent);
    if (donViScanQrs.length > 0) {
      const donViScanQrCollectionIdentifiers = donViScanQrCollection.map(donViScanQrItem => this.getDonViScanQrIdentifier(donViScanQrItem));
      const donViScanQrsToAdd = donViScanQrs.filter(donViScanQrItem => {
        const donViScanQrIdentifier = this.getDonViScanQrIdentifier(donViScanQrItem);
        if (donViScanQrCollectionIdentifiers.includes(donViScanQrIdentifier)) {
          return false;
        }
        donViScanQrCollectionIdentifiers.push(donViScanQrIdentifier);
        return true;
      });
      return [...donViScanQrsToAdd, ...donViScanQrCollection];
    }
    return donViScanQrCollection;
  }

  protected convertDateFromClient<T extends IDonViScanQr | NewDonViScanQr | PartialUpdateDonViScanQr>(donViScanQr: T): RestOf<T> {
    return {
      ...donViScanQr,
      ngayThaoTac: donViScanQr.ngayThaoTac?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDonViScanQr: RestDonViScanQr): IDonViScanQr {
    return {
      ...restDonViScanQr,
      ngayThaoTac: restDonViScanQr.ngayThaoTac ? dayjs(restDonViScanQr.ngayThaoTac) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDonViScanQr>): HttpResponse<IDonViScanQr> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDonViScanQr[]>): HttpResponse<IDonViScanQr[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
