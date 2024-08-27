import {Component, NgIterable, OnInit} from '@angular/core';
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
  isLoading = false;
  tableData = [
    { stt: 1, duongSu: 'Võ Duy Trường', soCccd: '083097011373', trangThai: 'Xác thực thành công', canBoXacThuc: 'Quản trị viên', ngayThaoTac: '13/08/2024 10:08:11' },
    { stt: 2, duongSu: 'Võ Duy Trường', soCccd: '083097011373', trangThai: 'Xác thực không thành công', canBoXacThuc: 'Quản trị viên', ngayThaoTac: '13/08/2024 09:08:15' },
    { stt: 3, duongSu: 'Võ Duy Trường', soCccd: '083097011373', trangThai: 'Xác thực lỗi', canBoXacThuc: 'Quản trị viên', ngayThaoTac: '13/08/2024 09:08:05' },
    // ... thêm các dữ liệu khác
  ];
  selectedUnit: string = '';
  selectedContractType: string = '';
  searchValue: string = '';
  selectedStatus: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  search() {
    // Xử lý tìm kiếm
    console.log('Tìm kiếm:', this.searchValue);
  }

  unitOptions = ['VNPTTG', 'Đơn vị 1', 'Đơn vị 2'];
  contractTypes = ['Loại 1', 'Loại 2', 'Loại 3'];
  statusOptions = ['Trạng thái 1', 'Trạng thái 2', 'Trạng thái 3'];

  resetForm() {
    this.selectedUnit = '';
    this.selectedContractType = '';
    this.searchValue = '';
    this.selectedStatus = '';
    this.startDate = null;
    this.endDate = null;
  }

  addNew() {
    console.log('Thêm mới');
  }
}
