import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDuongSu, NewDuongSu } from '../duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idDuongSu: unknown }> = Partial<Omit<T, 'idDuongSu'>> & { idDuongSu: T['idDuongSu'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDuongSu for edit and NewDuongSuFormGroupInput for create.
 */
type DuongSuFormGroupInput = IDuongSu | PartialWithRequiredKeyOf<NewDuongSu>;

type DuongSuFormDefaults = Pick<NewDuongSu, 'idDuongSu'>;

type DuongSuFormGroupContent = {
  idDuongSu: FormControl<IDuongSu['idDuongSu'] | NewDuongSu['idDuongSu']>;
  tenDuongSu: FormControl<IDuongSu['tenDuongSu']>;
  loaiDuongSu: FormControl<IDuongSu['loaiDuongSu']>;
  diaChi: FormControl<IDuongSu['diaChi']>;
  soDienThoai: FormControl<IDuongSu['soDienThoai']>;
  email: FormControl<IDuongSu['email']>;
  fax: FormControl<IDuongSu['fax']>;
  website: FormControl<IDuongSu['website']>;
  trangThai: FormControl<IDuongSu['trangThai']>;
  thongTinDs: FormControl<IDuongSu['thongTinDs']>;
  ngayThaoTac: FormControl<IDuongSu['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDuongSu['nguoiThaoTac']>;
  idDsGoc: FormControl<IDuongSu['idDsGoc']>;
  idMaster: FormControl<IDuongSu['idMaster']>;
  idDonVi: FormControl<IDuongSu['idDonVi']>;
  strSearch: FormControl<IDuongSu['strSearch']>;
  loaiGiayTo: FormControl<IDuongSu['loaiGiayTo']>;
  soGiayTo: FormControl<IDuongSu['soGiayTo']>;
  ghiChu: FormControl<IDuongSu['ghiChu']>;
  idLoaiNganChan: FormControl<IDuongSu['idLoaiNganChan']>;
  syncStatus: FormControl<IDuongSu['syncStatus']>;
};

export type DuongSuFormGroup = FormGroup<DuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DuongSuFormService {
  createDuongSuFormGroup(duongSu: DuongSuFormGroupInput = { idDuongSu: null }): DuongSuFormGroup {
    const duongSuRawValue = {
      ...this.getFormDefaults(),
      ...duongSu,
    };
    return new FormGroup<DuongSuFormGroupContent>({
      idDuongSu: new FormControl(
        { value: duongSuRawValue.idDuongSu, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenDuongSu: new FormControl(duongSuRawValue.tenDuongSu),
      loaiDuongSu: new FormControl(duongSuRawValue.loaiDuongSu),
      diaChi: new FormControl(duongSuRawValue.diaChi),
      soDienThoai: new FormControl(duongSuRawValue.soDienThoai),
      email: new FormControl(duongSuRawValue.email),
      fax: new FormControl(duongSuRawValue.fax),
      website: new FormControl(duongSuRawValue.website),
      trangThai: new FormControl(duongSuRawValue.trangThai, {
        validators: [Validators.min(0), Validators.max(1)],
      }),
      thongTinDs: new FormControl(duongSuRawValue.thongTinDs),
      ngayThaoTac: new FormControl(duongSuRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(duongSuRawValue.nguoiThaoTac),
      idDsGoc: new FormControl(duongSuRawValue.idDsGoc),
      idMaster: new FormControl(duongSuRawValue.idMaster),
      idDonVi: new FormControl(duongSuRawValue.idDonVi),
      strSearch: new FormControl(duongSuRawValue.strSearch),
      loaiGiayTo: new FormControl(duongSuRawValue.loaiGiayTo),
      soGiayTo: new FormControl(duongSuRawValue.soGiayTo),
      ghiChu: new FormControl(duongSuRawValue.ghiChu),
      idLoaiNganChan: new FormControl(duongSuRawValue.idLoaiNganChan),
      syncStatus: new FormControl(duongSuRawValue.syncStatus, {
        validators: [Validators.min(0), Validators.max(1)],
      }),
    });
  }

  getDuongSu(form: DuongSuFormGroup): IDuongSu | NewDuongSu {
    return form.getRawValue() as IDuongSu | NewDuongSu;
  }

  resetForm(form: DuongSuFormGroup, duongSu: DuongSuFormGroupInput): void {
    const duongSuRawValue = { ...this.getFormDefaults(), ...duongSu };
    form.reset(
      {
        ...duongSuRawValue,
        idDuongSu: { value: duongSuRawValue.idDuongSu, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DuongSuFormDefaults {
    return {
      idDuongSu: null,
    };
  }
}
