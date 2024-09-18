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

  secondPerson: IDuongSu = {
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
    loaiDuongSu: null,
    loaiGiayTo: null
  };

  giayChungNhanKetHon = {
    soGiayCNKH: '',
    ngayCap: null,
    noiCap: ''
  }

  thongTinKhacCaNhanA = {
    gioiTinh: '',
    ngaySinh: null,
    giayToTuyThan: {
      tenGiayTo: '',
      ngayCap: null,
      noiCap: ''
    },
    hoKhau: '',
    soNha: '',
    noiCuTruKhac: '',
    diaChiCuTruTamTru: '',
    quocTich: '',
    tinhTrangDuongSu: '',
    tinhTrangHonNhan: 'ChuaKetHon'
  }

  thongTinKhacCaNhanB = {
    gioiTinh: '',
    ngaySinh: null,
    giayToTuyThan: {
      tenGiayTo: '',
      ngayCap: null,
      noiCap: ''
    },
    hoKhau: '',
    soNha: '',
    noiCuTruKhac: '',
    diaChiCuTruTamTru: '',
    quocTich: '',
    tinhTrangDuongSu: '',
    tinhTrangHonNhan: ''
  }

  thongTinKhacToChuc = {
    tenPhieu: '',
    truSo: '',
    giayPhepThanhLap: '',
    dangKyKinhDoanh: '',
    noiCapGiayPhep: '',
    xungHoNguoiDaiDien: '',
    hoTenNguoiDaiDien: '',
    chucVuNguoiDaiDien: '',
    ngaySinhNguoiDaiDien: null,
    giayToTuyThan: {
      tenGiayTo: '',
      ngayCap: null,
      noiCap: ''
    },
    hoKhauNguoiDaiDien: '',
    noiCuTruNguoiDaiDien: '',
    diaChiNguoiDaiDien: '',
    quocTichNguoiDaiDien: '',
    tinhTrangHoatDong: ''
  }

  constructor(
    private duongSuService: DuongSuService,
    private loaiDuongSuService: LoaiDuongSuService,
    protected danhMucTinhService: DanhMucTinhService,
    protected danhMucHuyenService: DanhMucHuyenService,
    protected danhMucXaService: DanhMucXaService
  ) {}

  ngOnInit(): void {
    this.loadLoaiDuongSus();
    this.loadTins();
  }

  onLoaiGiayToChange(value: string, target: string): void {
    if (target === 'caNhan') {
      this.isGiayToKhacVisible = (value === 'K');
    } else if (target === 'spouse') {
      this.isGiayToKhacSpouseVisible = (value === 'K');
    } else if (target === 'nguoiDaiDien') {
      this.isGiayToKhacNguoiDaiDienVisible = (value === 'K');
    }
  }

  onLoaiDuongSuChange(value: string) {
    const selectedLoaiDuongSu = this.loaiDuongSuOptions.find(option => option.value === value);

    if (selectedLoaiDuongSu) {
      this.newItem.loaiDuongSu = {
        idLoaiDuongSu: selectedLoaiDuongSu.value,
        tenLoaiDuongSu: selectedLoaiDuongSu.label
      } as ILoaiDuongSu;
    } else {
      this.newItem.loaiDuongSu = null;
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
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  private resetForm(): void {
    this.selectedtinhId = null;
    this.selectedhuyenId = null;
    this.selectedxaId = null;

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

    this.secondPerson = {
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
    }

    this.giayChungNhanKetHon = {
      soGiayCNKH: '',
      ngayCap: null,
      noiCap: ''
    }

    this.thongTinKhacCaNhanA = {
      gioiTinh: '',
      ngaySinh: null,
      giayToTuyThan: {
        tenGiayTo: '',
        ngayCap: null,
        noiCap: ''
      },
      hoKhau: '',
      soNha: '',
      noiCuTruKhac: '',
      diaChiCuTruTamTru: '',
      quocTich: '',
      tinhTrangDuongSu: '',
      tinhTrangHonNhan: ''
    }

    this.thongTinKhacCaNhanB = {
      gioiTinh: '',
      ngaySinh: null,
      giayToTuyThan: {
        tenGiayTo: '',
        ngayCap: null,
        noiCap: ''
      },
      hoKhau: '',
      soNha: '',
      noiCuTruKhac: '',
      diaChiCuTruTamTru: '',
      quocTich: '',
      tinhTrangDuongSu: '',
      tinhTrangHonNhan: ''
    }

    this.thongTinKhacToChuc = {
      tenPhieu: '',
      truSo: '',
      giayPhepThanhLap: '',
      dangKyKinhDoanh: '',
      noiCapGiayPhep: '',
      xungHoNguoiDaiDien: '',
      hoTenNguoiDaiDien: '',
      chucVuNguoiDaiDien: '',
      ngaySinhNguoiDaiDien: null,
      giayToTuyThan: {
        tenGiayTo: '',
        ngayCap: null,
        noiCap: ''
      },
      hoKhauNguoiDaiDien: '',
      noiCuTruNguoiDaiDien: '',
      diaChiNguoiDaiDien: '',
      quocTichNguoiDaiDien: '',
      tinhTrangHoatDong: ''
    }
  }
}
