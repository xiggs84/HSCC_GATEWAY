import dayjs from 'dayjs/esm';

import { IDanhSachChungThuc, NewDanhSachChungThuc } from './danh-sach-chung-thuc.model';

export const sampleWithRequiredData: IDanhSachChungThuc = {
  idChungThuc: 'b70a171a-785d-4bd1-b8b3-8f11be2c0dd4',
};

export const sampleWithPartialData: IDanhSachChungThuc = {
  idChungThuc: 'f029bc32-d723-4f72-aeb7-9fab289524fb',
  nguoiChungThuc: 10434,
  ngayChungThuc: dayjs('2024-08-19'),
  ngayThaoTac: dayjs('2024-08-19'),
  trangThai: 8503,
  chuKyNgoaiTruSo: 24471,
  ngayText: 'decode',
  soTienThu: 314,
};

export const sampleWithFullData: IDanhSachChungThuc = {
  idChungThuc: '443182ec-94ee-4e31-aa90-302e01fc79df',
  idDonVi: 28093,
  nguoiChungThuc: 28064,
  nguoiThaoTac: 23298,
  ngayChungThuc: dayjs('2024-08-20'),
  ngayThaoTac: dayjs('2024-08-19'),
  trangThai: 32421,
  quyenSo: 25700,
  srcChungThuc: 'lest mysterious out',
  chuKyNgoaiTruSo: 19925,
  ngayText: 'aside',
  strSearch: 'inside',
  soTienThu: 8607,
  ldPheDuyet: 5669,
};

export const sampleWithNewData: NewDanhSachChungThuc = {
  idChungThuc: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
