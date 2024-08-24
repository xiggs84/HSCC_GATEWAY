import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IChungThuc, NewChungThuc } from '../chung-thuc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IChungThuc for edit and NewChungThucFormGroupInput for create.
 */
type ChungThucFormGroupInput = IChungThuc | PartialWithRequiredKeyOf<NewChungThuc>;

type ChungThucFormDefaults = Pick<NewChungThuc, 'id'>;

type ChungThucFormGroupContent = {
  id: FormControl<IChungThuc['id'] | NewChungThuc['id']>;
  idChungThuc: FormControl<IChungThuc['idChungThuc']>;
  idDonVi: FormControl<IChungThuc['idDonVi']>;
  nguoiYeuCau: FormControl<IChungThuc['nguoiYeuCau']>;
  nguoiChungThuc: FormControl<IChungThuc['nguoiChungThuc']>;
  nguoiThaoTac: FormControl<IChungThuc['nguoiThaoTac']>;
  ngayChungThuc: FormControl<IChungThuc['ngayChungThuc']>;
  ngayThaoTac: FormControl<IChungThuc['ngayThaoTac']>;
  soTienThu: FormControl<IChungThuc['soTienThu']>;
  soBanSao: FormControl<IChungThuc['soBanSao']>;
  vanBan: FormControl<IChungThuc['vanBan']>;
  trangThai: FormControl<IChungThuc['trangThai']>;
  idLoaiGiayTo: FormControl<IChungThuc['idLoaiGiayTo']>;
  quyenSo: FormControl<IChungThuc['quyenSo']>;
  duongSu: FormControl<IChungThuc['duongSu']>;
  taiSan: FormControl<IChungThuc['taiSan']>;
  strSearch: FormControl<IChungThuc['strSearch']>;
  srcChungThuc: FormControl<IChungThuc['srcChungThuc']>;
  thongTinChungThuc: FormControl<IChungThuc['thongTinChungThuc']>;
  chuKyNgoaiTruSo: FormControl<IChungThuc['chuKyNgoaiTruSo']>;
  idCtGoc: FormControl<IChungThuc['idCtGoc']>;
  ngayText: FormControl<IChungThuc['ngayText']>;
  chucDanhCanBo: FormControl<IChungThuc['chucDanhCanBo']>;
  ldPheDuyet: FormControl<IChungThuc['ldPheDuyet']>;
  chucDanhLd: FormControl<IChungThuc['chucDanhLd']>;
};

export type ChungThucFormGroup = FormGroup<ChungThucFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ChungThucFormService {
  createChungThucFormGroup(chungThuc: ChungThucFormGroupInput = { id: null }): ChungThucFormGroup {
    const chungThucRawValue = {
      ...this.getFormDefaults(),
      ...chungThuc,
    };
    return new FormGroup<ChungThucFormGroupContent>({
      id: new FormControl(
        { value: chungThucRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idChungThuc: new FormControl(chungThucRawValue.idChungThuc),
      idDonVi: new FormControl(chungThucRawValue.idDonVi),
      nguoiYeuCau: new FormControl(chungThucRawValue.nguoiYeuCau),
      nguoiChungThuc: new FormControl(chungThucRawValue.nguoiChungThuc),
      nguoiThaoTac: new FormControl(chungThucRawValue.nguoiThaoTac),
      ngayChungThuc: new FormControl(chungThucRawValue.ngayChungThuc),
      ngayThaoTac: new FormControl(chungThucRawValue.ngayThaoTac),
      soTienThu: new FormControl(chungThucRawValue.soTienThu),
      soBanSao: new FormControl(chungThucRawValue.soBanSao),
      vanBan: new FormControl(chungThucRawValue.vanBan),
      trangThai: new FormControl(chungThucRawValue.trangThai),
      idLoaiGiayTo: new FormControl(chungThucRawValue.idLoaiGiayTo),
      quyenSo: new FormControl(chungThucRawValue.quyenSo),
      duongSu: new FormControl(chungThucRawValue.duongSu),
      taiSan: new FormControl(chungThucRawValue.taiSan),
      strSearch: new FormControl(chungThucRawValue.strSearch),
      srcChungThuc: new FormControl(chungThucRawValue.srcChungThuc),
      thongTinChungThuc: new FormControl(chungThucRawValue.thongTinChungThuc),
      chuKyNgoaiTruSo: new FormControl(chungThucRawValue.chuKyNgoaiTruSo),
      idCtGoc: new FormControl(chungThucRawValue.idCtGoc),
      ngayText: new FormControl(chungThucRawValue.ngayText),
      chucDanhCanBo: new FormControl(chungThucRawValue.chucDanhCanBo),
      ldPheDuyet: new FormControl(chungThucRawValue.ldPheDuyet),
      chucDanhLd: new FormControl(chungThucRawValue.chucDanhLd),
    });
  }

  getChungThuc(form: ChungThucFormGroup): IChungThuc | NewChungThuc {
    return form.getRawValue() as IChungThuc | NewChungThuc;
  }

  resetForm(form: ChungThucFormGroup, chungThuc: ChungThucFormGroupInput): void {
    const chungThucRawValue = { ...this.getFormDefaults(), ...chungThuc };
    form.reset(
      {
        ...chungThucRawValue,
        id: { value: chungThucRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ChungThucFormDefaults {
    return {
      id: null,
    };
  }
}
