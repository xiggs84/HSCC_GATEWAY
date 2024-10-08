import dayjs from 'dayjs/esm';

import { IDmTaiSan, NewDmTaiSan } from './dm-tai-san.model';

export const sampleWithRequiredData: IDmTaiSan = {
  idTaiSan: 30401,
};

export const sampleWithPartialData: IDmTaiSan = {
  idTaiSan: 12172,
  thongTinTs: 'over',
  nguoiThaoTac: 27331,
  idDuongSu: 23633,
  idTsGoc: 26936,
  maTaiSan: 'curtain save',
  ngayBdNganChan: dayjs('2024-08-19'),
  idMaster: 3376,
  strSearch: 'certainly',
  soHsCv: 5894,
  moTa: 'sprag since out',
  loaiNganChan: 18833,
};

export const sampleWithFullData: IDmTaiSan = {
  idTaiSan: 11961,
  tenTaiSan: 'beyond aha',
  trangThai: 10978,
  thongTinTs: 'criminalise gig',
  ghiChu: 'whoa',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 19231,
  idDuongSu: 21534,
  idTsGoc: 31808,
  maTaiSan: 'submissive whose',
  idLoaiNganChan: 26102,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-19'),
  idMaster: 2873,
  strSearch: 'blah agitated amidst',
  idDonVi: 23885,
  soHsCv: 55,
  soCc: 27165,
  soVaoSo: 10935,
  moTa: 'bah',
  loaiNganChan: 4743,
};

export const sampleWithNewData: NewDmTaiSan = {
  idTaiSan: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
