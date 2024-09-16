import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigService} from "../../core/config/application-config.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrangchuService {
  protected currentYear: number;
  protected currentDate: string;
  protected monthlyUrl: string;
  protected recordsUrl: string;

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentDate = now.toISOString().split('T')[0]; // Định dạng YYYY-MM-DD

    // Khởi tạo URL trong constructor sau khi currentYear và currentDate đã được gán giá trị
    this.monthlyUrl = this.applicationConfigService.getEndpointFor(`api/hop-dong-cong-chungs/count/nam?year=${this.currentYear}`, 'hopdong');
    this.recordsUrl = this.applicationConfigService.getEndpointFor(`api/hop-dong-cong-chungs/count?date=${this.currentDate}`, 'hopdong');
  }

  getMonthlyData(): Observable<any> {
    return this.http.get<any>(this.monthlyUrl);
  }

  getRecordsData(): Observable<any> {
    return this.http.get<any>(this.recordsUrl);
  }
}
