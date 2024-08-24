import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDmHopDong, NewDmHopDong } from '../dm-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmHopDong for edit and NewDmHopDongFormGroupInput for create.
 */
type DmHopDongFormGroupInput = IDmHopDong | PartialWithRequiredKeyOf<NewDmHopDong>;

type DmHopDongFormDefaults = Pick<NewDmHopDong, 'id'>;

type DmHopDongFormGroupContent = {
  id: FormControl<IDmHopDong['id'] | NewDmHopDong['id']>;
  idHopDong: FormControl<IDmHopDong['idHopDong']>;
  ngayLapHd: FormControl<IDmHopDong['ngayLapHd']>;
  nguoiLapHd: FormControl<IDmHopDong['nguoiLapHd']>;
  thongTinDuongSu: FormControl<IDmHopDong['thongTinDuongSu']>;
  thongTinTaiSan: FormControl<IDmHopDong['thongTinTaiSan']>;
  thongTinVanBan: FormControl<IDmHopDong['thongTinVanBan']>;
  trangThai: FormControl<IDmHopDong['trangThai']>;
  idLoaiHd: FormControl<IDmHopDong['idLoaiHd']>;
  dieuKhoanHd: FormControl<IDmHopDong['dieuKhoanHd']>;
  idDonVi: FormControl<IDmHopDong['idDonVi']>;
  ngayThaoTac: FormControl<IDmHopDong['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDmHopDong['nguoiThaoTac']>;
  idHdGoc: FormControl<IDmHopDong['idHdGoc']>;
  thongTinChuyenNhuong: FormControl<IDmHopDong['thongTinChuyenNhuong']>;
  maHopDong: FormControl<IDmHopDong['maHopDong']>;
  srcHopDong: FormControl<IDmHopDong['srcHopDong']>;
  ngayHen: FormControl<IDmHopDong['ngayHen']>;
  idSoCongChung: FormControl<IDmHopDong['idSoCongChung']>;
  soCongChung: FormControl<IDmHopDong['soCongChung']>;
  congChungVien: FormControl<IDmHopDong['congChungVien']>;
  ngayKyHd: FormControl<IDmHopDong['ngayKyHd']>;
  nguoiRutTrich: FormControl<IDmHopDong['nguoiRutTrich']>;
  soTienRutTrich: FormControl<IDmHopDong['soTienRutTrich']>;
  ngayRutTrich: FormControl<IDmHopDong['ngayRutTrich']>;
  hdThuCong: FormControl<IDmHopDong['hdThuCong']>;
  trangThaiRutTrich: FormControl<IDmHopDong['trangThaiRutTrich']>;
  chuKyNgoaiTruSo: FormControl<IDmHopDong['chuKyNgoaiTruSo']>;
  strSearch: FormControl<IDmHopDong['strSearch']>;
  idMaster: FormControl<IDmHopDong['idMaster']>;
  idHdSdHb: FormControl<IDmHopDong['idHdSdHb']>;
  srcDmMaster: FormControl<IDmHopDong['srcDmMaster']>;
  repRefUnique: FormControl<IDmHopDong['repRefUnique']>;
  ngayText: FormControl<IDmHopDong['ngayText']>;
  ngayNum: FormControl<IDmHopDong['ngayNum']>;
  ngayThaoTacRutTrich: FormControl<IDmHopDong['ngayThaoTacRutTrich']>;
  thuLaoCongChung: FormControl<IDmHopDong['thuLaoCongChung']>;
};

export type DmHopDongFormGroup = FormGroup<DmHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DmHopDongFormService {
  createDmHopDongFormGroup(dmHopDong: DmHopDongFormGroupInput = { id: null }): DmHopDongFormGroup {
    const dmHopDongRawValue = {
      ...this.getFormDefaults(),
      ...dmHopDong,
    };
    return new FormGroup<DmHopDongFormGroupContent>({
      id: new FormControl(
        { value: dmHopDongRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idHopDong: new FormControl(dmHopDongRawValue.idHopDong),
      ngayLapHd: new FormControl(dmHopDongRawValue.ngayLapHd),
      nguoiLapHd: new FormControl(dmHopDongRawValue.nguoiLapHd),
      thongTinDuongSu: new FormControl(dmHopDongRawValue.thongTinDuongSu),
      thongTinTaiSan: new FormControl(dmHopDongRawValue.thongTinTaiSan),
      thongTinVanBan: new FormControl(dmHopDongRawValue.thongTinVanBan),
      trangThai: new FormControl(dmHopDongRawValue.trangThai),
      idLoaiHd: new FormControl(dmHopDongRawValue.idLoaiHd),
      dieuKhoanHd: new FormControl(dmHopDongRawValue.dieuKhoanHd),
      idDonVi: new FormControl(dmHopDongRawValue.idDonVi),
      ngayThaoTac: new FormControl(dmHopDongRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(dmHopDongRawValue.nguoiThaoTac),
      idHdGoc: new FormControl(dmHopDongRawValue.idHdGoc),
      thongTinChuyenNhuong: new FormControl(dmHopDongRawValue.thongTinChuyenNhuong),
      maHopDong: new FormControl(dmHopDongRawValue.maHopDong),
      srcHopDong: new FormControl(dmHopDongRawValue.srcHopDong),
      ngayHen: new FormControl(dmHopDongRawValue.ngayHen),
      idSoCongChung: new FormControl(dmHopDongRawValue.idSoCongChung),
      soCongChung: new FormControl(dmHopDongRawValue.soCongChung),
      congChungVien: new FormControl(dmHopDongRawValue.congChungVien),
      ngayKyHd: new FormControl(dmHopDongRawValue.ngayKyHd),
      nguoiRutTrich: new FormControl(dmHopDongRawValue.nguoiRutTrich),
      soTienRutTrich: new FormControl(dmHopDongRawValue.soTienRutTrich),
      ngayRutTrich: new FormControl(dmHopDongRawValue.ngayRutTrich),
      hdThuCong: new FormControl(dmHopDongRawValue.hdThuCong),
      trangThaiRutTrich: new FormControl(dmHopDongRawValue.trangThaiRutTrich),
      chuKyNgoaiTruSo: new FormControl(dmHopDongRawValue.chuKyNgoaiTruSo),
      strSearch: new FormControl(dmHopDongRawValue.strSearch),
      idMaster: new FormControl(dmHopDongRawValue.idMaster),
      idHdSdHb: new FormControl(dmHopDongRawValue.idHdSdHb),
      srcDmMaster: new FormControl(dmHopDongRawValue.srcDmMaster),
      repRefUnique: new FormControl(dmHopDongRawValue.repRefUnique),
      ngayText: new FormControl(dmHopDongRawValue.ngayText),
      ngayNum: new FormControl(dmHopDongRawValue.ngayNum),
      ngayThaoTacRutTrich: new FormControl(dmHopDongRawValue.ngayThaoTacRutTrich),
      thuLaoCongChung: new FormControl(dmHopDongRawValue.thuLaoCongChung),
    });
  }

  getDmHopDong(form: DmHopDongFormGroup): IDmHopDong | NewDmHopDong {
    return form.getRawValue() as IDmHopDong | NewDmHopDong;
  }

  resetForm(form: DmHopDongFormGroup, dmHopDong: DmHopDongFormGroupInput): void {
    const dmHopDongRawValue = { ...this.getFormDefaults(), ...dmHopDong };
    form.reset(
      {
        ...dmHopDongRawValue,
        id: { value: dmHopDongRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmHopDongFormDefaults {
    return {
      id: null,
    };
  }
}
