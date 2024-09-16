import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
import {IDanhMucDonVi, NewDanhMucDonVi} from "../../entities/danh-muc-don-vi/danh-muc-don-vi.model";
import {LoaiDonVi} from "../../entities/enumerations/loai-don-vi.model";
import {NhiemVu} from "../../entities/enumerations/nhiem-vu.model";
import {CapQuanLy} from "../../entities/enumerations/cap-quan-ly.model";
import {DanhMucTinhService} from "../../entities/danh-muc-tinh/service/danh-muc-tinh.service"
import {IDanhMucTinh} from "../../entities/danh-muc-tinh/danh-muc-tinh.model";
import {IDanhMucHuyen} from "../../entities/danh-muc-huyen/danh-muc-huyen.model";
import {IDanhMucXa} from "../../entities/danh-muc-xa/danh-muc-xa.model";
import {DanhMucHuyenService} from "../../entities/danh-muc-huyen/service/danh-muc-huyen.service";
import {DanhMucXaService} from "../../entities/danh-muc-xa/service/danh-muc-xa.service";
import {DanhMucDonViService} from "../../entities/danh-muc-don-vi/service/danh-muc-don-vi.service";
import dayjs from 'dayjs/esm';
import {DATE_FORMAT} from "../../config/input.constants";
@Component({
  selector: 'jhi-donvi-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './donvi-form.component.html',
  styleUrl: './donvi-form.component.scss'
})
export class DonviFormComponent {
  isVisible = false;
  isLoading = false;
  @Input() modalTitle: string = '';
  @Output() dataUpdated = new EventEmitter<void>();

  tinhs: IDanhMucTinh[] = [];
  huyens: IDanhMucHuyen[] = [];
  xas: IDanhMucXa[] = [];

  selectedtinhId: number | null = null;
  selectedhuyenId: number | null = null;
  selectedxaId: number | null = null;

  soNha: string | null = null;
  xaPhuong: string | null = null;
  quanHuyen: string | null = null;
  tinhThanhPho: string | null = null;
  newItem: IDanhMucDonVi = {
    idDonVi: 0,
    tenDonVi: '',
    loaiDonVi: null,
    loaiNhiemVu: null,
    maSoThue: '',
    soDienThoai: '',
    capQuanLy: null,
    nguoiDaiDien: '',
    idDonViQl: null,
    diaChi: '',
    hoaDonDt: 0,
    soNha: '',
    ngayKhaiBao: null
  };

  constructor(
    protected danhMucDonViService: DanhMucDonViService,
    protected danhMucTinhService: DanhMucTinhService,
    protected danhMucHuyenService: DanhMucHuyenService,
    protected danhMucXaService: DanhMucXaService
  ) {}

  ngOnInit(): void {
    this.loadtinhs();
  }

  showModal(): void {
    this.isVisible = true;
  }

  loadItemData(item: IDanhMucDonVi): void {
    this.isLoading = true;
    this.newItem = { ...item };
    this.extractAddressParts();

    // Set selected IDs based on extracted address
    this.selectedtinhId = this.tinhs.find(t => t.tenTinh === this.tinhThanhPho)?.maTinh || null;

    if (this.selectedtinhId) {
      this.ontinhChange(this.selectedtinhId);

      // Đợi một chút sau khi tỉnh đã thay đổi để có thể load huyện và xã
      setTimeout(() => {
        this.selectedhuyenId = this.huyens.find(h => h.tenHuyen === this.quanHuyen)?.maHuyen || null;

        if (this.selectedhuyenId) {
          this.onhuyenChange(this.selectedhuyenId);

          // Đợi thêm một chút sau khi huyện đã thay đổi để load xã
          setTimeout(() => {
            this.selectedxaId = this.xas.find(x => x.tenXa === this.xaPhuong)?.maXa || null;
            this.isLoading = false;
          }, 300); // Thời gian chờ để dữ liệu huyện load xong
        } else {
          this.isLoading = false; // Nếu không có huyện, vẫn đặt isLoading thành false
        }
      }, 300); // Thời gian chờ để dữ liệu tỉnh load xong
    } else {
      this.isLoading = false; // Nếu không có tỉnh, đặt isLoading thành false
    }
  }

  private extractAddressParts(): void {
    if (this.newItem.diaChi) {
      const addressParts = this.newItem.diaChi.split(',').map(part => part.trim());
      this.soNha = addressParts.length > 0 ? addressParts[0] : null;
      this.xaPhuong = addressParts.length > 1 ? addressParts[1] : null;
      this.quanHuyen = addressParts.length > 2 ? addressParts[2] : null;
      this.tinhThanhPho = addressParts.length > 3 ? addressParts[3] : null;
    } else {
      this.soNha = null;
      this.xaPhuong = null;
      this.quanHuyen = null;
      this.tinhThanhPho = null;
    }
  }

  private resetForm(): void {
    this.soNha = null;
    this.xaPhuong = null;
    this.quanHuyen = null;
    this.tinhThanhPho = null;

    this.selectedtinhId = null;
    this.selectedhuyenId = null;
    this.selectedxaId = null;

    this.newItem = {
      idDonVi: 0,
      tenDonVi: '',
      loaiDonVi: null,
      loaiNhiemVu: null,
      maSoThue: '',
      soDienThoai: '',
      capQuanLy: null,
      nguoiDaiDien: '',
      idDonViQl: null,
      diaChi: '',
      hoaDonDt: null,
      soNha: ''
    };
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  handleOk(): void {
    const tinh = this.tinhs.find(t => t.maTinh === this.selectedtinhId)?.tenTinh || '';
    const huyen = this.huyens.find(h => h.maHuyen === this.selectedhuyenId)?.tenHuyen || '';
    const xa = this.xas.find(x => x.maXa === this.selectedxaId)?.tenXa || '';

    this.newItem.diaChi = `${this.newItem.soNha ? this.newItem.soNha + ', ' : ''}${xa ? xa + ', ' : ''}${huyen ? huyen + ', ' : ''}${tinh ? tinh : ''}`;
    this.newItem.hoaDonDt = this.newItem.hoaDonDt ? 1 : 0;
    this.newItem.ngayKhaiBao = dayjs();
    this.saveDonvi();
    console.log('OK clicked, form data:', this.newItem);
    this.isVisible = false;
  }


  saveDonvi(): void {
    this.newItem.hoaDonDt = this.newItem.hoaDonDt ? 1 : 0;
    this.danhMucDonViService.searchByTenDonVi(this.newItem.tenDonVi || '').subscribe({
      next: (res) => {
        const danhMucDonViArray = res.body || [];

        if (danhMucDonViArray.length > 0) {
          // Nếu đơn vị đã tồn tại, thực hiện cập nhật
          const existingDonVi = danhMucDonViArray[0];
          this.newItem.idDonVi = existingDonVi.idDonVi;
          this.danhMucDonViService.update(this.newItem).subscribe({
            next: () => {
              console.log('Đơn vị đã được cập nhật thành công!');
              this.handleCancel();
              this.dataUpdated.emit();
            },
            error: (err) => {
              console.error('Lỗi khi cập nhật đơn vị:', err);
            }
          });
        } else {
          // Nếu đơn vị chưa tồn tại, thực hiện thêm mới
          const newDonVi: NewDanhMucDonVi = { ...this.newItem, idDonVi: null }; // Đặt idDonVi về null để phù hợp với kiểu NewDanhMucDonVi

          this.danhMucDonViService.create(newDonVi).subscribe({
            next: () => {
              alert('Đơn vị đã được thêm mới thành công!');
              this.handleCancel();
              this.dataUpdated.emit();
            },
            error: (err) => {
              alert('Lỗi!');
              console.error('Lỗi khi thêm mới đơn vị:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Lỗi khi kiểm tra đơn vị:', err);
      }
    });
  }

  loaiDonViOptions = Object.keys(LoaiDonVi).map(key => ({
    label: LoaiDonVi[key as keyof typeof LoaiDonVi],
    value: key
  }));

  nhiemVuOptions = Object.keys(NhiemVu).map(key => ({
    label: NhiemVu[key as keyof typeof NhiemVu],
    value: key
  }));

  capQuanLyOptions = Object.keys(CapQuanLy).map(key => ({
    label: CapQuanLy[key as keyof typeof CapQuanLy],
    value: key
  }));

  loadtinhs(): void {
    this.danhMucTinhService.query().subscribe({
      next: (res) => {
        this.tinhs = res.body || [];
      },
      error: (err) => console.error('Error fetching tinhs', err),
    });
  }

  filterOption(input: string, option: any): boolean {
    return option.nzLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
  }

  ontinhChange(maTinh: number): void {
    if (maTinh == null || isNaN(maTinh)) {
      console.error('Invalid tinh ID:', maTinh);
      return;
    }

    this.huyens = [];
    this.xas = [];

    // this.selectedhuyenId = null;
    // this.selectedxaId = null;

    this.danhMucHuyenService.getQuanHuyenByTinh(maTinh).subscribe({
      next: (res) => {
        this.huyens = res.body || [];
      },
      error: (err: any) => console.error('Error fetching huyens', err),
    });
  }

  onhuyenChange(maHuyen: number): void {
    if (maHuyen == null || isNaN(maHuyen)) {
      console.error('Invalid huyen ID:', maHuyen);
      return;
    }

    this.xas = [];
    // this.selectedxaId = null;

    this.danhMucXaService.getXaPhuongByHuyen(maHuyen).subscribe({
      next: (res) => {
        this.xas = res.body || [];
      },
      error: (err: any) => console.error('Error fetching xas', err),
    });
  }
}
