import dayjs from 'dayjs/esm';

import { IDanhSachChungThuc, NewDanhSachChungThuc } from './danh-sach-chung-thuc.model';

export const sampleWithRequiredData: IDanhSachChungThuc = {
  id: 32220,
};

export const sampleWithPartialData: IDanhSachChungThuc = {
  id: 6349,
  idChungThuc: 8664,
  nguoiThaoTac: 23849,
  ngayThaoTac: dayjs('2024-08-19'),
  quyenSo: 27822,
  chuKyNgoaiTruSo: 15968,
};

export const sampleWithFullData: IDanhSachChungThuc = {
  id: 6883,
  idChungThuc: 17066,
  idDonVi: 15437,
  nguoiChungThuc: 11973,
  nguoiThaoTac: 12321,
  ngayChungThuc: dayjs('2024-08-19'),
  ngayThaoTac: dayjs('2024-08-19'),
  trangThai: 19827,
  idLoaiGiayTo: 10557,
  quyenSo: 31680,
  srcChungThuc: 'joshingly',
  chuKyNgoaiTruSo: 21855,
  ngayText: 'quarter',
  strSearch: 'gadzooks front',
  soTienThu: 3479,
  ldPheDuyet: 29962,
};

export const sampleWithNewData: NewDanhSachChungThuc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
