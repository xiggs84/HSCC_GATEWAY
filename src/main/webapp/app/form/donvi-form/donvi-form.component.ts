import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from "../../shared/shared.module";
import {IDanhMucDonVi, NewDanhMucDonVi} from "../../entities/danh-muc-don-vi/danh-muc-don-vi.model";
import {DanhMucTinhService} from "../../entities/danh-muc-tinh/service/danh-muc-tinh.service"
import {IDanhMucTinh} from "../../entities/danh-muc-tinh/danh-muc-tinh.model";
import {IDanhMucHuyen} from "../../entities/danh-muc-huyen/danh-muc-huyen.model";
import {IDanhMucXa} from "../../entities/danh-muc-xa/danh-muc-xa.model";
import {DanhMucHuyenService} from "../../entities/danh-muc-huyen/service/danh-muc-huyen.service";
import {DanhMucXaService} from "../../entities/danh-muc-xa/service/danh-muc-xa.service";
import {DanhMucDonViService} from "../../entities/danh-muc-don-vi/service/danh-muc-don-vi.service";
import dayjs from 'dayjs/esm';
import {CapQuanLyService} from "../../entities/cap-quan-ly/service/cap-quan-ly.service";
import {LoaiDonViService} from "../../entities/loai-don-vi/service/loai-don-vi.service";
import {NhiemVuService} from "../../entities/nhiem-vu/service/nhiem-vu.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
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
  loaiDonViOptions: any[] = [];
  nhiemVuOptions: any[] = [];
  capQuanLyOptions: any[] = [];
  donViQuanLyOptions: any[] = [];

  selectedtinhId: string | null = null;
  selectedhuyenId: string | null = null;
  selectedxaId: string | null = null;

  soNha: string | null = null;
  xaPhuong: string | null = null;
  quanHuyen: string | null = null;
  tinhThanhPho: string | null = null;
  newItem: IDanhMucDonVi = {
    idDonVi: 0,
    tenDonVi: '',
    loaiDonVi: null,
    nhiemVu: null,
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
    protected danhMucXaService: DanhMucXaService,
    private nhiemVuService: NhiemVuService,
    private loaiDonViService: LoaiDonViService,
    private capQuanLyService: CapQuanLyService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loadtinhs();
    this.loadNhiemVus();
    this.loadLoaiDonVis();
    this.loadCapQuanLys();
    this.loadDonViQuanLys();
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
      this.ontinhChange(this.selectedtinhId)
        .then(() => {
          this.selectedhuyenId = this.huyens.find(h => h.tenHuyen === this.quanHuyen)?.maHuyen || null;
          if (this.selectedhuyenId) {
            return this.onhuyenChange(this.selectedhuyenId);  // RETURN promise here
          }
          return Promise.resolve(); // Trả về Promise.resolve() nếu không có selectedhuyenId
        })
        .then(() => {
          this.selectedxaId = this.xas.find(x => x.tenXa === this.xaPhuong)?.maXa || null;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false; // Handle any error in the chain
        });
    } else {
      this.isLoading = false; // Nếu không có tỉnh, đặt isLoading thành false
    }
  }

  private extractAddressParts(): void {
    if (this.newItem.diaChi) {
      const addressParts = this.newItem.diaChi.split(',').map(part => part.trim());
      if (addressParts.length === 4) {
        this.soNha = addressParts[0];
        this.xaPhuong = addressParts[1];
        this.quanHuyen = addressParts[2];
        this.tinhThanhPho = addressParts[3];
      } else if (addressParts.length === 3) {
        this.soNha = null;
        this.xaPhuong = addressParts[0];
        this.quanHuyen = addressParts[1];
        this.tinhThanhPho = addressParts[2];
      }
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
      nhiemVu: null,
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

    const queryParams = {
      'tenDonVi.equals': this.newItem.tenDonVi || '',
      page: 0,
      size: 1
    };

    this.danhMucDonViService.query(queryParams).subscribe({
      next: (res) => {
        const danhMucDonViArray = res.body || [];

        if (danhMucDonViArray.length > 0) {
          // Nếu đơn vị đã tồn tại, thực hiện cập nhật
          const existingDonVi = danhMucDonViArray[0];
          this.newItem.idDonVi = existingDonVi.idDonVi;
          this.danhMucDonViService.update(this.newItem).subscribe({
            next: () => {
              this.notification.success('Cập nhật thành công', 'Đơn vị đã được cập nhật thành công!');
              this.handleCancel();
              this.dataUpdated.emit();
            },
            error: (err) => {
              this.notification.error('Lỗi cập nhật', 'Có lỗi xảy ra khi cập nhật đơn vị.');
              console.error('Lỗi khi cập nhật đơn vị:', err);
            }
          });
        } else {
          // Nếu đơn vị chưa tồn tại, thực hiện thêm mới
          const newDonVi: NewDanhMucDonVi = { ...this.newItem, idDonVi: null }; // Đặt idDonVi về null để phù hợp với kiểu NewDanhMucDonVi

          this.danhMucDonViService.create(newDonVi).subscribe({
            next: () => {
              this.notification.success('Thêm mới thành công', 'Đơn vị đã được thêm mới thành công!');
              this.handleCancel();
              this.dataUpdated.emit();
            },
            error: (err) => {
              this.notification.error('Lỗi thêm mới', 'Có lỗi xảy ra khi thêm mới đơn vị.');
              console.error('Lỗi khi thêm mới đơn vị:', err);
            }
          });
        }
      },
      error: (err) => {
        this.notification.error('Lỗi kiểm tra', 'Có lỗi xảy ra khi kiểm tra đơn vị.');
        console.error('Lỗi khi kiểm tra đơn vị:', err);
      }
    });
  }

  private loadNhiemVus(): void {
    this.nhiemVuService.query().subscribe({
      next: (res) => {
        this.nhiemVuOptions = res.body?.map(nhiemVu => ({
          label: nhiemVu.tenNhiemVu || '',
          value: nhiemVu.idNhiemVu
        })) || [];
      },
      error: (err) => console.error('Error fetching nhiem vus', err)
    });
  }

  private loadLoaiDonVis(): void {
    this.loaiDonViService.query().subscribe({
      next: (res) => {
        this.loaiDonViOptions = res.body?.map(loaiDonVi => ({
          label: loaiDonVi.tenLoaiDv || '',
          value: loaiDonVi.idLoaiDv
        })) || [];
      },
      error: (err) => console.error('Error fetching loai don vis', err)
    });
  }

  private loadCapQuanLys(): void {
    this.capQuanLyService.query().subscribe({
      next: (res) => {
        this.capQuanLyOptions = res.body?.map(capQuanLy => ({
          label: capQuanLy.tenCapQl || '',
          value: capQuanLy.idCapQl
        })) || [];
      },
      error: (err) => console.error('Error fetching cap quan lys', err)
    });
  }

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

  ontinhChange(maTinh: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const queryParams = {
        'maTinh.equals': maTinh
      };

      this.danhMucHuyenService.query(queryParams).subscribe({
        next: (res) => {
          this.huyens = res.body || [];
          this.xas = []; // Reset xã khi tỉnh thay đổi
          this.selectedhuyenId = null; // Reset ID huyện khi tỉnh thay đổi
          this.selectedxaId = null; // Reset ID xã khi tỉnh thay đổi
          resolve();
        },
        error: (err: any) => {
          console.error('Error fetching huyens', err);
          reject();
        }
      });
    });
  }

  onhuyenChange(maHuyen: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const queryParams = {
        'maHuyen.equals': maHuyen
      };

      this.danhMucXaService.query(queryParams).subscribe({
        next: (res) => {
          this.xas = res.body || [];
          this.selectedxaId = null; // Reset ID xã khi huyện thay đổi
          resolve();
        },
        error: (err: any) => {
          console.error('Error fetching xas', err);
          reject();
        }
      });
    });
  }

  private loadDonViQuanLys(): void {
    this.danhMucDonViService.query().subscribe({
      next: (res) => {
        this.donViQuanLyOptions = res.body?.map(donVi => ({
          label: donVi.tenDonVi || '',
          value: donVi.idDonVi
        })) || [];
      },
      error: (err) => console.error('Error fetching don vi quan lys', err)
    });
  }
}
