import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
@Component({
  selector: 'jhi-themthongtinvochong',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './themthongtinvochong.component.html',
  styleUrl: './themthongtinvochong.component.scss'
})
export class ThemthongtinvochongComponent {
  @Input() isVisible!: boolean;
  @Input() isVisibleDetail!: boolean;
  @Output() nzOnCancel = new EventEmitter<void>();
  @Output() nzOnCancelDetail = new EventEmitter<void>();

  listOfData = [
    // Mẫu dữ liệu, bạn có thể thay đổi theo dữ liệu thực tế
    { name: 'Nguyễn Văn A', cmnd: '123456789', address: 'Hà Nội', gender: 'Nam', maritalStatus: 'Độc thân' },
    // Thêm dữ liệu khác
  ];

  handleSearch(): void {
    // Xử lý logic tìm kiếm
  }

  handleSelect(data: any): void {
    this.isVisibleDetail = true; // Mở modal chi tiết
  }

  handleCancel(): void {
    this.isVisible = false;
    this.nzOnCancel.emit();
  }

  handleCancelDetail(): void {
    this.isVisibleDetail = false;
    this.nzOnCancelDetail.emit();
  }

  handleSave(): void {
    // Xử lý logic lưu thông tin giấy chứng nhận kết hôn
    this.handleCancelDetail();
  }
}
