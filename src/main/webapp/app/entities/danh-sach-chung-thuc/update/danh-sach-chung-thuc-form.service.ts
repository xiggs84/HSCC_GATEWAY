import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhSachChungThuc, NewDanhSachChungThuc } from '../danh-sach-chung-thuc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idChungThuc: unknown }> = Partial<Omit<T, 'idChungThuc'>> & { idChungThuc: T['idChungThuc'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhSachChungThuc for edit and NewDanhSachChungThucFormGroupInput for create.
 */
type DanhSachChungThucFormGroupInput = IDanhSachChungThuc | PartialWithRequiredKeyOf<NewDanhSachChungThuc>;

type DanhSachChungThucFormDefaults = Pick<NewDanhSachChungThuc, 'idChungThuc'>;

type DanhSachChungThucFormGroupContent = {
  idChungThuc: FormControl<IDanhSachChungThuc['idChungThuc'] | NewDanhSachChungThuc['idChungThuc']>;
  idDonVi: FormControl<IDanhSachChungThuc['idDonVi']>;
  nguoiChungThuc: FormControl<IDanhSachChungThuc['nguoiChungThuc']>;
  nguoiThaoTac: FormControl<IDanhSachChungThuc['nguoiThaoTac']>;
  ngayChungThuc: FormControl<IDanhSachChungThuc['ngayChungThuc']>;
  ngayThaoTac: FormControl<IDanhSachChungThuc['ngayThaoTac']>;
  trangThai: FormControl<IDanhSachChungThuc['trangThai']>;
  quyenSo: FormControl<IDanhSachChungThuc['quyenSo']>;
  srcChungThuc: FormControl<IDanhSachChungThuc['srcChungThuc']>;
  chuKyNgoaiTruSo: FormControl<IDanhSachChungThuc['chuKyNgoaiTruSo']>;
  ngayText: FormControl<IDanhSachChungThuc['ngayText']>;
  strSearch: FormControl<IDanhSachChungThuc['strSearch']>;
  soTienThu: FormControl<IDanhSachChungThuc['soTienThu']>;
  ldPheDuyet: FormControl<IDanhSachChungThuc['ldPheDuyet']>;
  danhMucLoaiGiayToChungThuc: FormControl<IDanhSachChungThuc['danhMucLoaiGiayToChungThuc']>;
};

export type DanhSachChungThucFormGroup = FormGroup<DanhSachChungThucFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhSachChungThucFormService {
  createDanhSachChungThucFormGroup(danhSachChungThuc: DanhSachChungThucFormGroupInput = { idChungThuc: null }): DanhSachChungThucFormGroup {
    const danhSachChungThucRawValue = {
      ...this.getFormDefaults(),
      ...danhSachChungThuc,
    };
    return new FormGroup<DanhSachChungThucFormGroupContent>({
      idChungThuc: new FormControl(
        { value: danhSachChungThucRawValue.idChungThuc, disabled: danhSachChungThucRawValue.idChungThuc !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDonVi: new FormControl(danhSachChungThucRawValue.idDonVi),
      nguoiChungThuc: new FormControl(danhSachChungThucRawValue.nguoiChungThuc),
      nguoiThaoTac: new FormControl(danhSachChungThucRawValue.nguoiThaoTac),
      ngayChungThuc: new FormControl(danhSachChungThucRawValue.ngayChungThuc),
      ngayThaoTac: new FormControl(danhSachChungThucRawValue.ngayThaoTac),
      trangThai: new FormControl(danhSachChungThucRawValue.trangThai),
      quyenSo: new FormControl(danhSachChungThucRawValue.quyenSo),
      srcChungThuc: new FormControl(danhSachChungThucRawValue.srcChungThuc),
      chuKyNgoaiTruSo: new FormControl(danhSachChungThucRawValue.chuKyNgoaiTruSo),
      ngayText: new FormControl(danhSachChungThucRawValue.ngayText),
      strSearch: new FormControl(danhSachChungThucRawValue.strSearch),
      soTienThu: new FormControl(danhSachChungThucRawValue.soTienThu),
      ldPheDuyet: new FormControl(danhSachChungThucRawValue.ldPheDuyet),
      danhMucLoaiGiayToChungThuc: new FormControl(danhSachChungThucRawValue.danhMucLoaiGiayToChungThuc),
    });
  }

  getDanhSachChungThuc(form: DanhSachChungThucFormGroup): IDanhSachChungThuc | NewDanhSachChungThuc {
    return form.getRawValue() as IDanhSachChungThuc | NewDanhSachChungThuc;
  }

  resetForm(form: DanhSachChungThucFormGroup, danhSachChungThuc: DanhSachChungThucFormGroupInput): void {
    const danhSachChungThucRawValue = { ...this.getFormDefaults(), ...danhSachChungThuc };
    form.reset(
      {
        ...danhSachChungThucRawValue,
        idChungThuc: { value: danhSachChungThucRawValue.idChungThuc, disabled: danhSachChungThucRawValue.idChungThuc !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhSachChungThucFormDefaults {
    return {
      idChungThuc: null,
    };
  }
}
