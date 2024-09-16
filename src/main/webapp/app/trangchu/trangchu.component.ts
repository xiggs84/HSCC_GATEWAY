import { Component, Inject, PLATFORM_ID } from '@angular/core';
import SharedModule from '../shared/shared.module';
import { isPlatformBrowser } from "@angular/common";
import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from "ng2-charts";
import { TrangchuService } from './service/trangchu.service';
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

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

  chartData: ChartDataset[] = [
    { data: [], label: 'Số lượng hồ sơ' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private trangChuService: TrangchuService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      Chart.register(
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
        DataLabelsPlugin
      );
      this.loadData();
    }
  }

  loadData(): void {
    this.trangChuService.getMonthlyData().pipe(
      tap((data: any) => {
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

        this.chartData = [
          { data: monthlyData, label: 'Số lượng hồ sơ' }
        ];
      }),
      catchError(error => {
        console.error('Error fetching monthly data', error);
        return throwError(() => new Error('Error fetching monthly data'));
      })
    ).subscribe();

    this.trangChuService.getRecordsData().pipe(
      tap(data => {
        this.dailyRecords = data.dailyRecords || 0;
        this.weeklyRecords = data.weeklyRecords || 0;
        this.monthlyRecords = data.monthlyRecords || 0;
      }),
      catchError(error => {
        console.error('Error fetching records data', error);
        return throwError(() => new Error('Error fetching records data'));
      })
    ).subscribe();
  }

  chartLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter(value: number) {
          return value.toLocaleString();
        },
        color: '#000',
        font: {
          weight: 'bold',
        }
      }
    }
  };
}
