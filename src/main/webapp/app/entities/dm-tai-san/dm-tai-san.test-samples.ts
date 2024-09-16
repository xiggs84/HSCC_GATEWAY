import dayjs from 'dayjs/esm';

import { IDmTaiSan, NewDmTaiSan } from './dm-tai-san.model';

export const sampleWithRequiredData: IDmTaiSan = {
  idTaiSan: 10895,
};

export const sampleWithPartialData: IDmTaiSan = {
  idTaiSan: 9260,
  tenTaiSan: 'hideous',
  thongTinTs: 'full disguise',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 30941,
  idDuongSu: 9239,
  maTaiSan: 'bower',
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-20'),
  idMaster: 26297,
  idDonVi: 11270,
  soHsCv: 1853,
  soCc: 22267,
  soVaoSo: 14113,
  moTa: 'defiantly punctually sympathetic',
  loaiNganChan: 29147,
};

export const sampleWithFullData: IDmTaiSan = {
  idTaiSan: 681,
  tenTaiSan: 'lab',
  trangThai: 19338,
  thongTinTs: 'film for highly',
  ghiChu: 'patiently busily till',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 14633,
  idDuongSu: 30021,
  idTsGoc: 26121,
  maTaiSan: 'shoehorn',
  idLoaiNganChan: 15298,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-19'),
  idMaster: 14424,
  strSearch: 'haemorrhage incarnation',
  idDonVi: 5972,
  soHsCv: 27253,
  soCc: 21835,
  soVaoSo: 6049,
  moTa: 'oh',
  loaiNganChan: 13833,
};

export const sampleWithNewData: NewDmTaiSan = {
  idTaiSan: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
