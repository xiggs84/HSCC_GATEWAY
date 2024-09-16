import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhMucDonVi, NewDanhMucDonVi } from '../danh-muc-don-vi.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idDonVi: unknown }> = Partial<Omit<T, 'idDonVi'>> & { idDonVi: T['idDonVi'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucDonVi for edit and NewDanhMucDonViFormGroupInput for create.
 */
type DanhMucDonViFormGroupInput = IDanhMucDonVi | PartialWithRequiredKeyOf<NewDanhMucDonVi>;

type DanhMucDonViFormDefaults = Pick<NewDanhMucDonVi, 'idDonVi'>;

type DanhMucDonViFormGroupContent = {
  idDonVi: FormControl<IDanhMucDonVi['idDonVi'] | NewDanhMucDonVi['idDonVi']>;
  tenDonVi: FormControl<IDanhMucDonVi['tenDonVi']>;
  diaChi: FormControl<IDanhMucDonVi['diaChi']>;
  nguoiDaiDien: FormControl<IDanhMucDonVi['nguoiDaiDien']>;
  soDienThoai: FormControl<IDanhMucDonVi['soDienThoai']>;
  idDonViQl: FormControl<IDanhMucDonVi['idDonViQl']>;
  ngayKhaiBao: FormControl<IDanhMucDonVi['ngayKhaiBao']>;
  trangThai: FormControl<IDanhMucDonVi['trangThai']>;
  soNha: FormControl<IDanhMucDonVi['soNha']>;
  maSoThue: FormControl<IDanhMucDonVi['maSoThue']>;
  capQuanLy: FormControl<IDanhMucDonVi['capQuanLy']>;
  loaiNhiemVu: FormControl<IDanhMucDonVi['loaiNhiemVu']>;
  hoaDonDt: FormControl<IDanhMucDonVi['hoaDonDt']>;
  maDonViIgate: FormControl<IDanhMucDonVi['maDonViIgate']>;
  maCoQuanIgate: FormControl<IDanhMucDonVi['maCoQuanIgate']>;
  loaiDonVi: FormControl<IDanhMucDonVi['loaiDonVi']>;
  kySo: FormControl<IDanhMucDonVi['kySo']>;
  qrScan: FormControl<IDanhMucDonVi['qrScan']>;
  verifyIdCard: FormControl<IDanhMucDonVi['verifyIdCard']>;
  isVerifyFace: FormControl<IDanhMucDonVi['isVerifyFace']>;
  isElastic: FormControl<IDanhMucDonVi['isElastic']>;
  apikeyCccd: FormControl<IDanhMucDonVi['apikeyCccd']>;
  apikeyFace: FormControl<IDanhMucDonVi['apikeyFace']>;
  verifyCodeCccd: FormControl<IDanhMucDonVi['verifyCodeCccd']>;
  usernameElastic: FormControl<IDanhMucDonVi['usernameElastic']>;
  passwordElastic: FormControl<IDanhMucDonVi['passwordElastic']>;
};

export type DanhMucDonViFormGroup = FormGroup<DanhMucDonViFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucDonViFormService {
  createDanhMucDonViFormGroup(danhMucDonVi: DanhMucDonViFormGroupInput = { idDonVi: null }): DanhMucDonViFormGroup {
    const danhMucDonViRawValue = {
      ...this.getFormDefaults(),
      ...danhMucDonVi,
    };
    return new FormGroup<DanhMucDonViFormGroupContent>({
      idDonVi: new FormControl(
        { value: danhMucDonViRawValue.idDonVi, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenDonVi: new FormControl(danhMucDonViRawValue.tenDonVi),
      diaChi: new FormControl(danhMucDonViRawValue.diaChi),
      nguoiDaiDien: new FormControl(danhMucDonViRawValue.nguoiDaiDien),
      soDienThoai: new FormControl(danhMucDonViRawValue.soDienThoai),
      idDonViQl: new FormControl(danhMucDonViRawValue.idDonViQl),
      ngayKhaiBao: new FormControl(danhMucDonViRawValue.ngayKhaiBao),
      trangThai: new FormControl(danhMucDonViRawValue.trangThai),
      soNha: new FormControl(danhMucDonViRawValue.soNha),
      maSoThue: new FormControl(danhMucDonViRawValue.maSoThue),
      capQuanLy: new FormControl(danhMucDonViRawValue.capQuanLy),
      loaiNhiemVu: new FormControl(danhMucDonViRawValue.loaiNhiemVu),
      hoaDonDt: new FormControl(danhMucDonViRawValue.hoaDonDt),
      maDonViIgate: new FormControl(danhMucDonViRawValue.maDonViIgate),
      maCoQuanIgate: new FormControl(danhMucDonViRawValue.maCoQuanIgate),
      loaiDonVi: new FormControl(danhMucDonViRawValue.loaiDonVi),
      kySo: new FormControl(danhMucDonViRawValue.kySo),
      qrScan: new FormControl(danhMucDonViRawValue.qrScan),
      verifyIdCard: new FormControl(danhMucDonViRawValue.verifyIdCard),
      isVerifyFace: new FormControl(danhMucDonViRawValue.isVerifyFace),
      isElastic: new FormControl(danhMucDonViRawValue.isElastic),
      apikeyCccd: new FormControl(danhMucDonViRawValue.apikeyCccd),
      apikeyFace: new FormControl(danhMucDonViRawValue.apikeyFace),
      verifyCodeCccd: new FormControl(danhMucDonViRawValue.verifyCodeCccd),
      usernameElastic: new FormControl(danhMucDonViRawValue.usernameElastic),
      passwordElastic: new FormControl(danhMucDonViRawValue.passwordElastic),
    });
  }

  getDanhMucDonVi(form: DanhMucDonViFormGroup): IDanhMucDonVi | NewDanhMucDonVi {
    return form.getRawValue() as IDanhMucDonVi | NewDanhMucDonVi;
  }

  resetForm(form: DanhMucDonViFormGroup, danhMucDonVi: DanhMucDonViFormGroupInput): void {
    const danhMucDonViRawValue = { ...this.getFormDefaults(), ...danhMucDonVi };
    form.reset(
      {
        ...danhMucDonViRawValue,
        idDonVi: { value: danhMucDonViRawValue.idDonVi, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucDonViFormDefaults {
    return {
      idDonVi: null,
    };
  }
}
