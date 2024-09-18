import {Component, OnInit} from '@angular/core';
import SharedModule from '../../shared/shared.module';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, throwError, tap, Observable} from 'rxjs';
import {DuongSuService} from "../../entities/duong-su/service/duong-su.service";
import dayjs from "dayjs/esm";
import {DATE_FORMAT, DATE_TIME_FORMAT} from "../../config/input.constants";
import { LoaiGiayTo } from 'app/entities/enumerations/loai-giay-to.model';
import {LoaiDuongSuService} from "../../entities/loai-duong-su/service/loai-duong-su.service";
import {IDuongSu} from "../../entities/duong-su/duong-su.model";
import {DanhMucTinhService} from "../../entities/danh-muc-tinh/service/danh-muc-tinh.service";
import {DanhMucHuyenService} from "../../entities/danh-muc-huyen/service/danh-muc-huyen.service";
import {DanhMucXaService} from "../../entities/danh-muc-xa/service/danh-muc-xa.service";
import {IDanhMucTinh} from "../../entities/danh-muc-tinh/danh-muc-tinh.model";
import {IDanhMucHuyen} from "../../entities/danh-muc-huyen/danh-muc-huyen.model";
import {IDanhMucXa} from "../../entities/danh-muc-xa/danh-muc-xa.model";
import {ILoaiDuongSu} from "../../entities/loai-duong-su/loai-duong-su.model";
@Component({
  selector: 'jhi-duongsu-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './duongsu-form.component.html',
  styleUrl: './duongsu-form.component.scss'
})
export class DuongsuFormComponent implements OnInit {
  isVisible = false;
  isGiayToKhacVisible: boolean = false;
  isGiayToKhacSpouseVisible: boolean = false;
  isGiayToKhacNguoiDaiDienVisible: boolean = false;
  isLoaiDuongSuReadonly = false;
  loaiDuongSuOptions: { label: string; value: string }[] = [];

  tinhs: IDanhMucTinh[] = [];
  huyens: IDanhMucHuyen[] = [];
  xas: IDanhMucXa[] = [];

  ttHonNhan: string | null = null;
  selectedLoaiDuongSu: string | null = 'ca_nhan';
  selectedtinhId: string | null = null;
  selectedhuyenId: string | null = null;
  selectedxaId: string | null = null;
  gioiTinh: any;

  // Dữ liệu của form
  newItem: IDuongSu = {
    idDuongSu: 0,
    tenDuongSu: '',
    diaChi: '',
    soDienThoai: '',
    email: '',
    fax: '',
    website: '',
    trangThai: null,
    thongTinDs: '',
    ngayThaoTac: null,
    nguoiThaoTac: null,
    idDsGoc: null,
    idMaster: '',
    idDonVi: null,
    strSearch: '',
    soGiayTo: '',
    ghiChu: '',
    idLoaiNganChan: null,
    syncStatus: null,
    loaiDuongSu: null, // Can be null or of type ILoaiDuongSu
    loaiGiayTo: null
  };

  secondPerson = {
    tenDuongSu: '',
    ngaySinh: null,
    giayToTuyThan: null,
    tenGiayTo: '',
    soGiayTo: '',
    ngayCap: null,
    noiCap: '',
    tinhThanhpho: '',
    quanHuyen: '',
    phuongXa: '',
    hoKhau: '',
    soNhaDuong: '',
    noiCuTruKhac: '',
    diaChiCuTruTamTru: '',
    sdt: '',
    email: '',
    fax: '',
    website: '',
    quocTich: '',
    ttDuongSu: '',
    giayChungNhanKetHon: {
      so: '',
      ngayCap: null,
      noiCap: ''
    }
  };
  ngaySinh: any;
  giayToTuyThan: any;
  tenGiayTo: any;
  ngayCap: any;
  noiCap: any;
  hoKhau: any;
  soNhaDuong: any;
  noiCuTruKhac: any;
  diaChiCuTruTamTru: any;
  quocTich: any;
  ttDuongSu: any;
  ghiChu: any;
  tenDuongSu1: any;
  ngaySinh1: any;
  giayToTuyThan1: any;
  tenGiayTo1: any;
  soGiayTo1: any;
  ngayCap1: any;
  noiCap1: any;
  tinhThanhpho1: any;
  quanHuyen1: any;
  phuongXa1: any;
  hoKhau1: any;
  soNhaDuong1: any;
  noiCuTruKhac1: any;
  diaChiCuTruTamTru1: any;
  sdt1: any;
  email1: any;
  fax1: any;
  website1: any;
  quocTich1: any;
  ttDuongSu1: any;
  soGiayCNKH: any;
  ngayCapNCKH: any;
  noiCapNCKH: any;
  tenCongTy: any;
  tenPhieu: any;
  tinhThanhpho: any;
  quanHuyen: any;
  phuongXa: any;
  truSo: any;
  dienThoai: any;
  fax: any;
  email: any;
  website: any;
  giayPhepThanhLap: any;
  dangKyKinhDoanh: any;
  noiCapGiayPhep: any;
  xungHoNguoiDaiDien: any;
  hoTenNguoiDaiDien: any;
  chucVuNguoiDaiDien: any;
  ngaySinhNguoiDaiDien: any;
  giayToNguoiDaiDien: any;
  tenGiayToNguoiDaiDien: any;
  soGiayToNguoiDaiDien: any;
  coQuanCapGiayToNguoiDaiDien: any;
  ngayCapGiayToNguoiDaiDien: any;
  hoKhauNguoiDaiDien: any;
  noiCuTruNguoiDaiDien: any;
  diaChiNguoiDaiDien: any;
  quocTichNguoiDaiDien: any;
  tinhTrangHoatDong: any;

  constructor(
    private duongSuFormService: DuongSuService,
    private loaiDuongSuService: LoaiDuongSuService,
    protected danhMucTinhService: DanhMucTinhService,
    protected danhMucHuyenService: DanhMucHuyenService,
    protected danhMucXaService: DanhMucXaService
  ) {}

  ngOnInit(): void {
    this.loadLoaiDuongSus();
    this.loadTins();
  }

  onLoaiDuongSuChange(value: string) {
    console.log('Selected value:', value);

    // Tìm đối tượng tương ứng từ danh sách các tùy chọn
    const selectedLoaiDuongSu = this.loaiDuongSuOptions.find(option => option.value === value);
    console.log('Selected Loai Duong Su:', selectedLoaiDuongSu);

    if (selectedLoaiDuongSu) {
      this.newItem.loaiDuongSu = {
        idLoaiDuongSu: selectedLoaiDuongSu.value,
        tenLoaiDuongSu: selectedLoaiDuongSu.label
      } as ILoaiDuongSu;
      console.log('Updated newItem.loaiDuongSu:', this.newItem.loaiDuongSu);
    } else {
      this.newItem.loaiDuongSu = null;
      console.log('No matching Loai Duong Su found. Set newItem.loaiDuongSu to null.');
    }
  }


  filterOption(input: string, option: any): boolean {
    return option.nzLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
  }

  loadLoaiDuongSus(): void {
    this.loaiDuongSuService.query().subscribe({
      next: (res) => {
        this.loaiDuongSuOptions = res.body?.map(loaiDuongSu => ({
          label: loaiDuongSu.tenLoaiDuongSu || '',
          value: loaiDuongSu.idLoaiDuongSu
        })) || [];
      },
      error: (err) => console.error('Error fetching loai duong sus', err)
    });
  }

  loadTins(): void {
    this.danhMucTinhService.query().subscribe({
      next: (res) => {
        this.tinhs = res.body || [];
      },
      error: (err) => console.error('Error fetching tinhs', err)
    });
  }

  ontinhChange(maTinh: string): void {
    this.danhMucHuyenService.getQuanHuyenByTinh(maTinh).subscribe({
      next: (res) => {
        this.huyens = res.body || [];
        this.xas = []; // Reset xã khi tỉnh thay đổi
        this.selectedhuyenId = null; // Reset ID huyện khi tỉnh thay đổi
        this.selectedxaId = null; // Reset ID xã khi tỉnh thay đổi
      },
      error: (err: any) => console.error('Error fetching huyens', err)
    });
  }

  onhuyenChange(maHuyen: string): void {
    this.danhMucXaService.getXaPhuongByHuyen(maHuyen).subscribe({
      next: (res) => {
        this.xas = res.body || [];
        this.selectedxaId = null; // Reset ID xã khi huyện thay đổi
      },
      error: (err: any) => console.error('Error fetching xas', err)
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const formData = this.mapFormDataToApiFormat();
    this.submitForm(formData);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  private resetForm(): void {
    this.selectedtinhId = null;
    this.selectedhuyenId = null;
    this.selectedxaId = null;

    // Khởi tạo đối tượng newItem
    this.newItem = {
      idDuongSu: 0, // Nếu cần
      tenDuongSu: '',
      diaChi: '',
      soDienThoai: '',
      email: '',
      fax: '',
      website: '',
      trangThai: null,
      thongTinDs: '',
      ngayThaoTac: null,
      nguoiThaoTac: null,
      idDsGoc: null,
      idMaster: '',
      idDonVi: null,
      strSearch: '',
      soGiayTo: '',
      ghiChu: '',
      idLoaiNganChan: null,
      syncStatus: null,
      loaiDuongSu: null, // Nếu cần khởi tạo mặc định khác
      loaiGiayTo: null
    };
  }

  private submitForm(formData: any): void {
    this.duongSuFormService.create(formData).pipe(
      tap(response => this.onSubmitSuccess(response)),
      catchError(error => this.onSubmitError(error))
    ).subscribe();
  }

  private onSubmitSuccess(response: any): void {
    console.log('Data successfully posted:', response);
    this.isVisible = false;
  }

  private onSubmitError(error: any): Observable<never> {
    console.error('Error posting data:', error);
    return throwError(() => new Error('Error posting data'));
  }

  private mapFormDataToApiFormat(): any {
    return this.newItem;
  }
}
