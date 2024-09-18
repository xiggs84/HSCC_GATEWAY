import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhSachDuongSu, NewDanhSachDuongSu } from '../danh-sach-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhSachDuongSu for edit and NewDanhSachDuongSuFormGroupInput for create.
 */
type DanhSachDuongSuFormGroupInput = IDanhSachDuongSu | PartialWithRequiredKeyOf<NewDanhSachDuongSu>;

type DanhSachDuongSuFormDefaults = Pick<NewDanhSachDuongSu, 'id'>;

type DanhSachDuongSuFormGroupContent = {
  id: FormControl<IDanhSachDuongSu['id'] | NewDanhSachDuongSu['id']>;
  tenDuongSu: FormControl<IDanhSachDuongSu['tenDuongSu']>;
  diaChi: FormControl<IDanhSachDuongSu['diaChi']>;
  trangThai: FormControl<IDanhSachDuongSu['trangThai']>;
  ngayThaoTac: FormControl<IDanhSachDuongSu['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDanhSachDuongSu['nguoiThaoTac']>;
  idDsGoc: FormControl<IDanhSachDuongSu['idDsGoc']>;
  idMaster: FormControl<IDanhSachDuongSu['idMaster']>;
  idDonVi: FormControl<IDanhSachDuongSu['idDonVi']>;
  strSearch: FormControl<IDanhSachDuongSu['strSearch']>;
  soGiayTo: FormControl<IDanhSachDuongSu['soGiayTo']>;
  idLoaiNganChan: FormControl<IDanhSachDuongSu['idLoaiNganChan']>;
  duongSu: FormControl<IDanhSachDuongSu['duongSu']>;
};

export type DanhSachDuongSuFormGroup = FormGroup<DanhSachDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhSachDuongSuFormService {
  createDanhSachDuongSuFormGroup(danhSachDuongSu: DanhSachDuongSuFormGroupInput = { id: null }): DanhSachDuongSuFormGroup {
    const danhSachDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...danhSachDuongSu,
    };
    return new FormGroup<DanhSachDuongSuFormGroupContent>({
      id: new FormControl(
        { value: danhSachDuongSuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenDuongSu: new FormControl(danhSachDuongSuRawValue.tenDuongSu),
      diaChi: new FormControl(danhSachDuongSuRawValue.diaChi),
      trangThai: new FormControl(danhSachDuongSuRawValue.trangThai, {
        validators: [Validators.min(0), Validators.max(1)],
      }),
      ngayThaoTac: new FormControl(danhSachDuongSuRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(danhSachDuongSuRawValue.nguoiThaoTac),
      idDsGoc: new FormControl(danhSachDuongSuRawValue.idDsGoc),
      idMaster: new FormControl(danhSachDuongSuRawValue.idMaster),
      idDonVi: new FormControl(danhSachDuongSuRawValue.idDonVi),
      strSearch: new FormControl(danhSachDuongSuRawValue.strSearch),
      soGiayTo: new FormControl(danhSachDuongSuRawValue.soGiayTo),
      idLoaiNganChan: new FormControl(danhSachDuongSuRawValue.idLoaiNganChan),
      duongSu: new FormControl(danhSachDuongSuRawValue.duongSu),
    });
  }

  getDanhSachDuongSu(form: DanhSachDuongSuFormGroup): IDanhSachDuongSu | NewDanhSachDuongSu {
    return form.getRawValue() as IDanhSachDuongSu | NewDanhSachDuongSu;
  }

  resetForm(form: DanhSachDuongSuFormGroup, danhSachDuongSu: DanhSachDuongSuFormGroupInput): void {
    const danhSachDuongSuRawValue = { ...this.getFormDefaults(), ...danhSachDuongSu };
    form.reset(
      {
        ...danhSachDuongSuRawValue,
        id: { value: danhSachDuongSuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhSachDuongSuFormDefaults {
    return {
      id: null,
    };
  }
}
