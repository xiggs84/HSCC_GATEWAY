import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDmHopDong, NewDmHopDong } from '../dm-hop-dong.model';

export type PartialUpdateDmHopDong = Partial<IDmHopDong> & Pick<IDmHopDong, 'id'>;

type RestOf<T extends IDmHopDong | NewDmHopDong> = Omit<
  T,
  'ngayLapHd' | 'ngayThaoTac' | 'ngayHen' | 'ngayKyHd' | 'ngayRutTrich' | 'ngayThaoTacRutTrich'
> & {
  ngayLapHd?: string | null;
  ngayThaoTac?: string | null;
  ngayHen?: string | null;
  ngayKyHd?: string | null;
  ngayRutTrich?: string | null;
  ngayThaoTacRutTrich?: string | null;
};

export type RestDmHopDong = RestOf<IDmHopDong>;

export type NewRestDmHopDong = RestOf<NewDmHopDong>;

export type PartialUpdateRestDmHopDong = RestOf<PartialUpdateDmHopDong>;

export type EntityResponseType = HttpResponse<IDmHopDong>;
export type EntityArrayResponseType = HttpResponse<IDmHopDong[]>;

@Injectable({ providedIn: 'root' })
export class DmHopDongService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dm-hop-dongs');

  create(dmHopDong: NewDmHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmHopDong);
    return this.http
      .post<RestDmHopDong>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(dmHopDong: IDmHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmHopDong);
    return this.http
      .put<RestDmHopDong>(`${this.resourceUrl}/${this.getDmHopDongIdentifier(dmHopDong)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(dmHopDong: PartialUpdateDmHopDong): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dmHopDong);
    return this.http
      .patch<RestDmHopDong>(`${this.resourceUrl}/${this.getDmHopDongIdentifier(dmHopDong)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDmHopDong>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDmHopDong[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDmHopDongIdentifier(dmHopDong: Pick<IDmHopDong, 'id'>): number {
    return dmHopDong.id;
  }

  compareDmHopDong(o1: Pick<IDmHopDong, 'id'> | null, o2: Pick<IDmHopDong, 'id'> | null): boolean {
    return o1 && o2 ? this.getDmHopDongIdentifier(o1) === this.getDmHopDongIdentifier(o2) : o1 === o2;
  }

  addDmHopDongToCollectionIfMissing<Type extends Pick<IDmHopDong, 'id'>>(
    dmHopDongCollection: Type[],
    ...dmHopDongsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dmHopDongs: Type[] = dmHopDongsToCheck.filter(isPresent);
    if (dmHopDongs.length > 0) {
      const dmHopDongCollectionIdentifiers = dmHopDongCollection.map(dmHopDongItem => this.getDmHopDongIdentifier(dmHopDongItem));
      const dmHopDongsToAdd = dmHopDongs.filter(dmHopDongItem => {
        const dmHopDongIdentifier = this.getDmHopDongIdentifier(dmHopDongItem);
        if (dmHopDongCollectionIdentifiers.includes(dmHopDongIdentifier)) {
          return false;
        }
        dmHopDongCollectionIdentifiers.push(dmHopDongIdentifier);
        return true;
      });
      return [...dmHopDongsToAdd, ...dmHopDongCollection];
    }
    return dmHopDongCollection;
  }

  protected convertDateFromClient<T extends IDmHopDong | NewDmHopDong | PartialUpdateDmHopDong>(dmHopDong: T): RestOf<T> {
    return {
      ...dmHopDong,
      ngayLapHd: dmHopDong.ngayLapHd?.format(DATE_FORMAT) ?? null,
      ngayThaoTac: dmHopDong.ngayThaoTac?.format(DATE_FORMAT) ?? null,
      ngayHen: dmHopDong.ngayHen?.format(DATE_FORMAT) ?? null,
      ngayKyHd: dmHopDong.ngayKyHd?.format(DATE_FORMAT) ?? null,
      ngayRutTrich: dmHopDong.ngayRutTrich?.format(DATE_FORMAT) ?? null,
      ngayThaoTacRutTrich: dmHopDong.ngayThaoTacRutTrich?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDmHopDong: RestDmHopDong): IDmHopDong {
    return {
      ...restDmHopDong,
      ngayLapHd: restDmHopDong.ngayLapHd ? dayjs(restDmHopDong.ngayLapHd) : undefined,
      ngayThaoTac: restDmHopDong.ngayThaoTac ? dayjs(restDmHopDong.ngayThaoTac) : undefined,
      ngayHen: restDmHopDong.ngayHen ? dayjs(restDmHopDong.ngayHen) : undefined,
      ngayKyHd: restDmHopDong.ngayKyHd ? dayjs(restDmHopDong.ngayKyHd) : undefined,
      ngayRutTrich: restDmHopDong.ngayRutTrich ? dayjs(restDmHopDong.ngayRutTrich) : undefined,
      ngayThaoTacRutTrich: restDmHopDong.ngayThaoTacRutTrich ? dayjs(restDmHopDong.ngayThaoTacRutTrich) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDmHopDong>): HttpResponse<IDmHopDong> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDmHopDong[]>): HttpResponse<IDmHopDong[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
