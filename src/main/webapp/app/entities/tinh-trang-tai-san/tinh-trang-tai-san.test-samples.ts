import { ITinhTrangTaiSan, NewTinhTrangTaiSan } from './tinh-trang-tai-san.model';

export const sampleWithRequiredData: ITinhTrangTaiSan = {
  idTinhTrang: 4960,
};

export const sampleWithPartialData: ITinhTrangTaiSan = {
  idTinhTrang: 3874,
  trangThai: 26286,
};

export const sampleWithFullData: ITinhTrangTaiSan = {
  idTinhTrang: 17397,
  dienGiai: 'confide along',
  trangThai: 22779,
};

export const sampleWithNewData: NewTinhTrangTaiSan = {
  idTinhTrang: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
