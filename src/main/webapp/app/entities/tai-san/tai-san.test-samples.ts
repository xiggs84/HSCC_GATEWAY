import dayjs from 'dayjs/esm';

import { ITaiSan, NewTaiSan } from './tai-san.model';

export const sampleWithRequiredData: ITaiSan = {
  idTaiSan: 19707,
};

export const sampleWithPartialData: ITaiSan = {
  idTaiSan: 25962,
  tenTaiSan: 'beautify ew factorize',
  trangThai: 23879,
  ghiChu: 'unaccountably yowza',
  maTaiSan: 'oof yuck',
  ngayBdNganChan: dayjs('2024-08-20'),
  ngayKtNganChan: dayjs('2024-08-20'),
  strSearch: 'spike properly',
  idDonVi: 2082,
  soHsCv: 16006,
  soCc: 26578,
  soVaoSo: 22386,
  loaiNganChan: 7174,
  syncStatus: 7973,
};

export const sampleWithFullData: ITaiSan = {
  idTaiSan: 8970,
  tenTaiSan: 'clumsy',
  trangThai: 21515,
  thongTinTs: '../fake-data/blob/hipster.txt',
  ghiChu: 'hoot voluntarily',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 20401,
  idDuongSu: 18248,
  idTsGoc: 2666,
  maTaiSan: 'if building what',
  idLoaiNganChan: 21921,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-19'),
  idMaster: 17544,
  strSearch: 'ennoble',
  idDonVi: 21098,
  soHsCv: 12116,
  soCc: 19334,
  soVaoSo: 23026,
  moTa: 'lost',
  loaiNganChan: 11928,
  syncStatus: 5453,
};

export const sampleWithNewData: NewTaiSan = {
  idTaiSan: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
