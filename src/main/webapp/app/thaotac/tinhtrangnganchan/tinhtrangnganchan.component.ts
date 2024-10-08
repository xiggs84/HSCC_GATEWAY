import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
import {IChiTietNganChan} from "../../entities/chi-tiet-ngan-chan/chi-tiet-ngan-chan.model";
import {IDuongSu} from "../../entities/duong-su/duong-su.model";
import dayjs from "dayjs/esm";
import {DuongSuService} from "../../entities/duong-su/service/duong-su.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {LoaiDuongSuService} from "../../entities/loai-duong-su/service/loai-duong-su.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ChiTietNganChanService} from "../../entities/chi-tiet-ngan-chan/service/chi-tiet-ngan-chan.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ThemthongtinnganchanComponent} from "../themthongtinnganchan/themthongtinnganchan.component";
import {ITaiSan} from "../../entities/tai-san/tai-san.model";
@Component({
  selector: 'jhi-tinhtrangnganchan',
  standalone: true,
  imports: [SharedModule, ThemthongtinnganchanComponent],
  templateUrl: './tinhtrangnganchan.component.html',
  styleUrl: './tinhtrangnganchan.component.scss'
})
export class TinhtrangnganchanComponent {
  @Input() isVisible!: boolean;
  @Input() data: IChiTietNganChan[] = [];
  @Input() duongSu: IDuongSu | null = null;
  @Input() taiSan: ITaiSan | null = null;
  @Output() nzOnCancel = new EventEmitter<unknown>();

  isUpdateModalVisible = false;
  selectedItemForUpdate: IChiTietNganChan | undefined = undefined;

  constructor(private modal: NzModalService,
              private chiTietNganChanService: ChiTietNganChanService,
              private message: NzMessageService,
              private sanitizer: DomSanitizer) {}

  item: IChiTietNganChan = {
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

  actions = [
    { icon: 'edit', tooltip: 'Chỉnh sửa', type: 'edit' },
    { icon: 'delete', tooltip: 'Xóa', type: 'delete' }
  ];


  handleCancel(): void {
    this.isVisible = false;
    this.nzOnCancel.emit();
  }

  onActionClick(actionType: string, item: IChiTietNganChan): void {
    switch (actionType) {
      case 'delete':
        this.showDeleteConfirm(item.id);
        break;
      case 'edit':
        this.openUpdateModal(item);
        break;
      default:
        console.error('Unknown action type:', actionType);
        }
  }

  showDeleteConfirm(id: number): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa ngăn chặn này?',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzCancelText: 'Không',
      nzMaskClosable: true,
      nzOnOk: () => this.deleteNganChan(id)
    });
  }

  deleteNganChan(id: number): void {
    this.chiTietNganChanService.delete(id).subscribe({
      next: () => {
        this.message.success('Xóa ngăn chặn thành công');
        // Load lại dữ liệu sau khi xóa
        this.loadContainmentData();
      },
      error: (err) => {
        console.error('Error deleting ngan chan', err);
        this.message.error('Xóa ngăn chặn thất bại');
      },
    });
  }

  openUpdateModal(item: IChiTietNganChan): void {
    this.selectedItemForUpdate = item;
    this.isUpdateModalVisible = true;
  }

  closeUpdateModal(): void {
    this.isUpdateModalVisible = false;
    this.loadContainmentData();
    this.selectedItemForUpdate = undefined;
  }

  loadContainmentData(): void {
    const loaiDoiTuong = this.taiSan ? 2 : 1;
    const idDoiTuong = this.taiSan?.idTaiSan || this.duongSu?.idDuongSu;

    if (!idDoiTuong) {
      console.error('Không có id đối tượng hoặc tài sản để tải dữ liệu ngăn chặn');
      return;
    }

    const queryParams = {
      'idDoiTuong.equals': idDoiTuong,
      'loaiDoiTuong.equals': loaiDoiTuong,
    };

    this.chiTietNganChanService.query(queryParams).subscribe({
      next: (response) => {
        this.data = response.body || [];
      },
      error: (err) => {
        console.error('Error loading containment data', err);
        this.message.error('Tải dữ liệu ngăn chặn thất bại');
      },
    });
  }

  getLoaiNganChanLabel(loaiNganChan: string | null): string {
    const loaiNganChanMap: Record<string, string> = {
      '0': 'Ngăn chặn',
      '1': 'Giải toả',
      '2': 'Giải chấp',
    };
    return loaiNganChan ? loaiNganChanMap[loaiNganChan] || 'N/A' : 'N/A';
  }

  getLoaiNganChanThoiHan(item: IChiTietNganChan): string {
    if (item.ngayKtNganChan) {
      return 'Có thời hạn';
    }
    return 'Vô thời hạn';
  }

  formatContainmentInfo(item: IChiTietNganChan): SafeHtml {
    const loaiNganChanString = item.loaiNganChan?.toString() || null;

    let loaiNganChanFormatted = this.getLoaiNganChanLabel(loaiNganChanString);
    if (loaiNganChanString === '0') {
      loaiNganChanFormatted = `<span style="color: red;">${loaiNganChanFormatted}</span>`;
    } else if (loaiNganChanString === '1') {
      loaiNganChanFormatted = `<span style="color: green;">${loaiNganChanFormatted}</span>`;
    } else if (loaiNganChanString === '2') {
      loaiNganChanFormatted = `<span style="color: gold;">${loaiNganChanFormatted}</span>`;
    }

    const formattedString = `
    <b>Loại ngăn chặn: ${loaiNganChanFormatted}</b><br>
    <b>Số HS CV:</b> ${item.soHsCv || 'N/A'}<br>
    <b>Số CC:</b> ${item.soCc || 'N/A'}<br>
    <b>Số vào sổ:</b> ${item.soVaoSo || 'N/A'}<br>
    <b>Mô tả:</b> ${item.moTa || 'N/A'}<br>
    <b>Ngày ngăn chặn(PCC):</b> ${item.ngayNganChan ? dayjs(item.ngayNganChan).format('DD/MM/YYYY') : 'N/A'}<br>
    <b>Ngày ngăn chặn(công văn):</b> ${item.ngayCongVan ? dayjs(item.ngayCongVan).format('DD/MM/YYYY') : 'N/A'}<br>
    <b>Ngày kết thúc ngăn chặn:</b> ${item.ngayKtNganChan ? dayjs(item.ngayKtNganChan).format('DD/MM/YYYY') : 'N/A'}
  `;

    return this.sanitizer.bypassSecurityTrustHtml(formattedString);
  }
}
