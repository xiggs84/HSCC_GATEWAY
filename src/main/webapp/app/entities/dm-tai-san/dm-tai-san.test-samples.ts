import dayjs from 'dayjs/esm';

import { IDmTaiSan, NewDmTaiSan } from './dm-tai-san.model';

export const sampleWithRequiredData: IDmTaiSan = {
  id: 3037,
};

export const sampleWithPartialData: IDmTaiSan = {
  id: 15576,
  idTaiSan: 12561,
  tenTaiSan: 'lest not',
  thongTinTs: 'creek in',
  ghiChu: 'towards granular nor',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 12843,
  idDuongSu: 31384,
  idTsGoc: 31487,
  idTinhTrang: 14882,
  ngayBdNganChan: dayjs('2024-08-20'),
  idMaster: 29797,
  strSearch: 'suddenly',
  soHsCv: 28007,
  moTa: 'woot',
};

export const sampleWithFullData: IDmTaiSan = {
  id: 27342,
  idTaiSan: 20823,
  tenTaiSan: 'through within fooey',
  trangThai: 9385,
  thongTinTs: 'hydrolyze',
  idLoaiTs: 20209,
  ghiChu: 'aware',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 2908,
  idDuongSu: 19465,
  idTsGoc: 31404,
  maTaiSan: 'something why velvety',
  idTinhTrang: 22303,
  idLoaiNganChan: 26715,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-19'),
  idMaster: 26148,
  strSearch: 'midst naturalise',
  idDonVi: 31054,
  soHsCv: 19929,
  soCc: 31415,
  soVaoSo: 28890,
  moTa: 'pomelo elderly hm',
  loaiNganChan: 10137,
};

export const sampleWithNewData: NewDmTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
