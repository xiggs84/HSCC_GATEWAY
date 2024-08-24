import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDmXaTmp, NewDmXaTmp } from '../dm-xa-tmp.model';

export type PartialUpdateDmXaTmp = Partial<IDmXaTmp> & Pick<IDmXaTmp, 'id'>;

export type EntityResponseType = HttpResponse<IDmXaTmp>;
export type EntityArrayResponseType = HttpResponse<IDmXaTmp[]>;

@Injectable({ providedIn: 'root' })
export class DmXaTmpService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dm-xa-tmps');

  create(dmXaTmp: NewDmXaTmp): Observable<EntityResponseType> {
    return this.http.post<IDmXaTmp>(this.resourceUrl, dmXaTmp, { observe: 'response' });
  }

  update(dmXaTmp: IDmXaTmp): Observable<EntityResponseType> {
    return this.http.put<IDmXaTmp>(`${this.resourceUrl}/${this.getDmXaTmpIdentifier(dmXaTmp)}`, dmXaTmp, { observe: 'response' });
  }

  partialUpdate(dmXaTmp: PartialUpdateDmXaTmp): Observable<EntityResponseType> {
    return this.http.patch<IDmXaTmp>(`${this.resourceUrl}/${this.getDmXaTmpIdentifier(dmXaTmp)}`, dmXaTmp, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDmXaTmp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDmXaTmp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDmXaTmpIdentifier(dmXaTmp: Pick<IDmXaTmp, 'id'>): number {
    return dmXaTmp.id;
  }

  compareDmXaTmp(o1: Pick<IDmXaTmp, 'id'> | null, o2: Pick<IDmXaTmp, 'id'> | null): boolean {
    return o1 && o2 ? this.getDmXaTmpIdentifier(o1) === this.getDmXaTmpIdentifier(o2) : o1 === o2;
  }

  addDmXaTmpToCollectionIfMissing<Type extends Pick<IDmXaTmp, 'id'>>(
    dmXaTmpCollection: Type[],
    ...dmXaTmpsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dmXaTmps: Type[] = dmXaTmpsToCheck.filter(isPresent);
    if (dmXaTmps.length > 0) {
      const dmXaTmpCollectionIdentifiers = dmXaTmpCollection.map(dmXaTmpItem => this.getDmXaTmpIdentifier(dmXaTmpItem));
      const dmXaTmpsToAdd = dmXaTmps.filter(dmXaTmpItem => {
        const dmXaTmpIdentifier = this.getDmXaTmpIdentifier(dmXaTmpItem);
        if (dmXaTmpCollectionIdentifiers.includes(dmXaTmpIdentifier)) {
          return false;
        }
        dmXaTmpCollectionIdentifiers.push(dmXaTmpIdentifier);
        return true;
      });
      return [...dmXaTmpsToAdd, ...dmXaTmpCollection];
    }
    return dmXaTmpCollection;
  }
}
