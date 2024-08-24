import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhSachChungThuc, NewDanhSachChungThuc } from '../danh-sach-chung-thuc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhSachChungThuc for edit and NewDanhSachChungThucFormGroupInput for create.
 */
type DanhSachChungThucFormGroupInput = IDanhSachChungThuc | PartialWithRequiredKeyOf<NewDanhSachChungThuc>;

type DanhSachChungThucFormDefaults = Pick<NewDanhSachChungThuc, 'id'>;

type DanhSachChungThucFormGroupContent = {
  id: FormControl<IDanhSachChungThuc['id'] | NewDanhSachChungThuc['id']>;
  idChungThuc: FormControl<IDanhSachChungThuc['idChungThuc']>;
  idDonVi: FormControl<IDanhSachChungThuc['idDonVi']>;
  nguoiChungThuc: FormControl<IDanhSachChungThuc['nguoiChungThuc']>;
  nguoiThaoTac: FormControl<IDanhSachChungThuc['nguoiThaoTac']>;
  ngayChungThuc: FormControl<IDanhSachChungThuc['ngayChungThuc']>;
  ngayThaoTac: FormControl<IDanhSachChungThuc['ngayThaoTac']>;
  trangThai: FormControl<IDanhSachChungThuc['trangThai']>;
  idLoaiGiayTo: FormControl<IDanhSachChungThuc['idLoaiGiayTo']>;
  quyenSo: FormControl<IDanhSachChungThuc['quyenSo']>;
  srcChungThuc: FormControl<IDanhSachChungThuc['srcChungThuc']>;
  chuKyNgoaiTruSo: FormControl<IDanhSachChungThuc['chuKyNgoaiTruSo']>;
  ngayText: FormControl<IDanhSachChungThuc['ngayText']>;
  strSearch: FormControl<IDanhSachChungThuc['strSearch']>;
  soTienThu: FormControl<IDanhSachChungThuc['soTienThu']>;
  ldPheDuyet: FormControl<IDanhSachChungThuc['ldPheDuyet']>;
};

export type DanhSachChungThucFormGroup = FormGroup<DanhSachChungThucFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhSachChungThucFormService {
  createDanhSachChungThucFormGroup(danhSachChungThuc: DanhSachChungThucFormGroupInput = { id: null }): DanhSachChungThucFormGroup {
    const danhSachChungThucRawValue = {
      ...this.getFormDefaults(),
      ...danhSachChungThuc,
    };
    return new FormGroup<DanhSachChungThucFormGroupContent>({
      id: new FormControl(
        { value: danhSachChungThucRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idChungThuc: new FormControl(danhSachChungThucRawValue.idChungThuc),
      idDonVi: new FormControl(danhSachChungThucRawValue.idDonVi),
      nguoiChungThuc: new FormControl(danhSachChungThucRawValue.nguoiChungThuc),
      nguoiThaoTac: new FormControl(danhSachChungThucRawValue.nguoiThaoTac),
      ngayChungThuc: new FormControl(danhSachChungThucRawValue.ngayChungThuc),
      ngayThaoTac: new FormControl(danhSachChungThucRawValue.ngayThaoTac),
      trangThai: new FormControl(danhSachChungThucRawValue.trangThai),
      idLoaiGiayTo: new FormControl(danhSachChungThucRawValue.idLoaiGiayTo),
      quyenSo: new FormControl(danhSachChungThucRawValue.quyenSo),
      srcChungThuc: new FormControl(danhSachChungThucRawValue.srcChungThuc),
      chuKyNgoaiTruSo: new FormControl(danhSachChungThucRawValue.chuKyNgoaiTruSo),
      ngayText: new FormControl(danhSachChungThucRawValue.ngayText),
      strSearch: new FormControl(danhSachChungThucRawValue.strSearch),
      soTienThu: new FormControl(danhSachChungThucRawValue.soTienThu),
      ldPheDuyet: new FormControl(danhSachChungThucRawValue.ldPheDuyet),
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
        id: { value: danhSachChungThucRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhSachChungThucFormDefaults {
    return {
      id: null,
    };
  }
}
