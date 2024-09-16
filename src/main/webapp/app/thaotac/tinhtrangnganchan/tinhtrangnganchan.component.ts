import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
@Component({
  selector: 'jhi-tinhtrangnganchan',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tinhtrangnganchan.component.html',
  styleUrl: './tinhtrangnganchan.component.scss'
})
export class TinhtrangnganchanComponent {
  @Input() isVisible!: boolean;
  @Output() nzOnCancel = new EventEmitter<unknown>();

  // Mẫu dữ liệu cho bảng
  data: Record<string, string>[] = [
    {
      'Tên đương sự': 'Nguyễn Văn A',
      'Thông tin ngăn chặn': 'Thông tin chi tiết ngăn chặn A'
    },
    {
      'Tên đương sự': 'Trần Thị B',
      'Thông tin ngăn chặn': 'Thông tin chi tiết ngăn chặn B'
    },
    {
      'Tên đương sự': 'Lê Văn C',
      'Thông tin ngăn chặn': 'Thông tin chi tiết ngăn chặn C'
    }
  ];

  // Thao tác cho các hành động
  actions = [
    { icon: 'edit', tooltip: 'Chỉnh sửa', type: 'edit' },
    { icon: 'delete', tooltip: 'Xóa', type: 'delete' }
  ];

  handleCancel(): void {
    this.isVisible = false;
    this.nzOnCancel.emit();
  }

  onActionClick(type: string, item: any): void {
    // Xử lý sự kiện khi click vào các hành động
    console.log(`Action: ${type} on`, item);
  }
}
