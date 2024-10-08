import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
import {DuongSuService} from "../../entities/duong-su/service/duong-su.service";
import {QuanHeDuongSuService} from "../../entities/quan-he-duong-su/service/quan-he-duong-su.service";
import {IDuongSu} from "../../entities/duong-su/duong-su.model";
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
  @Input() data!: { idDuongSu: number; thongTinDs: string | null | undefined };

  listOfData: IDuongSu[] = [];
  searchValue: string = '';

  constructor(private duongSuService: DuongSuService,
              private quanHeDuongSuService: QuanHeDuongSuService) {
  }

  handleSearch(): void {
    const parsedInfo = this.parseThongTinDs(this.data.thongTinDs || '');
    this.duongSuService.searchDuongSus(this.searchValue, parsedInfo.gioiTinh).subscribe(response => {
      this.listOfData = response.body || [];
    });
  }

  handleSelect(data: IDuongSu): void {
    this.isVisibleDetail = true; // Mở modal chi tiết
  }

  handleCancel(): void {
    this.isVisible = false;
    this.searchValue = '';
    this.listOfData = [];
    this.nzOnCancel.emit();
  }

  handleCancelDetail(): void {
    this.isVisibleDetail = false;
    this.nzOnCancelDetail.emit();
  }

  parseThongTinDs(thongTinDs: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(thongTinDs, 'text/html');

    const getValue = (label: string) => {
      const element = Array.from(doc.querySelectorAll('b')).find(b => b.textContent?.includes(label));
      return element ? element.nextSibling?.textContent?.trim() || '' : '';
    };
    return {
      gioiTinh: getValue('Giới tính:'),
      tinhTrangHonNhan: getValue('Tình trạng hôn nhân:')
    };
  }
}
