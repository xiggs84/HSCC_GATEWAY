import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
@Component({
  selector: 'jhi-lichsugiaodichduongsu',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './lichsugiaodichduongsu.component.html',
  styleUrl: './lichsugiaodichduongsu.component.scss'
})
export class LichsugiaodichduongsuComponent {
  @Input() isVisible!: boolean;
  @Output() nzOnCancel = new EventEmitter<unknown>();
  // Mẫu dữ liệu cho bảng
  data: Record<string, string>[] = [
    {
      'Loại hợp đồng': 'Hợp đồng A',
      'Ngày ký hợp đồng': '2024-08-01',
      'Số công chứng và tên sổ': '1234 / Sổ A',
      'Thông tin chung': 'Thông tin chi tiết hợp đồng A',
      'Người thực hiện': 'Nguyễn Văn A',
      'Trạng thái': 'Đã rút trích'
    },
    {
      'Loại hợp đồng': 'Hợp đồng B',
      'Ngày ký hợp đồng': '2024-09-15',
      'Số công chứng và tên sổ': '5678 / Sổ B',
      'Thông tin chung': 'Thông tin chi tiết hợp đồng B',
      'Người thực hiện': 'Trần Thị B',
      'Trạng thái': 'Chưa rút trích'
    },
    {
      'Loại hợp đồng': 'Hợp đồng C',
      'Ngày ký hợp đồng': '2024-07-22',
      'Số công chứng và tên sổ': '9012 / Sổ C',
      'Thông tin chung': 'Thông tin chi tiết hợp đồng C',
      'Người thực hiện': 'Lê Văn C',
      'Trạng thái': 'Đã rút trích'
    }
  ];



  handleCancel(): void {
    this.isVisible = false;
    this.nzOnCancel.emit();
  }
}
