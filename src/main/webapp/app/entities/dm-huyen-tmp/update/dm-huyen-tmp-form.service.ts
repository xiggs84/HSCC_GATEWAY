import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDmHuyenTmp, NewDmHuyenTmp } from '../dm-huyen-tmp.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmHuyenTmp for edit and NewDmHuyenTmpFormGroupInput for create.
 */
type DmHuyenTmpFormGroupInput = IDmHuyenTmp | PartialWithRequiredKeyOf<NewDmHuyenTmp>;

type DmHuyenTmpFormDefaults = Pick<NewDmHuyenTmp, 'id'>;

type DmHuyenTmpFormGroupContent = {
  id: FormControl<IDmHuyenTmp['id'] | NewDmHuyenTmp['id']>;
  maHuyen: FormControl<IDmHuyenTmp['maHuyen']>;
  tenHuyen: FormControl<IDmHuyenTmp['tenHuyen']>;
  maTinh: FormControl<IDmHuyenTmp['maTinh']>;
};

export type DmHuyenTmpFormGroup = FormGroup<DmHuyenTmpFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DmHuyenTmpFormService {
  createDmHuyenTmpFormGroup(dmHuyenTmp: DmHuyenTmpFormGroupInput = { id: null }): DmHuyenTmpFormGroup {
    const dmHuyenTmpRawValue = {
      ...this.getFormDefaults(),
      ...dmHuyenTmp,
    };
    return new FormGroup<DmHuyenTmpFormGroupContent>({
      id: new FormControl(
        { value: dmHuyenTmpRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      maHuyen: new FormControl(dmHuyenTmpRawValue.maHuyen),
      tenHuyen: new FormControl(dmHuyenTmpRawValue.tenHuyen),
      maTinh: new FormControl(dmHuyenTmpRawValue.maTinh),
    });
  }

  getDmHuyenTmp(form: DmHuyenTmpFormGroup): IDmHuyenTmp | NewDmHuyenTmp {
    return form.getRawValue() as IDmHuyenTmp | NewDmHuyenTmp;
  }

  resetForm(form: DmHuyenTmpFormGroup, dmHuyenTmp: DmHuyenTmpFormGroupInput): void {
    const dmHuyenTmpRawValue = { ...this.getFormDefaults(), ...dmHuyenTmp };
    form.reset(
      {
        ...dmHuyenTmpRawValue,
        id: { value: dmHuyenTmpRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmHuyenTmpFormDefaults {
    return {
      id: null,
    };
  }
}
