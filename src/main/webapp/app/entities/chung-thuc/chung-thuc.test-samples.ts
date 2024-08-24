import dayjs from 'dayjs/esm';

import { IChungThuc, NewChungThuc } from './chung-thuc.model';

export const sampleWithRequiredData: IChungThuc = {
  id: 17746,
};

export const sampleWithPartialData: IChungThuc = {
  id: 4796,
  nguoiChungThuc: 26165,
  nguoiThaoTac: 1318,
  soTienThu: 24019,
  vanBan: 'vastly except',
  idLoaiGiayTo: 24188,
  strSearch: 'ick besides',
  thongTinChungThuc: 'junker onto bellow',
  idCtGoc: 19188,
  ldPheDuyet: 30004,
  chucDanhLd: 'justly',
};

export const sampleWithFullData: IChungThuc = {
  id: 26757,
  idChungThuc: 12775,
  idDonVi: 7543,
  nguoiYeuCau: 'clog android',
  nguoiChungThuc: 2973,
  nguoiThaoTac: 28927,
  ngayChungThuc: dayjs('2024-08-19'),
  ngayThaoTac: dayjs('2024-08-20'),
  soTienThu: 20176,
  soBanSao: 12997,
  vanBan: 'easy mirror pirate',
  trangThai: 32413,
  idLoaiGiayTo: 17836,
  quyenSo: 28615,
  duongSu: 'urgently',
  taiSan: 'friend until why',
  strSearch: 'except',
  srcChungThuc: 'vicinity',
  thongTinChungThuc: 'meh brr times',
  chuKyNgoaiTruSo: 26604,
  idCtGoc: 13687,
  ngayText: 'awkwardly drat',
  chucDanhCanBo: 'frilly whether',
  ldPheDuyet: 26092,
  chucDanhLd: 'geez loftily',
};

export const sampleWithNewData: NewChungThuc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
