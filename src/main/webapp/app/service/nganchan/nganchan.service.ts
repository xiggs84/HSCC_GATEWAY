import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from "../../core/config/application-config.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NganchanService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nganchans', 'duongsu');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(nganchan: any): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(this.resourceUrl, nganchan, { observe: 'response' })
      .pipe(map(res => this.convertResponse(res)));
  }

  update(nganchan: any): Observable<HttpResponse<any>> {
    return this.http
      .put<any>(`${this.resourceUrl}/${nganchan.id}`, nganchan, { observe: 'response' })
      .pipe(map(res => this.convertResponse(res)));
  }

  protected convertResponse(res: HttpResponse<any>): HttpResponse<any> {
    // Perform any transformation or conversion here if needed
    return res;
  }
}
