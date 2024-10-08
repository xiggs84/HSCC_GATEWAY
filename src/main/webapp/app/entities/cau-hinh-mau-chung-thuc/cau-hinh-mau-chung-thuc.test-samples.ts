import dayjs from 'dayjs/esm';

import { ICauHinhMauChungThuc, NewCauHinhMauChungThuc } from './cau-hinh-mau-chung-thuc.model';

export const sampleWithRequiredData: ICauHinhMauChungThuc = {
  id: 20327,
};

export const sampleWithPartialData: ICauHinhMauChungThuc = {
  id: 20093,
  khungGia: 4558,
  hasBenB: 13975,
  hasTaiSan: 9681,
  fileChungThuc: 'forenenst twig',
  srcChungThuc: 'aching',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 17973,
  idDonVi: 3182,
};

export const sampleWithFullData: ICauHinhMauChungThuc = {
  id: 31773,
  idLoai: 'while irritably',
  dienGiai: 'mine',
  khungGia: 14874,
  hasBenB: 14408,
  hasTaiSan: 17376,
  trangThai: 3242,
  fileChungThuc: 'shipper',
  srcChungThuc: 'meh film corn',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 25485,
  idDonVi: 30459,
  idLoaiSo: 4396,
};

export const sampleWithNewData: NewCauHinhMauChungThuc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
