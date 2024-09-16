import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DuongsuFormService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/duong-sus', 'duongsu');
  constructor(protected http: HttpClient,
              protected applicationConfigService: ApplicationConfigService) {}

  create(duongSu: any): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(this.resourceUrl, duongSu, { observe: 'response' })
      .pipe(map(res => this.convertResponse(res)));
  }

  update(duongSu: any): Observable<HttpResponse<any>> {
    return this.http
      .put<any>(`${this.resourceUrl}/${duongSu.id}`, duongSu, { observe: 'response' })
      .pipe(map(res => this.convertResponse(res)));
  }

  protected convertResponse(res: HttpResponse<any>): HttpResponse<any> {
    return res;
  }
}
