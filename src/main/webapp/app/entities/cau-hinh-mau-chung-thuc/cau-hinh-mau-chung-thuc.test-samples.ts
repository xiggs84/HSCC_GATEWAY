import dayjs from 'dayjs/esm';

import { ICauHinhMauChungThuc, NewCauHinhMauChungThuc } from './cau-hinh-mau-chung-thuc.model';

export const sampleWithRequiredData: ICauHinhMauChungThuc = {
  id: 6998,
};

export const sampleWithPartialData: ICauHinhMauChungThuc = {
  id: 13201,
  fileChungThuc: 'ha athwart frail',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 10908,
  idLoaiSo: 22434,
};

export const sampleWithFullData: ICauHinhMauChungThuc = {
  id: 20932,
  idLoai: 6711,
  dienGiai: 'unabashedly',
  khungGia: 185,
  hasBenB: 8134,
  hasTaiSan: 3811,
  trangThai: 17818,
  fileChungThuc: 'afore duh configure',
  srcChungThuc: 'pew stream aboard',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 839,
  idDonVi: 16089,
  idLoaiSo: 10741,
};

export const sampleWithNewData: NewCauHinhMauChungThuc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
