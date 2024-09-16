import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITaisannhadatid, NewTaisannhadatid } from '../taisannhadatid.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idTaiSan: unknown }> = Partial<Omit<T, 'idTaiSan'>> & { idTaiSan: T['idTaiSan'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaisannhadatid for edit and NewTaisannhadatidFormGroupInput for create.
 */
type TaisannhadatidFormGroupInput = ITaisannhadatid | PartialWithRequiredKeyOf<NewTaisannhadatid>;

type TaisannhadatidFormDefaults = Pick<NewTaisannhadatid, 'idTaiSan'>;

type TaisannhadatidFormGroupContent = {
  idTaiSan: FormControl<ITaisannhadatid['idTaiSan'] | NewTaisannhadatid['idTaiSan']>;
  thongTinTs: FormControl<ITaisannhadatid['thongTinTs']>;
};

export type TaisannhadatidFormGroup = FormGroup<TaisannhadatidFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaisannhadatidFormService {
  createTaisannhadatidFormGroup(taisannhadatid: TaisannhadatidFormGroupInput = { idTaiSan: null }): TaisannhadatidFormGroup {
    const taisannhadatidRawValue = {
      ...this.getFormDefaults(),
      ...taisannhadatid,
    };
    return new FormGroup<TaisannhadatidFormGroupContent>({
      idTaiSan: new FormControl(
        { value: taisannhadatidRawValue.idTaiSan, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      thongTinTs: new FormControl(taisannhadatidRawValue.thongTinTs),
    });
  }

  getTaisannhadatid(form: TaisannhadatidFormGroup): ITaisannhadatid | NewTaisannhadatid {
    return form.getRawValue() as ITaisannhadatid | NewTaisannhadatid;
  }

  resetForm(form: TaisannhadatidFormGroup, taisannhadatid: TaisannhadatidFormGroupInput): void {
    const taisannhadatidRawValue = { ...this.getFormDefaults(), ...taisannhadatid };
    form.reset(
      {
        ...taisannhadatidRawValue,
        idTaiSan: { value: taisannhadatidRawValue.idTaiSan, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaisannhadatidFormDefaults {
    return {
      idTaiSan: null,
    };
  }
}
