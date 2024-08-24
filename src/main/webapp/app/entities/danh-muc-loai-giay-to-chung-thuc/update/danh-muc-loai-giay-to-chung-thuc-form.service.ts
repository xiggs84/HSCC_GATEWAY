import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucLoaiGiayToChungThuc, NewDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiGiayToChungThuc for edit and NewDanhMucLoaiGiayToChungThucFormGroupInput for create.
 */
type DanhMucLoaiGiayToChungThucFormGroupInput = IDanhMucLoaiGiayToChungThuc | PartialWithRequiredKeyOf<NewDanhMucLoaiGiayToChungThuc>;

type DanhMucLoaiGiayToChungThucFormDefaults = Pick<NewDanhMucLoaiGiayToChungThuc, 'id'>;

type DanhMucLoaiGiayToChungThucFormGroupContent = {
  id: FormControl<IDanhMucLoaiGiayToChungThuc['id'] | NewDanhMucLoaiGiayToChungThuc['id']>;
  idLoaiGiayTo: FormControl<IDanhMucLoaiGiayToChungThuc['idLoaiGiayTo']>;
  dienGiai: FormControl<IDanhMucLoaiGiayToChungThuc['dienGiai']>;
};

export type DanhMucLoaiGiayToChungThucFormGroup = FormGroup<DanhMucLoaiGiayToChungThucFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiGiayToChungThucFormService {
  createDanhMucLoaiGiayToChungThucFormGroup(
    danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucFormGroupInput = { id: null },
  ): DanhMucLoaiGiayToChungThucFormGroup {
    const danhMucLoaiGiayToChungThucRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiGiayToChungThuc,
    };
    return new FormGroup<DanhMucLoaiGiayToChungThucFormGroupContent>({
      id: new FormControl(
        { value: danhMucLoaiGiayToChungThucRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoaiGiayTo: new FormControl(danhMucLoaiGiayToChungThucRawValue.idLoaiGiayTo),
      dienGiai: new FormControl(danhMucLoaiGiayToChungThucRawValue.dienGiai),
    });
  }

  getDanhMucLoaiGiayToChungThuc(form: DanhMucLoaiGiayToChungThucFormGroup): IDanhMucLoaiGiayToChungThuc | NewDanhMucLoaiGiayToChungThuc {
    return form.getRawValue() as IDanhMucLoaiGiayToChungThuc | NewDanhMucLoaiGiayToChungThuc;
  }

  resetForm(form: DanhMucLoaiGiayToChungThucFormGroup, danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucFormGroupInput): void {
    const danhMucLoaiGiayToChungThucRawValue = { ...this.getFormDefaults(), ...danhMucLoaiGiayToChungThuc };
    form.reset(
      {
        ...danhMucLoaiGiayToChungThucRawValue,
        id: { value: danhMucLoaiGiayToChungThucRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiGiayToChungThucFormDefaults {
    return {
      id: null,
    };
  }
}
