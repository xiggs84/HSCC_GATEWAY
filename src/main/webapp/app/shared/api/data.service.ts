import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  postData(apiUrl: string, body: any): Observable<any> {
    return this.http.post<any>(apiUrl, body);
  }

  putData(apiUrl: string, body: any): Observable<any> {
    return this.http.put<any>(apiUrl, body);
  }

  deleteData(apiUrl: string): Observable<any> {
    return this.http.delete<any>(apiUrl);
  }
}
