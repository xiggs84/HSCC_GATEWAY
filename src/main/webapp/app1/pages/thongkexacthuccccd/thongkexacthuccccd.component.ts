import {Component, OnInit} from '@angular/core';
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzTableComponent} from "ng-zorro-antd/table";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-thongkexacthuccccd',
  standalone: true,
  imports: [
    NzModalComponent,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    NzCardComponent,
    NzDatePickerComponent,
    NzInputGroupComponent,
    NzTableComponent,
    NzIconDirective,
    NzInputDirective,
    NzButtonComponent,
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzRowDirective,
    NzColDirective,
    NgForOf
  ],
  templateUrl: './thongkexacthuccccd.component.html',
  styleUrl: './thongkexacthuccccd.component.scss'
})
export class ThongkexacthuccccdComponent {
  units = [
    { value: 'VNPTTG', label: 'VNPTTG' },
    { value: 'UNIT2', label: 'UNIT 2' },
    { value: 'UNIT3', label: 'UNIT 3' }
  ];
  selectedUnit = 'VNPTTG';
  startDate = null;
  endDate = null;
  searchValue = '';
  isLoading = false;
  tableData = [
    { stt: 1, duongSu: 'Võ Duy Trường', soCccd: '083097011373', trangThai: 'Xác thực thành công', canBoXacThuc: 'Quản trị viên', ngayThaoTac: '13/08/2024 10:08:11' },
    { stt: 2, duongSu: 'Võ Duy Trường', soCccd: '083097011373', trangThai: 'Xác thực không thành công', canBoXacThuc: 'Quản trị viên', ngayThaoTac: '13/08/2024 09:08:15' },
    { stt: 3, duongSu: 'Võ Duy Trường', soCccd: '083097011373', trangThai: 'Xác thực lỗi', canBoXacThuc: 'Quản trị viên', ngayThaoTac: '13/08/2024 09:08:05' },
    // ... thêm các dữ liệu khác
  ];

  onUnitChange(value: string) {
    // Xử lý thay đổi đơn vị
    console.log('Đơn vị đã chọn:', value);
  }

  onStartDateChange(value: Date) {
    // Xử lý thay đổi ngày bắt đầu
    console.log('Ngày bắt đầu:', value);
  }

  onEndDateChange(value: Date) {
    // Xử lý thay đổi ngày kết thúc
    console.log('Ngày kết thúc:', value);
  }

  search() {
    // Xử lý tìm kiếm
    console.log('Tìm kiếm:', this.searchValue);
  }

  showReport() {
    // Xử lý hiển thị báo cáo
    console.log('Hiển thị báo cáo');
  }

  exportFile() {
    // Xử lý tải file
    console.log('Tải file');
  }
}
