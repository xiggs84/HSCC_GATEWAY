import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IQuanHeNhanThan, NewQuanHeNhanThan } from '../quan-he-nhan-than.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idQuanHe: unknown }> = Partial<Omit<T, 'idQuanHe'>> & { idQuanHe: T['idQuanHe'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuanHeNhanThan for edit and NewQuanHeNhanThanFormGroupInput for create.
 */
type QuanHeNhanThanFormGroupInput = IQuanHeNhanThan | PartialWithRequiredKeyOf<NewQuanHeNhanThan>;

type QuanHeNhanThanFormDefaults = Pick<NewQuanHeNhanThan, 'idQuanHe'>;

type QuanHeNhanThanFormGroupContent = {
  idQuanHe: FormControl<IQuanHeNhanThan['idQuanHe'] | NewQuanHeNhanThan['idQuanHe']>;
  dienGiai: FormControl<IQuanHeNhanThan['dienGiai']>;
  idQuanHeDoiUng: FormControl<IQuanHeNhanThan['idQuanHeDoiUng']>;
};

export type QuanHeNhanThanFormGroup = FormGroup<QuanHeNhanThanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuanHeNhanThanFormService {
  createQuanHeNhanThanFormGroup(quanHeNhanThan: QuanHeNhanThanFormGroupInput = { idQuanHe: null }): QuanHeNhanThanFormGroup {
    const quanHeNhanThanRawValue = {
      ...this.getFormDefaults(),
      ...quanHeNhanThan,
    };
    return new FormGroup<QuanHeNhanThanFormGroupContent>({
      idQuanHe: new FormControl(
        { value: quanHeNhanThanRawValue.idQuanHe, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(quanHeNhanThanRawValue.dienGiai),
      idQuanHeDoiUng: new FormControl(quanHeNhanThanRawValue.idQuanHeDoiUng),
    });
  }

  getQuanHeNhanThan(form: QuanHeNhanThanFormGroup): IQuanHeNhanThan | NewQuanHeNhanThan {
    return form.getRawValue() as IQuanHeNhanThan | NewQuanHeNhanThan;
  }

  resetForm(form: QuanHeNhanThanFormGroup, quanHeNhanThan: QuanHeNhanThanFormGroupInput): void {
    const quanHeNhanThanRawValue = { ...this.getFormDefaults(), ...quanHeNhanThan };
    form.reset(
      {
        ...quanHeNhanThanRawValue,
        idQuanHe: { value: quanHeNhanThanRawValue.idQuanHe, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuanHeNhanThanFormDefaults {
    return {
      idQuanHe: null,
    };
  }
}
