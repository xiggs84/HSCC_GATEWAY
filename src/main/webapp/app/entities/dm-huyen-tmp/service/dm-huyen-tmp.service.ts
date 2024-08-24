import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDmHuyenTmp, NewDmHuyenTmp } from '../dm-huyen-tmp.model';

export type PartialUpdateDmHuyenTmp = Partial<IDmHuyenTmp> & Pick<IDmHuyenTmp, 'id'>;

export type EntityResponseType = HttpResponse<IDmHuyenTmp>;
export type EntityArrayResponseType = HttpResponse<IDmHuyenTmp[]>;

@Injectable({ providedIn: 'root' })
export class DmHuyenTmpService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dm-huyen-tmps');

  create(dmHuyenTmp: NewDmHuyenTmp): Observable<EntityResponseType> {
    return this.http.post<IDmHuyenTmp>(this.resourceUrl, dmHuyenTmp, { observe: 'response' });
  }

  update(dmHuyenTmp: IDmHuyenTmp): Observable<EntityResponseType> {
    return this.http.put<IDmHuyenTmp>(`${this.resourceUrl}/${this.getDmHuyenTmpIdentifier(dmHuyenTmp)}`, dmHuyenTmp, {
      observe: 'response',
    });
  }

  partialUpdate(dmHuyenTmp: PartialUpdateDmHuyenTmp): Observable<EntityResponseType> {
    return this.http.patch<IDmHuyenTmp>(`${this.resourceUrl}/${this.getDmHuyenTmpIdentifier(dmHuyenTmp)}`, dmHuyenTmp, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDmHuyenTmp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDmHuyenTmp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDmHuyenTmpIdentifier(dmHuyenTmp: Pick<IDmHuyenTmp, 'id'>): number {
    return dmHuyenTmp.id;
  }

  compareDmHuyenTmp(o1: Pick<IDmHuyenTmp, 'id'> | null, o2: Pick<IDmHuyenTmp, 'id'> | null): boolean {
    return o1 && o2 ? this.getDmHuyenTmpIdentifier(o1) === this.getDmHuyenTmpIdentifier(o2) : o1 === o2;
  }

  addDmHuyenTmpToCollectionIfMissing<Type extends Pick<IDmHuyenTmp, 'id'>>(
    dmHuyenTmpCollection: Type[],
    ...dmHuyenTmpsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dmHuyenTmps: Type[] = dmHuyenTmpsToCheck.filter(isPresent);
    if (dmHuyenTmps.length > 0) {
      const dmHuyenTmpCollectionIdentifiers = dmHuyenTmpCollection.map(dmHuyenTmpItem => this.getDmHuyenTmpIdentifier(dmHuyenTmpItem));
      const dmHuyenTmpsToAdd = dmHuyenTmps.filter(dmHuyenTmpItem => {
        const dmHuyenTmpIdentifier = this.getDmHuyenTmpIdentifier(dmHuyenTmpItem);
        if (dmHuyenTmpCollectionIdentifiers.includes(dmHuyenTmpIdentifier)) {
          return false;
        }
        dmHuyenTmpCollectionIdentifiers.push(dmHuyenTmpIdentifier);
        return true;
      });
      return [...dmHuyenTmpsToAdd, ...dmHuyenTmpCollection];
    }
    return dmHuyenTmpCollection;
  }
}
