import {Component, OnInit} from '@angular/core';
import SharedModule from '../../shared/shared.module';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, throwError, tap, Observable} from 'rxjs';
import {DuongSuService} from "../../entities/duong-su/service/duong-su.service";
import dayjs from "dayjs/esm";
import {DATE_FORMAT, DATE_TIME_FORMAT} from "../../config/input.constants";
import { LoaiGiayTo } from 'app/entities/enumerations/loai-giay-to.model';
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
  duongSuForm!: FormGroup;
  isGiayToKhacNguoiDaiDienVisible: boolean = false;
  isLoaiDuongSuReadonly = false;

  constructor(
    private fb: FormBuilder,
    private duongSuFormService: DuongSuService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  private initializeForm(): void {
    this.duongSuForm = this.fb.group({
      loaiDuongSu: [{ value: 'CaNhan', disabled: this.isLoaiDuongSuReadonly }],
      tenDuongSu: [null],
      gioiTinh: [null],
      ngaySinh: [null],
      giayToTuyThan: [''],
      tenGiayTo: [''],
      soGiayTo: [''],
      ngayCap: [null],
      noiCap: [''],
      tinhThanhpho: [null],
      quanHuyen: [null],
      phuongXa: [null],
      hoKhau: [''],
      soNhaDuong: [''],
      noiCuTruKhac: [''],
      diaChiCuTruTamTru: [''],
      sdt: [''],
      email: [''],
      fax: [''],
      website: [''],
      quocTich: [null],
      ttDuongSu: [null],
      ttHonNhan: [null],
      ghiChu: [''],
      tenCongTy: [''],
      tenPhieu: [''],
      tinhThanhPho: [''],
      truSo: [''],
      dienThoai: [''],
      giayPhepThanhLap: [''],
      dangKyKinhDoanh: [''],
      noiCapGiayPhep: [''],
      xungHoNguoiDaiDien: [''],
      hoTenNguoiDaiDien: [''],
      chucVuNguoiDaiDien: [''],
      ngaySinhNguoiDaiDien: [null],
      giayToNguoiDaiDien: [''],
      tenGiayToNguoiDaiDien: [''],
      soGiayToNguoiDaiDien: [''],
      coQuanCapGiayToNguoiDaiDien: [''],
      ngayCapGiayToNguoiDaiDien: [null],
      hoKhauNguoiDaiDien: [''],
      noiCuTruNguoiDaiDien: [''],
      diaChiNguoiDaiDien: [''],
      quocTichNguoiDaiDien: ['vietNam'],
      tinhTrangHoatDong: ['dangHoatDong'],
      secondPerson: this.initializeSecondPersonGroup()
    });

    this.duongSuForm.get('secondPerson')?.disable();
  }

  private initializeSecondPersonGroup(): FormGroup {
    return this.fb.group({
      tenDuongSu: [''],
      ngaySinh: [null],
      giayToTuyThan: [null],
      tenGiayTo: [''],
      soGiayTo: [''],
      ngayCap: [null],
      noiCap: [''],
      tinhThanhpho: [null],
      quanHuyen: [null],
      phuongXa: [null],
      hoKhau: [''],
      soNhaDuong: [''],
      noiCuTruKhac: [''],
      diaChiCuTruTamTru: [''],
      sdt: [''],
      email: [''],
      fax: [''],
      website: [''],
      quocTich: [null],
      ttDuongSu: [null],
      giayChungNhanKetHon: this.fb.group({
        so: [''],
        ngayCap: [null],
        noiCap: ['']
      })
    });
  }

  populateForm(duongSuData: any, isLoaiDuongSuReadonly: boolean = false): void {
    this.isLoaiDuongSuReadonly = isLoaiDuongSuReadonly;
    this.duongSuForm.get('loaiDuongSu')?.enable();
    if (this.isLoaiDuongSuReadonly) {
      this.duongSuForm.get('loaiDuongSu')?.disable();
    }
    const thongTinDsElement = document.createElement('div');
  thongTinDsElement.innerHTML = duongSuData.thongTinDs;

  const extractValue = (label: string): string => {
    const elements = thongTinDsElement.querySelectorAll('b');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.textContent && element.textContent.includes(label)) {
        const nextSibling = element.nextSibling;
        if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE) {
          return (nextSibling.textContent || '').trim();
        }
        return '';
      }
    }
    return '';
  };
  
    const gioiTinh = extractValue('Giới tính');
    const ngaySinh = extractValue('Ngày sinh');
    const ngayCapCMND = extractValue('Ngày cấp chứng minh nhân dân');
    const noiCapCMND = extractValue('Nơi cấp chứng minh nhân dân');
    const hoKhau = extractValue('Hộ khẩu');
    const soNha = extractValue('Số nhà');
    const noiCuTruKhac = extractValue('Nơi cư trú khác');
    const diaChiTamTru = extractValue('Địa chỉ cư trú/tạm trú');
    const quocTich = extractValue('Quốc tịch');
    const tinhTrangDuongSu = extractValue('Tình trạng đương sự');
    const tinhTrangHonNhan = extractValue('Tình trạng hôn nhân');
  
    const diaChiParts = duongSuData.diaChi.split(',');
    const xaPhuong = diaChiParts[1]?.trim() || '';
    const quanHuyen = diaChiParts[2]?.trim() || '';
    const tinhThanh = diaChiParts[3]?.trim() || '';
  
    this.duongSuForm.patchValue({
      loaiDuongSu: duongSuData.loaiDuongSu,
      tenDuongSu: duongSuData.tenDuongSu,
      gioiTinh: gioiTinh,
      ngaySinh: ngaySinh ? dayjs(ngaySinh).format(DATE_FORMAT) : null,
      giayToTuyThan: duongSuData.loaiGiayTo,
      soGiayTo: duongSuData.soGiayTo,
      ngayCap: ngayCapCMND,
      noiCap: noiCapCMND,
      tinhThanhpho: tinhThanh,
      quanHuyen: quanHuyen,
      phuongXa: xaPhuong,
      soNhaDuong: soNha,
      diaChi: duongSuData.diaChi,
      sdt: duongSuData.soDienThoai,
      email: duongSuData.email,
      fax: duongSuData.fax,
      website: duongSuData.website,
      hoKhau: hoKhau,
      soNha: soNha,
      noiCuTruKhac: noiCuTruKhac,
      diaChiCuTruTamTru: diaChiTamTru,
      quocTich: quocTich,
      ttDuongSu: tinhTrangDuongSu,
      ttHonNhan: tinhTrangHonNhan,
      ghiChu: duongSuData.ghiChu
    });
  }
  

  private subscribeToFormChanges(): void {
    this.duongSuForm.get('giayToTuyThan')?.valueChanges.subscribe(this.onGiayToTuyThanChange.bind(this));
    this.duongSuForm.get('giayToNguoiDaiDien')?.valueChanges.subscribe(this.onGiayToTuyThanNguoiDaiDienChange.bind(this));
    this.duongSuForm.get('secondPerson.giayToTuyThan')?.valueChanges.subscribe(this.onSecondPersonGiayToTuyThanChange.bind(this));
    this.duongSuForm.get('ttHonNhan')?.valueChanges.subscribe(this.onTtHonNhanChange.bind(this));
  }

  private onGiayToTuyThanChange(value: string): void {
    this.isGiayToKhacVisible = value === 'K';
  }

  private onSecondPersonGiayToTuyThanChange(value: string): void {
    this.isGiayToKhacSpouseVisible = value === 'K';
  }

  private onGiayToTuyThanNguoiDaiDienChange(value: string): void {
    this.isGiayToKhacNguoiDaiDienVisible = value === 'K';
  }

  private onTtHonNhanChange(value: string): void {
    const secondPersonGroup = this.duongSuForm.get('secondPerson');
    if (value === 'KetHon') {
      secondPersonGroup?.enable();
    } else {
      secondPersonGroup?.disable();
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const formData = this.mapFormDataToApiFormat(this.duongSuForm.value);
    this.submitForm(formData);
  }

  handleCancel(): void {
    this.isVisible = false;
    if (this.duongSuForm) {
      this.duongSuForm.reset({
        loaiDuongSu: 'CaNhan'
      });
      this.duongSuForm.get('loaiDuongSu')?.enable();
    }
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

  private mapFormDataToApiFormat(formValue: any): any {
    let thongTinDs = '';

    if (formValue.loaiDuongSu === 'CaNhan') {
      thongTinDs =
        `<b>Giới tính: </b>${formValue.gioiTinh || ''}` +
        `<br/><b>Ngày sinh: </b>${this.formatDate(formValue.ngaySinh) || ''}` +
        `<br/><b>Ngày cấp chứng minh nhân dân: </b>${this.formatDate(formValue.ngayCap) || ''}` +
        `<br/><b>Nơi cấp chứng minh nhân dân: </b>${formValue.noiCap || ''}` +
        `<br/><b>Hộ khẩu: </b>${formValue.hoKhau || ''}` +
        `<br/><b>Số nhà: </b>${formValue.soNhaDuong || ''}` +
        `<br/><b>Nơi cư trú khác: </b>${formValue.noiCuTruKhac || ''}` +
        `<br/><b>Địa chỉ cư trú/tạm trú: </b>${formValue.diaChiCuTruTamTru || ''}` +
        `<br/><b>Quốc tịch: </b>${formValue.quocTich || ''}` +
        `<br/><b>Tình trạng đương sự: </b>${formValue.ttDuongSu || ''}` +
        `<br/><b>Tình trạng hôn nhân: </b>${formValue.ttHonNhan || ''}`;
    } else if (formValue.loaiDuongSu === 'ToChuc') {
      thongTinDs =
        `<b>Tên công ty: </b>${formValue.tenCongTy || ''}` +
        `<br/><b>Trụ sở: </b>${formValue.truSo || ''}` +
        `<br/><b>Điện thoại: </b>${formValue.dienThoai || ''}` +
        `<br/><b>Fax số: </b>${formValue.fax || ''}` +
        `<br/><b>Giấy phép thành lập/ đầu tư: </b>${formValue.giayPhepThanhLap || ''}` +
        `<br/><b>Nơi cấp giấy phép thành lập: </b>${formValue.noiCapGiayPhep || ''}` +
        `<br/><b>Đăng ký kinh doanh: </b>${formValue.dangKyKinhDoanh || ''}` +
        `<br/><b>Nơi cấp giấy phép kinh doanh: </b>${formValue.noiCapGiayPhep || ''}` +
        `<br/><b>Họ tên người đại diện: </b>${formValue.hoTenNguoiDaiDien || ''}` +
        `<br/><b>Chức vụ người đại diện: </b>${formValue.chucVuNguoiDaiDien || ''}` +
        `<br/><b>Số giấy tờ tùy thân: </b>${formValue.soGiayToNguoiDaiDien || ''}` +
        `<br/><b>Cơ quan cấp giấy tờ tùy thân: </b>${formValue.coQuanCapGiayToNguoiDaiDien || ''}` +
        `<br/><b>Ngày cấp giấy tờ tùy thân: </b>${this.formatDate(formValue.ngayCapGiayToNguoiDaiDien) || ''}` +
        `<br/><b>Hộ khẩu thường trú: </b>${formValue.hoKhauNguoiDaiDien || ''}`;
    }

    return {
      tenDuongSu: formValue.loaiDuongSu === 'ToChuc' ? formValue.tenCongTy || '' : formValue.tenDuongSu || '',
      loaiDuongSu: formValue.loaiDuongSu || 'CaNhan',
      diaChi: `${formValue.soNhaDuong || ''}, ${formValue.phuongXa || ''}, ${formValue.quanHuyen || ''}, ${formValue.tinhThanhpho || ''}`,
      soDienThoai: formValue.sdt || '',
      email: formValue.email || '',
      fax: formValue.fax || '',
      website: formValue.website || '',
      trangThai: 1,
      thongTinDs: thongTinDs || '',
      ngayThaoTac: dayjs().format(DATE_TIME_FORMAT),
      nguoiThaoTac: 0,
      idDsGoc: 0,
      idMaster: '',
      idDonVi: 0,
      strSearch: formValue.loaiDuongSu === 'ToChuc' ? formValue.tenCongTy || '' : formValue.tenDuongSu || '',
      loaiGiayTo: formValue.giayToTuyThan || 'Cmnd',
      soGiayTo: formValue.soGiayTo || '',
      ghiChu: formValue.ghiChu || '',
      idLoaiNganChan: 0,
      syncStatus: 1
    };
  }


  private formatDate(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
  }
}
