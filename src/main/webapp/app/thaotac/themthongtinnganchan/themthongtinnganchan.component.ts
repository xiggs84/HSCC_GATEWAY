import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
@Component({
  selector: 'jhi-themthongtinnganchan',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './themthongtinnganchan.component.html',
  styleUrl: './themthongtinnganchan.component.scss'
})
export class ThemthongtinnganchanComponent {
  @Input() isVisible!: boolean;
  @Output() nzOnCancel = new EventEmitter<unknown>();

  loaiNgchan: string | null = null;
  soCc: Date | null = null;
  moTa: Date | null = null;
  ngayNgchanPcc: Date | null = null;
  soHoSoCv: string = '';
  soVaoSo: string = '';
  ngayNgchanCv: Date | null = null;
  ngayKetThucNgchan: Date | null = null;

  loaiNgchanOptions = [
    { value: 'nganchan', label: 'Ngăn chặn' },
    { value: 'giaitoa', label: 'Giải toả' },
    { value: 'giaichap', label: 'Giải chấp' }
  ];

  handleCancel(): void {
    this.isVisible = false;
    this.nzOnCancel.emit();
  }
}
