import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDuongSuTrungCmnd, NewDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDuongSuTrungCmnd for edit and NewDuongSuTrungCmndFormGroupInput for create.
 */
type DuongSuTrungCmndFormGroupInput = IDuongSuTrungCmnd | PartialWithRequiredKeyOf<NewDuongSuTrungCmnd>;

type DuongSuTrungCmndFormDefaults = Pick<NewDuongSuTrungCmnd, 'id'>;

type DuongSuTrungCmndFormGroupContent = {
  id: FormControl<IDuongSuTrungCmnd['id'] | NewDuongSuTrungCmnd['id']>;
  tenDuongSu: FormControl<IDuongSuTrungCmnd['tenDuongSu']>;
  diaChi: FormControl<IDuongSuTrungCmnd['diaChi']>;
  trangThai: FormControl<IDuongSuTrungCmnd['trangThai']>;
  thongTinDs: FormControl<IDuongSuTrungCmnd['thongTinDs']>;
  ngayThaoTac: FormControl<IDuongSuTrungCmnd['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDuongSuTrungCmnd['nguoiThaoTac']>;
  idDsGoc: FormControl<IDuongSuTrungCmnd['idDsGoc']>;
  idMaster: FormControl<IDuongSuTrungCmnd['idMaster']>;
  idDonVi: FormControl<IDuongSuTrungCmnd['idDonVi']>;
  strSearch: FormControl<IDuongSuTrungCmnd['strSearch']>;
  soGiayTo: FormControl<IDuongSuTrungCmnd['soGiayTo']>;
  idDuongSuMin: FormControl<IDuongSuTrungCmnd['idDuongSuMin']>;
  idMasterMin: FormControl<IDuongSuTrungCmnd['idMasterMin']>;
  idDuongSuMax: FormControl<IDuongSuTrungCmnd['idDuongSuMax']>;
  idMasterMax: FormControl<IDuongSuTrungCmnd['idMasterMax']>;
  duongSu: FormControl<IDuongSuTrungCmnd['duongSu']>;
};

export type DuongSuTrungCmndFormGroup = FormGroup<DuongSuTrungCmndFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DuongSuTrungCmndFormService {
  createDuongSuTrungCmndFormGroup(duongSuTrungCmnd: DuongSuTrungCmndFormGroupInput = { id: null }): DuongSuTrungCmndFormGroup {
    const duongSuTrungCmndRawValue = {
      ...this.getFormDefaults(),
      ...duongSuTrungCmnd,
    };
    return new FormGroup<DuongSuTrungCmndFormGroupContent>({
      id: new FormControl(
        { value: duongSuTrungCmndRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenDuongSu: new FormControl(duongSuTrungCmndRawValue.tenDuongSu),
      diaChi: new FormControl(duongSuTrungCmndRawValue.diaChi),
      trangThai: new FormControl(duongSuTrungCmndRawValue.trangThai, {
        validators: [Validators.min(0), Validators.max(1)],
      }),
      thongTinDs: new FormControl(duongSuTrungCmndRawValue.thongTinDs),
      ngayThaoTac: new FormControl(duongSuTrungCmndRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(duongSuTrungCmndRawValue.nguoiThaoTac),
      idDsGoc: new FormControl(duongSuTrungCmndRawValue.idDsGoc),
      idMaster: new FormControl(duongSuTrungCmndRawValue.idMaster),
      idDonVi: new FormControl(duongSuTrungCmndRawValue.idDonVi),
      strSearch: new FormControl(duongSuTrungCmndRawValue.strSearch),
      soGiayTo: new FormControl(duongSuTrungCmndRawValue.soGiayTo),
      idDuongSuMin: new FormControl(duongSuTrungCmndRawValue.idDuongSuMin),
      idMasterMin: new FormControl(duongSuTrungCmndRawValue.idMasterMin),
      idDuongSuMax: new FormControl(duongSuTrungCmndRawValue.idDuongSuMax),
      idMasterMax: new FormControl(duongSuTrungCmndRawValue.idMasterMax),
      duongSu: new FormControl(duongSuTrungCmndRawValue.duongSu),
    });
  }

  getDuongSuTrungCmnd(form: DuongSuTrungCmndFormGroup): IDuongSuTrungCmnd | NewDuongSuTrungCmnd {
    return form.getRawValue() as IDuongSuTrungCmnd | NewDuongSuTrungCmnd;
  }

  resetForm(form: DuongSuTrungCmndFormGroup, duongSuTrungCmnd: DuongSuTrungCmndFormGroupInput): void {
    const duongSuTrungCmndRawValue = { ...this.getFormDefaults(), ...duongSuTrungCmnd };
    form.reset(
      {
        ...duongSuTrungCmndRawValue,
        id: { value: duongSuTrungCmndRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DuongSuTrungCmndFormDefaults {
    return {
      id: null,
    };
  }
}
