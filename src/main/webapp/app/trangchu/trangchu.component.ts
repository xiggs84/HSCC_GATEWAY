import {Component, Inject, PLATFORM_ID} from '@angular/core';
import SharedModule from '../shared/shared.module';
import {isPlatformBrowser} from "@angular/common";
import {BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip} from "chart.js";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {BaseChartDirective} from "ng2-charts";
import {DataService} from '../shared/api/data.service';
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

interface ChartDataset {
  data: number[];
  label: string;
}

@Component({
  selector: 'jhi-trangchu',
  standalone: true,
  imports: [SharedModule, BaseChartDirective],
  templateUrl: './trangchu.component.html',
  styleUrl: './trangchu.component.scss'
})
export class TrangchuComponent {
  isBrowser: boolean;
  dailyRecords: number = 0;
  weeklyRecords: number = 0;
  monthlyRecords: number = 0;

  // Khai báo kiểu dữ liệu cho chartData
  chartData: ChartDataset[] = [
    { data: [], label: 'Số lượng hồ sơ' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private dataService: DataService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      // Đăng ký các thành phần của Chart.js và plugin chỉ trên phía client
      Chart.register(
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
        DataLabelsPlugin // Đăng ký plugin
      );
      this.loadData();
    }
  }

  loadData(): void {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toISOString().split('T')[0];
    // API url cho dữ liệu hàng tháng
    const monthlyApiUrl = `http://localhost:8080/services/hopdong/api/hop-dong-cong-chungs/count/nam?year=${currentYear}`;

    // API url cho dữ liệu hàng ngày, hàng tuần và hàng tháng
    const recordsApiUrl = `http://localhost:8080/services/hopdong/api/hop-dong-cong-chungs/count?date=${currentDate}`;

    // Lấy dữ liệu hàng tháng
    this.dataService.getData(monthlyApiUrl).pipe(
      tap((data: any) => { // Chỉ định kiểu dữ liệu của response nếu cần
        // Tạo mảng dữ liệu cho biểu đồ từ dữ liệu API
        const monthlyData = [
          data.thang1 || 0,
          data.thang2 || 0,
          data.thang3 || 0,
          data.thang4 || 0,
          data.thang5 || 0,
          data.thang6 || 0,
          data.thang7 || 0,
          data.thang8 || 0,
          data.thang9 || 0,
          data.thang10 || 0,
          data.thang11 || 0,
          data.thang12 || 0
        ];

        // Cập nhật chartData với dữ liệu mới
        this.chartData = [
          { data: monthlyData, label: 'Số lượng hồ sơ' }
        ];
      }),
      catchError(error => {
        console.error('Error fetching monthly data', error);
        return throwError(() => new Error('Error fetching monthly data')); // Ném lỗi tiếp tục để xử lý sau
      })
    ).subscribe();

    // Lấy dữ liệu hàng ngày, hàng tuần và hàng tháng
    this.dataService.getData(recordsApiUrl).pipe(
      tap(data => {
        this.dailyRecords = data.dailyRecords || 0;
        this.weeklyRecords = data.weeklyRecords || 0;
        this.monthlyRecords = data.monthlyRecords || 0;
      }),
      catchError(error => {
        console.error('Error fetching records data', error);
        return throwError(() => new Error('Error fetching records data')); // Ném lỗi tiếp tục để xử lý sau
      })
    ).subscribe();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  chartLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter(value: number) {
          return value.toLocaleString(); // Hiển thị số cụ thể
        },
        color: '#000', // Màu sắc của số liệu
        font: {
          weight: 'bold',
        }
      }
    }
  };
}
