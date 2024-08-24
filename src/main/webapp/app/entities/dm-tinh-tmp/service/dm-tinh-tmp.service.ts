import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDmTinhTmp, NewDmTinhTmp } from '../dm-tinh-tmp.model';

export type PartialUpdateDmTinhTmp = Partial<IDmTinhTmp> & Pick<IDmTinhTmp, 'id'>;

export type EntityResponseType = HttpResponse<IDmTinhTmp>;
export type EntityArrayResponseType = HttpResponse<IDmTinhTmp[]>;

@Injectable({ providedIn: 'root' })
export class DmTinhTmpService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dm-tinh-tmps');

  create(dmTinhTmp: NewDmTinhTmp): Observable<EntityResponseType> {
    return this.http.post<IDmTinhTmp>(this.resourceUrl, dmTinhTmp, { observe: 'response' });
  }

  update(dmTinhTmp: IDmTinhTmp): Observable<EntityResponseType> {
    return this.http.put<IDmTinhTmp>(`${this.resourceUrl}/${this.getDmTinhTmpIdentifier(dmTinhTmp)}`, dmTinhTmp, { observe: 'response' });
  }

  partialUpdate(dmTinhTmp: PartialUpdateDmTinhTmp): Observable<EntityResponseType> {
    return this.http.patch<IDmTinhTmp>(`${this.resourceUrl}/${this.getDmTinhTmpIdentifier(dmTinhTmp)}`, dmTinhTmp, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDmTinhTmp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDmTinhTmp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDmTinhTmpIdentifier(dmTinhTmp: Pick<IDmTinhTmp, 'id'>): number {
    return dmTinhTmp.id;
  }

  compareDmTinhTmp(o1: Pick<IDmTinhTmp, 'id'> | null, o2: Pick<IDmTinhTmp, 'id'> | null): boolean {
    return o1 && o2 ? this.getDmTinhTmpIdentifier(o1) === this.getDmTinhTmpIdentifier(o2) : o1 === o2;
  }

  addDmTinhTmpToCollectionIfMissing<Type extends Pick<IDmTinhTmp, 'id'>>(
    dmTinhTmpCollection: Type[],
    ...dmTinhTmpsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dmTinhTmps: Type[] = dmTinhTmpsToCheck.filter(isPresent);
    if (dmTinhTmps.length > 0) {
      const dmTinhTmpCollectionIdentifiers = dmTinhTmpCollection.map(dmTinhTmpItem => this.getDmTinhTmpIdentifier(dmTinhTmpItem));
      const dmTinhTmpsToAdd = dmTinhTmps.filter(dmTinhTmpItem => {
        const dmTinhTmpIdentifier = this.getDmTinhTmpIdentifier(dmTinhTmpItem);
        if (dmTinhTmpCollectionIdentifiers.includes(dmTinhTmpIdentifier)) {
          return false;
        }
        dmTinhTmpCollectionIdentifiers.push(dmTinhTmpIdentifier);
        return true;
      });
      return [...dmTinhTmpsToAdd, ...dmTinhTmpCollection];
    }
    return dmTinhTmpCollection;
  }
}
