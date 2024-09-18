import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDmDuongSu, NewDmDuongSu } from '../dm-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idDuongSu: unknown }> = Partial<Omit<T, 'idDuongSu'>> & { idDuongSu: T['idDuongSu'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmDuongSu for edit and NewDmDuongSuFormGroupInput for create.
 */
type DmDuongSuFormGroupInput = IDmDuongSu | PartialWithRequiredKeyOf<NewDmDuongSu>;

type DmDuongSuFormDefaults = Pick<NewDmDuongSu, 'idDuongSu'>;

type DmDuongSuFormGroupContent = {
  idDuongSu: FormControl<IDmDuongSu['idDuongSu'] | NewDmDuongSu['idDuongSu']>;
  tenDuongSu: FormControl<IDmDuongSu['tenDuongSu']>;
  diaChi: FormControl<IDmDuongSu['diaChi']>;
  trangThai: FormControl<IDmDuongSu['trangThai']>;
  thongTinDs: FormControl<IDmDuongSu['thongTinDs']>;
  ngayThaoTac: FormControl<IDmDuongSu['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDmDuongSu['nguoiThaoTac']>;
  idDsGoc: FormControl<IDmDuongSu['idDsGoc']>;
  idMaster: FormControl<IDmDuongSu['idMaster']>;
  idDonVi: FormControl<IDmDuongSu['idDonVi']>;
  strSearch: FormControl<IDmDuongSu['strSearch']>;
  soGiayTo: FormControl<IDmDuongSu['soGiayTo']>;
  idLoaiNganChan: FormControl<IDmDuongSu['idLoaiNganChan']>;
};

export type DmDuongSuFormGroup = FormGroup<DmDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DmDuongSuFormService {
  createDmDuongSuFormGroup(dmDuongSu: DmDuongSuFormGroupInput = { idDuongSu: null }): DmDuongSuFormGroup {
    const dmDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...dmDuongSu,
    };
    return new FormGroup<DmDuongSuFormGroupContent>({
      idDuongSu: new FormControl(
        { value: dmDuongSuRawValue.idDuongSu, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenDuongSu: new FormControl(dmDuongSuRawValue.tenDuongSu),
      diaChi: new FormControl(dmDuongSuRawValue.diaChi),
      trangThai: new FormControl(dmDuongSuRawValue.trangThai, {
        validators: [Validators.min(0), Validators.max(1)],
      }),
      thongTinDs: new FormControl(dmDuongSuRawValue.thongTinDs),
      ngayThaoTac: new FormControl(dmDuongSuRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(dmDuongSuRawValue.nguoiThaoTac),
      idDsGoc: new FormControl(dmDuongSuRawValue.idDsGoc),
      idMaster: new FormControl(dmDuongSuRawValue.idMaster),
      idDonVi: new FormControl(dmDuongSuRawValue.idDonVi),
      strSearch: new FormControl(dmDuongSuRawValue.strSearch),
      soGiayTo: new FormControl(dmDuongSuRawValue.soGiayTo),
      idLoaiNganChan: new FormControl(dmDuongSuRawValue.idLoaiNganChan),
    });
  }

  getDmDuongSu(form: DmDuongSuFormGroup): IDmDuongSu | NewDmDuongSu {
    return form.getRawValue() as IDmDuongSu | NewDmDuongSu;
  }

  resetForm(form: DmDuongSuFormGroup, dmDuongSu: DmDuongSuFormGroupInput): void {
    const dmDuongSuRawValue = { ...this.getFormDefaults(), ...dmDuongSu };
    form.reset(
      {
        ...dmDuongSuRawValue,
        idDuongSu: { value: dmDuongSuRawValue.idDuongSu, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmDuongSuFormDefaults {
    return {
      idDuongSu: null,
    };
  }
}
