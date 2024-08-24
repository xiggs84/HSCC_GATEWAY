import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDmXaTmp, NewDmXaTmp } from '../dm-xa-tmp.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmXaTmp for edit and NewDmXaTmpFormGroupInput for create.
 */
type DmXaTmpFormGroupInput = IDmXaTmp | PartialWithRequiredKeyOf<NewDmXaTmp>;

type DmXaTmpFormDefaults = Pick<NewDmXaTmp, 'id'>;

type DmXaTmpFormGroupContent = {
  id: FormControl<IDmXaTmp['id'] | NewDmXaTmp['id']>;
  maXa: FormControl<IDmXaTmp['maXa']>;
  tenXa: FormControl<IDmXaTmp['tenXa']>;
  maHuyen: FormControl<IDmXaTmp['maHuyen']>;
};

export type DmXaTmpFormGroup = FormGroup<DmXaTmpFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DmXaTmpFormService {
  createDmXaTmpFormGroup(dmXaTmp: DmXaTmpFormGroupInput = { id: null }): DmXaTmpFormGroup {
    const dmXaTmpRawValue = {
      ...this.getFormDefaults(),
      ...dmXaTmp,
    };
    return new FormGroup<DmXaTmpFormGroupContent>({
      id: new FormControl(
        { value: dmXaTmpRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      maXa: new FormControl(dmXaTmpRawValue.maXa),
      tenXa: new FormControl(dmXaTmpRawValue.tenXa),
      maHuyen: new FormControl(dmXaTmpRawValue.maHuyen),
    });
  }

  getDmXaTmp(form: DmXaTmpFormGroup): IDmXaTmp | NewDmXaTmp {
    return form.getRawValue() as IDmXaTmp | NewDmXaTmp;
  }

  resetForm(form: DmXaTmpFormGroup, dmXaTmp: DmXaTmpFormGroupInput): void {
    const dmXaTmpRawValue = { ...this.getFormDefaults(), ...dmXaTmp };
    form.reset(
      {
        ...dmXaTmpRawValue,
        id: { value: dmXaTmpRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmXaTmpFormDefaults {
    return {
      id: null,
    };
  }
}
