import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDuongSuTrungCmndBak, NewDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDuongSuTrungCmndBak for edit and NewDuongSuTrungCmndBakFormGroupInput for create.
 */
type DuongSuTrungCmndBakFormGroupInput = IDuongSuTrungCmndBak | PartialWithRequiredKeyOf<NewDuongSuTrungCmndBak>;

type DuongSuTrungCmndBakFormDefaults = Pick<NewDuongSuTrungCmndBak, 'id'>;

type DuongSuTrungCmndBakFormGroupContent = {
  id: FormControl<IDuongSuTrungCmndBak['id'] | NewDuongSuTrungCmndBak['id']>;
  idDuongSu: FormControl<IDuongSuTrungCmndBak['idDuongSu']>;
  tenDuongSu: FormControl<IDuongSuTrungCmndBak['tenDuongSu']>;
  idLoaiDs: FormControl<IDuongSuTrungCmndBak['idLoaiDs']>;
  diaChi: FormControl<IDuongSuTrungCmndBak['diaChi']>;
  trangThai: FormControl<IDuongSuTrungCmndBak['trangThai']>;
  thongTinDs: FormControl<IDuongSuTrungCmndBak['thongTinDs']>;
  ngayThaoTac: FormControl<IDuongSuTrungCmndBak['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDuongSuTrungCmndBak['nguoiThaoTac']>;
  idDsGoc: FormControl<IDuongSuTrungCmndBak['idDsGoc']>;
  idTinhTrang: FormControl<IDuongSuTrungCmndBak['idTinhTrang']>;
  idMaster: FormControl<IDuongSuTrungCmndBak['idMaster']>;
  idDonVi: FormControl<IDuongSuTrungCmndBak['idDonVi']>;
  strSearch: FormControl<IDuongSuTrungCmndBak['strSearch']>;
  soGiayTo: FormControl<IDuongSuTrungCmndBak['soGiayTo']>;
};

export type DuongSuTrungCmndBakFormGroup = FormGroup<DuongSuTrungCmndBakFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DuongSuTrungCmndBakFormService {
  createDuongSuTrungCmndBakFormGroup(duongSuTrungCmndBak: DuongSuTrungCmndBakFormGroupInput = { id: null }): DuongSuTrungCmndBakFormGroup {
    const duongSuTrungCmndBakRawValue = {
      ...this.getFormDefaults(),
      ...duongSuTrungCmndBak,
    };
    return new FormGroup<DuongSuTrungCmndBakFormGroupContent>({
      id: new FormControl(
        { value: duongSuTrungCmndBakRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDuongSu: new FormControl(duongSuTrungCmndBakRawValue.idDuongSu),
      tenDuongSu: new FormControl(duongSuTrungCmndBakRawValue.tenDuongSu),
      idLoaiDs: new FormControl(duongSuTrungCmndBakRawValue.idLoaiDs),
      diaChi: new FormControl(duongSuTrungCmndBakRawValue.diaChi),
      trangThai: new FormControl(duongSuTrungCmndBakRawValue.trangThai),
      thongTinDs: new FormControl(duongSuTrungCmndBakRawValue.thongTinDs),
      ngayThaoTac: new FormControl(duongSuTrungCmndBakRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(duongSuTrungCmndBakRawValue.nguoiThaoTac),
      idDsGoc: new FormControl(duongSuTrungCmndBakRawValue.idDsGoc),
      idTinhTrang: new FormControl(duongSuTrungCmndBakRawValue.idTinhTrang),
      idMaster: new FormControl(duongSuTrungCmndBakRawValue.idMaster),
      idDonVi: new FormControl(duongSuTrungCmndBakRawValue.idDonVi),
      strSearch: new FormControl(duongSuTrungCmndBakRawValue.strSearch),
      soGiayTo: new FormControl(duongSuTrungCmndBakRawValue.soGiayTo),
    });
  }

  getDuongSuTrungCmndBak(form: DuongSuTrungCmndBakFormGroup): IDuongSuTrungCmndBak | NewDuongSuTrungCmndBak {
    return form.getRawValue() as IDuongSuTrungCmndBak | NewDuongSuTrungCmndBak;
  }

  resetForm(form: DuongSuTrungCmndBakFormGroup, duongSuTrungCmndBak: DuongSuTrungCmndBakFormGroupInput): void {
    const duongSuTrungCmndBakRawValue = { ...this.getFormDefaults(), ...duongSuTrungCmndBak };
    form.reset(
      {
        ...duongSuTrungCmndBakRawValue,
        id: { value: duongSuTrungCmndBakRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DuongSuTrungCmndBakFormDefaults {
    return {
      id: null,
    };
  }
}
