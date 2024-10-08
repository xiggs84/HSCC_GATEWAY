import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import SharedModule from "../../shared/shared.module";
import {IChiTietNganChan, NewChiTietNganChan} from "../../entities/chi-tiet-ngan-chan/chi-tiet-ngan-chan.model";
import {ChiTietNganChanService} from "../../entities/chi-tiet-ngan-chan/service/chi-tiet-ngan-chan.service";
import {NzMessageService} from "ng-zorro-antd/message";
import dayjs from "dayjs/esm";
import {NzI18nService, vi_VN} from "ng-zorro-antd/i18n";
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
  @Input() data?: { idDoiTuong: number; loaiDoiTuong: number; loaiNganChan?: any };
  @Input() dataUpdate?: IChiTietNganChan;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  isEditing = false;
  loaiNganChanThoiHan: string | undefined;
  showNgayKetThuc: boolean = true;

  newItem: IChiTietNganChan = {
    id: 0,
    idDoiTuong: undefined,
    loaiDoiTuong: undefined,
    loaiNganChan: undefined,
    moTa: undefined,
    ngayBdNganChan: undefined,
    ngayCongVan: undefined,
    ngayKtNganChan: undefined,
    ngayNganChan: undefined,
    ngayThaoTac: undefined,
    nguoiThaoTac: undefined,
    soCc: undefined,
    soHsCv: undefined,
    soVaoSo: undefined,
    trangThai: undefined
  }

  ngay: any = {
    ngayBdNganChan: undefined,
    ngayCongVan: undefined,
    ngayKtNganChan: undefined,
    ngayNganChan: undefined
  }

  constructor(private chiTietNganChanService: ChiTietNganChanService,
              private messageService: NzMessageService) {
  }

  loaiNgchanOptions = [
    { value: 0, label: 'Ngăn chặn' },
    { value: 1, label: 'Giải toả' },
    { value: 2, label: 'Giải chấp' }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataUpdate'] && this.dataUpdate) {
      this.isEditing = true;
      this.newItem = {
        ...this.dataUpdate
      };

      this.ngay.ngayBdNganChan = this.newItem.ngayBdNganChan?.toDate();
      this.ngay.ngayCongVan = this.newItem.ngayCongVan?.toDate();
      this.ngay.ngayKtNganChan = this.newItem.ngayKtNganChan?.toDate();
      this.ngay.ngayNganChan = this.newItem.ngayNganChan?.toDate();

      if (!this.newItem.ngayKtNganChan) {
        this.loaiNganChanThoiHan = 'voThoiHan';
        this.showNgayKetThuc = false;
      } else {
        this.loaiNganChanThoiHan = 'coThoiHan';
      }
    } else if (changes['data'] && this.data) {
      this.newItem.idDoiTuong = this.data.idDoiTuong;
      this.newItem.loaiDoiTuong = this.data.loaiDoiTuong;
      this.newItem.loaiNganChan = this.data.loaiNganChan;
    }
  }

  handleOk(): void {
    if (this.isEditing) {
      this.updateNganChan(); // Gọi hàm cập nhật
    } else {
      this.createNganChan(); // Gọi hàm thêm mới
    }
  }

  private createNganChan(): void {
    const newChiTietNganChan: NewChiTietNganChan = {
      ...this.newItem,
      id: null, // Không đưa thuộc tính id khi tạo mới
      ngayBdNganChan: this.formatToDayjs(this.newItem.ngayBdNganChan),
      ngayCongVan: this.formatToDayjs(this.newItem.ngayCongVan),
      ngayKtNganChan: this.formatToDayjs(this.newItem.ngayKtNganChan),
      ngayNganChan: this.formatToDayjs(this.newItem.ngayNganChan),
      ngayThaoTac: this.formatToDayjs(this.newItem.ngayThaoTac),
    };

    this.chiTietNganChanService.create(newChiTietNganChan).subscribe({
      next: () => {
        this.messageService.success('Thêm thông tin ngăn chặn thành công!'); // Thông báo thành công
        this.handleCancel();
      },
      error: () => {
        this.messageService.error('Có lỗi xảy ra khi thêm thông tin ngăn chặn.'); // Thông báo lỗi
      }
    });
  }

  private updateNganChan(): void {
    const updatedChiTietNganChan: IChiTietNganChan = {
      ...this.newItem,
      ngayBdNganChan: this.formatToDayjs(this.newItem.ngayBdNganChan),
      ngayCongVan: this.formatToDayjs(this.newItem.ngayCongVan),
      ngayKtNganChan: this.formatToDayjs(this.newItem.ngayKtNganChan),
      ngayNganChan: this.formatToDayjs(this.newItem.ngayNganChan),
      ngayThaoTac: this.formatToDayjs(this.newItem.ngayThaoTac),
    };

    this.chiTietNganChanService.update(updatedChiTietNganChan).subscribe({
      next: () => {
        this.messageService.success('Cập nhật thông tin ngăn chặn thành công!'); // Thông báo thành công
        this.handleCancel();
      },
      error: () => {
        this.messageService.error('Có lỗi xảy ra khi cập nhật thông tin ngăn chặn.'); // Thông báo lỗi
      }
    });
  }

// Hàm chuyển đổi sang Dayjs
  private formatToDayjs(date: any): dayjs.Dayjs | null {
    if (!date) return null;
    const d = dayjs(date);
    return d.isValid() ? d : null;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
    this.nzOnCancel.emit();
  }

  resetForm(): void {
    this.newItem = {
      id: 0,
      idDoiTuong: undefined,
      loaiDoiTuong: undefined,
      loaiNganChan: undefined,
      moTa: undefined,
      ngayBdNganChan: undefined,
      ngayCongVan: undefined,
      ngayKtNganChan: undefined,
      ngayNganChan: undefined,
      ngayThaoTac: undefined,
      nguoiThaoTac: undefined,
      soCc: undefined,
      soHsCv: undefined,
      soVaoSo: undefined,
      trangThai: undefined
    };
  }

  closeModal(): void {
    this.isVisible = false;
    this.resetForm();
    this.isVisibleChange.emit(this.isVisible);
  }

  onLoaiNganChanChange(value: string): void {
    if (value === 'voThoiHan') {
      this.showNgayKetThuc = false;
      this.newItem.ngayKtNganChan = null;
    } else {
      this.showNgayKetThuc = true;
    }
  }

  onDateChange(type: string, value: Date | null): void {
    switch (type) {
      case 'ngayNganChan':
        this.newItem.ngayNganChan = value ? dayjs(value) : null;
        break;
      case 'ngayCongVan':
        this.newItem.ngayCongVan = value ? dayjs(value) : null;
        break;
      case 'ngayKtNganChan':
        this.newItem.ngayKtNganChan = value ? dayjs(value) : null;
        break;
      default:
        break;
    }
  }
}
