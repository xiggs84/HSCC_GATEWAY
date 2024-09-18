import dayjs from 'dayjs/esm';

import { IDmDuongSu, NewDmDuongSu } from './dm-duong-su.model';

export const sampleWithRequiredData: IDmDuongSu = {
  idDuongSu: 6951,
};

export const sampleWithPartialData: IDmDuongSu = {
  idDuongSu: 1655,
  tenDuongSu: 'below familiar',
  diaChi: 'versus workplace since',
  thongTinDs: 'kaleidoscopic',
  ngayThaoTac: dayjs('2024-08-19'),
  idDsGoc: 20666,
  strSearch: 'pain',
  soGiayTo: 'ah distance when',
};

export const sampleWithFullData: IDmDuongSu = {
  idDuongSu: 4362,
  tenDuongSu: 'following',
  diaChi: 'atop',
  trangThai: 0,
  thongTinDs: 'pfft besides',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 23873,
  idDsGoc: 15375,
  idMaster: 'plain narrow',
  idDonVi: 32438,
  strSearch: 'consequently',
  soGiayTo: 'squash slip',
  idLoaiNganChan: 26149,
};

export const sampleWithNewData: NewDmDuongSu = {
  idDuongSu: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
