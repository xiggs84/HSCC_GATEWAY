import { IThuaTach, NewThuaTach } from './thua-tach.model';

export const sampleWithRequiredData: IThuaTach = {
  idThuaTach: 11536,
};

export const sampleWithPartialData: IThuaTach = {
  idThuaTach: 11684,
  trangThai: 19249,
};

export const sampleWithFullData: IThuaTach = {
  idThuaTach: 17150,
  thongTinThuaTach: 'strawman',
  trangThai: 877,
};

export const sampleWithNewData: NewThuaTach = {
  idThuaTach: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
