import {Component, NgIterable} from '@angular/core';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NzToolTipComponent, NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-danhsachhopdong',
  standalone: true,
  imports: [
    NzRowDirective,
    NzColDirective,
    NzSelectComponent,
    FormsModule,
    NzOptionComponent,
    NgForOf,
    NzInputDirective,
    NzDatePickerComponent,
    NzButtonComponent,
    NzTableComponent,
    NzThMeasureDirective,
    NzToolTipComponent,
    NzIconDirective,
    NzTooltipDirective
  ],
  templateUrl: './danhsachhopdong.component.html',
  styleUrl: './danhsachhopdong.component.scss'
})
export class DanhsachhopdongComponent {
  listOfData = [
    {
      key: 1,
      name: 'Thừa kế (thế vị)',
      date: '15/08/2024',
      description:
        'Thừa kế (thế vị)<br>' +
        'Bên thỏa thuận phân chia: Bà LÊ THỊ PHƯỢNG (026140002182), <br>' +
        'Bà HOÀNG THỊ LIÊN (082163014413), <br>' +
        'Bà HOÀNG THỊ NGỌC TUYẾT (082176000726), <br>' +
        'Ông HOÀNG VĂN TIẾN (082065032879), <br>' +
        'Bà HOÀNG THANH THUẬN (082169002381), <br>' +
        'Ông HOÀNG LÊ QUỐC DANH (079202009355). <br>' +
        'Bên để lại di sản: Bà HOÀNG THỊ LIÊN (082163014413), <br>' +
        'Bà HOÀNG THỊ NGỌC TUYẾT (082176000726), <br>' +
        'Ông HOÀNG VĂN TIẾN (082065032879), <br>' +
        'Bà HOÀNG THANH THUẬN (082169002381), <br>' +
        'Ông HOÀNG LÊ QUỐC DANH (079202009355). <br>' +
        'Tài sản giao dịch: <br>' +
        'Tài sản: 132,4m2 (TÂN+PHƯỢNG), Vườn, Thửa 131, BĐ 11, Phường 2, Thị xã Gò Công, tỉnh Tiền Giang, giấy chứng nhận: Giấy chứng <br>' +
        'nhận quyền sử dụng đất, số: U 605021 Vào sổ cấp giấy chứng nhận quyền sử dụng đất số: 60049 QSDĐ/518/QĐ.UB, <br>' +
        'Tài sản: 72,9m2 (TÂN+PHƯỢNG), Đất ở, Thửa 99, BĐ 11, Phường 2, Thị xã Gò Công, tỉnh Tiền Giang, giấy chứng nhận: Giấy chứng <br>' +
        'nhận quyền sử dụng đất, số: U 605040 Vào sổ cấp giấy chứng nhận quyền sử dụng đất số: 60050 QSDĐ/518/QĐ.UB. <br>' +
        'Nội dung giao dịch: Di chúc ông Hoàng Văn Tân; bà HOÀNG THỊ LIÊN, bà HOÀNG THỊ NGỌC TUYẾT và ông HOÀNG LÊ QUỐC <br>' +
        'DANH thừa hưởng chung thửa 99, ông HOÀNG VĂN TIẾN và bà HOÀNG THANH THUẬN thừa hưởng chung thửa 131.',
      status: 'Chưa rút trích',
      actions: [
        { icon: 'export', tooltip: 'Rút trích hợp đồng'},
        { icon: 'edit', tooltip: 'Sửa' },
        { icon: 'tool', tooltip: 'Cập nhật' },
        { icon: 'plus', tooltip: 'Thêm' },
        { icon: 'desktop', tooltip: 'Xem' },
        { icon: 'file-done', tooltip: 'Phát hành hoá đơn' },
        { icon: 'download', tooltip: 'Tải xuống' },
        { icon: 'close', tooltip: 'Xóa' },
        { icon: 'signature', tooltip: 'Ký số' },
      ],
    },
    {
      key: 2,
      name: 'Thừa kế (thế vị)',
      date: '15/08/2024',
      description:
        'Thừa kế (thế vị)<br>' +
        'Bên thỏa thuận phân chia: Bà LÊ THỊ PHƯỢNG (026140002182), <br>' +
        'Bà HOÀNG THỊ LIÊN (082163014413), <br>' +
        'Bà HOÀNG THỊ NGỌC TUYẾT (082176000726), <br>' +
        'Ông HOÀNG VĂN TIẾN (082065032879), <br>' +
        'Bà HOÀNG THANH THUẬN (082169002381), <br>' +
        'Ông HOÀNG LÊ QUỐC DANH (079202009355). <br>' +
        'Bên để lại di sản: Bà HOÀNG THỊ LIÊN (082163014413), <br>' +
        'Bà HOÀNG THỊ NGỌC TUYẾT (082176000726), <br>' +
        'Ông HOÀNG VĂN TIẾN (082065032879), <br>' +
        'Bà HOÀNG THANH THUẬN (082169002381), <br>' +
        'Ông HOÀNG LÊ QUỐC DANH (079202009355). <br>' +
        'Tài sản giao dịch: <br>' +
        'Tài sản: 132,4m2 (TÂN+PHƯỢNG), Vườn, Thửa 131, BĐ 11, Phường 2, Thị xã Gò Công, tỉnh Tiền Giang, giấy chứng nhận: Giấy chứng <br>' +
        'nhận quyền sử dụng đất, số: U 605021 Vào sổ cấp giấy chứng nhận quyền sử dụng đất số: 60049 QSDĐ/518/QĐ.UB, <br>' +
        'Tài sản: 72,9m2 (TÂN+PHƯỢNG), Đất ở, Thửa 99, BĐ 11, Phường 2, Thị xã Gò Công, tỉnh Tiền Giang, giấy chứng nhận: Giấy chứng <br>' +
        'nhận quyền sử dụng đất, số: U 605040 Vào sổ cấp giấy chứng nhận quyền sử dụng đất số: 60050 QSDĐ/518/QĐ.UB. <br>' +
        'Nội dung giao dịch: Di chúc ông Hoàng Văn Tân; bà HOÀNG THỊ LIÊN, bà HOÀNG THỊ NGỌC TUYẾT và ông HOÀNG LÊ QUỐC <br>' +
        'DANH thừa hưởng chung thửa 99, ông HOÀNG VĂN TIẾN và bà HOÀNG THANH THUẬN thừa hưởng chung thửa 131.',
      status: 'Chưa rút trích',
      actions: [
        { icon: 'export', tooltip: 'Rút trích hợp đồng'},
        { icon: 'edit', tooltip: 'Sửa' },
        { icon: 'tool', tooltip: 'Cập nhật' },
        { icon: 'plus', tooltip: 'Thêm' },
        { icon: 'desktop', tooltip: 'Xem' },
        { icon: 'file-done', tooltip: 'Phát hành hoá đơn' },
        { icon: 'download', tooltip: 'Tải xuống' },
        { icon: 'close', tooltip: 'Xóa' },
        { icon: 'signature', tooltip: 'Ký số' },
      ],
    },
  ];

  searchValue = '';
  selectOptions = ['Tất cả', 'Chưa rút trích'];
  selectedOption = 'Tất cả';
  startDate = null;
  endDate = null;
  selectedStatus: any;
  statusOptions: (NgIterable<unknown> & NgIterable<any>) | undefined | null;

  search() {
    // filter data based on searchValue, startDate, endDate and selectedOption
  }

  reset() {
    this.searchValue = '';
    this.startDate = null;
    this.endDate = null;
    this.selectedOption = 'Tất cả';
  }
}
