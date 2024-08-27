import {Component, Inject, PLATFORM_ID} from '@angular/core';
import SharedModule from '../shared/shared.module';
import {isPlatformBrowser} from "@angular/common";
import {BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip} from "chart.js";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {BaseChartDirective} from "ng2-charts";
@Component({
  selector: 'jhi-trangchu',
  standalone: true,
  imports: [SharedModule, BaseChartDirective],
  templateUrl: './trangchu.component.html',
  styleUrl: './trangchu.component.scss'
})
export class TrangchuComponent {
  isBrowser: boolean;

  // Đăng ký controller và các thành phần liên quan
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Kiểm tra xem mã có đang chạy trên trình duyệt không
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
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  chartData = [
    { data: [12500, 9000, 7000, 12500, 15000, 14000, 13500, 12000, 13000, 11000, 10000, 15000], label: 'Số lượng hồ sơ' }
  ];

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
        formatter(value: number) { // Chỉ định kiểu cho tham số value
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
