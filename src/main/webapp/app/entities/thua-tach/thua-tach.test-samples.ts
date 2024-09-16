import { IThuaTach, NewThuaTach } from './thua-tach.model';

export const sampleWithRequiredData: IThuaTach = {
  idThuaTach: 17477,
};

export const sampleWithPartialData: IThuaTach = {
  idThuaTach: 5866,
  thongTinThuaTach: 'boo',
};

export const sampleWithFullData: IThuaTach = {
  idThuaTach: 12170,
  thongTinThuaTach: 'pollutant equatorial amusing',
  trangThai: 11741,
};

export const sampleWithNewData: NewThuaTach = {
  idThuaTach: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
