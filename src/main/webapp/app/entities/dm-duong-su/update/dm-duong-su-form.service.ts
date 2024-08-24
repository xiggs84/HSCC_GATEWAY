import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDmDuongSu, NewDmDuongSu } from '../dm-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmDuongSu for edit and NewDmDuongSuFormGroupInput for create.
 */
type DmDuongSuFormGroupInput = IDmDuongSu | PartialWithRequiredKeyOf<NewDmDuongSu>;

type DmDuongSuFormDefaults = Pick<NewDmDuongSu, 'id'>;

type DmDuongSuFormGroupContent = {
  id: FormControl<IDmDuongSu['id'] | NewDmDuongSu['id']>;
  idDuongSu: FormControl<IDmDuongSu['idDuongSu']>;
  tenDuongSu: FormControl<IDmDuongSu['tenDuongSu']>;
  idLoaiDs: FormControl<IDmDuongSu['idLoaiDs']>;
  diaChi: FormControl<IDmDuongSu['diaChi']>;
  trangThai: FormControl<IDmDuongSu['trangThai']>;
  thongTinDs: FormControl<IDmDuongSu['thongTinDs']>;
  ngayThaoTac: FormControl<IDmDuongSu['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDmDuongSu['nguoiThaoTac']>;
  idDsGoc: FormControl<IDmDuongSu['idDsGoc']>;
  idTinhTrang: FormControl<IDmDuongSu['idTinhTrang']>;
  idMaster: FormControl<IDmDuongSu['idMaster']>;
  idDonVi: FormControl<IDmDuongSu['idDonVi']>;
  strSearch: FormControl<IDmDuongSu['strSearch']>;
  soGiayTo: FormControl<IDmDuongSu['soGiayTo']>;
  idLoaiNganChan: FormControl<IDmDuongSu['idLoaiNganChan']>;
};

export type DmDuongSuFormGroup = FormGroup<DmDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DmDuongSuFormService {
  createDmDuongSuFormGroup(dmDuongSu: DmDuongSuFormGroupInput = { id: null }): DmDuongSuFormGroup {
    const dmDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...dmDuongSu,
    };
    return new FormGroup<DmDuongSuFormGroupContent>({
      id: new FormControl(
        { value: dmDuongSuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDuongSu: new FormControl(dmDuongSuRawValue.idDuongSu),
      tenDuongSu: new FormControl(dmDuongSuRawValue.tenDuongSu),
      idLoaiDs: new FormControl(dmDuongSuRawValue.idLoaiDs),
      diaChi: new FormControl(dmDuongSuRawValue.diaChi),
      trangThai: new FormControl(dmDuongSuRawValue.trangThai),
      thongTinDs: new FormControl(dmDuongSuRawValue.thongTinDs),
      ngayThaoTac: new FormControl(dmDuongSuRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(dmDuongSuRawValue.nguoiThaoTac),
      idDsGoc: new FormControl(dmDuongSuRawValue.idDsGoc),
      idTinhTrang: new FormControl(dmDuongSuRawValue.idTinhTrang),
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
        id: { value: dmDuongSuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmDuongSuFormDefaults {
    return {
      id: null,
    };
  }
}
