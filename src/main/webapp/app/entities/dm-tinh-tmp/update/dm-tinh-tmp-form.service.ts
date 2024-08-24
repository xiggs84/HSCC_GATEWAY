import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDmTinhTmp, NewDmTinhTmp } from '../dm-tinh-tmp.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmTinhTmp for edit and NewDmTinhTmpFormGroupInput for create.
 */
type DmTinhTmpFormGroupInput = IDmTinhTmp | PartialWithRequiredKeyOf<NewDmTinhTmp>;

type DmTinhTmpFormDefaults = Pick<NewDmTinhTmp, 'id'>;

type DmTinhTmpFormGroupContent = {
  id: FormControl<IDmTinhTmp['id'] | NewDmTinhTmp['id']>;
  maTinh: FormControl<IDmTinhTmp['maTinh']>;
  tenTinh: FormControl<IDmTinhTmp['tenTinh']>;
};

export type DmTinhTmpFormGroup = FormGroup<DmTinhTmpFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DmTinhTmpFormService {
  createDmTinhTmpFormGroup(dmTinhTmp: DmTinhTmpFormGroupInput = { id: null }): DmTinhTmpFormGroup {
    const dmTinhTmpRawValue = {
      ...this.getFormDefaults(),
      ...dmTinhTmp,
    };
    return new FormGroup<DmTinhTmpFormGroupContent>({
      id: new FormControl(
        { value: dmTinhTmpRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      maTinh: new FormControl(dmTinhTmpRawValue.maTinh),
      tenTinh: new FormControl(dmTinhTmpRawValue.tenTinh),
    });
  }

  getDmTinhTmp(form: DmTinhTmpFormGroup): IDmTinhTmp | NewDmTinhTmp {
    return form.getRawValue() as IDmTinhTmp | NewDmTinhTmp;
  }

  resetForm(form: DmTinhTmpFormGroup, dmTinhTmp: DmTinhTmpFormGroupInput): void {
    const dmTinhTmpRawValue = { ...this.getFormDefaults(), ...dmTinhTmp };
    form.reset(
      {
        ...dmTinhTmpRawValue,
        id: { value: dmTinhTmpRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmTinhTmpFormDefaults {
    return {
      id: null,
    };
  }
}
