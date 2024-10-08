import { ITinhTrangTaiSan, NewTinhTrangTaiSan } from './tinh-trang-tai-san.model';

export const sampleWithRequiredData: ITinhTrangTaiSan = {
  idTinhTrang: 26329,
};

export const sampleWithPartialData: ITinhTrangTaiSan = {
  idTinhTrang: 23843,
  trangThai: 2169,
};

export const sampleWithFullData: ITinhTrangTaiSan = {
  idTinhTrang: 29692,
  dienGiai: 'courageously overtake e-reader',
  trangThai: 12351,
};

export const sampleWithNewData: NewTinhTrangTaiSan = {
  idTinhTrang: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
