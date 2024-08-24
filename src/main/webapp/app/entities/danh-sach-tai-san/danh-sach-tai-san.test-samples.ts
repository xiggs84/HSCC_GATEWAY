import dayjs from 'dayjs/esm';

import { IDanhSachTaiSan, NewDanhSachTaiSan } from './danh-sach-tai-san.model';

export const sampleWithRequiredData: IDanhSachTaiSan = {
  id: 11130,
};

export const sampleWithPartialData: IDanhSachTaiSan = {
  id: 27024,
  trangThai: 4165,
  idLoaiTs: 21152,
  ghiChu: 'now',
  idDuongSu: 19295,
  maTaiSan: 'appease hence',
  idLoaiNganChan: 24350,
  idMaster: 32477,
  soHsCv: 307,
  soCc: 10415,
  soVaoSo: 21703,
  maXa: 'buzzing after',
};

export const sampleWithFullData: IDanhSachTaiSan = {
  id: 16844,
  idTaiSan: 30223,
  tenTaiSan: 'of',
  trangThai: 15095,
  idLoaiTs: 3564,
  ghiChu: 'enclave',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 6755,
  idDuongSu: 16286,
  idTsGoc: 1780,
  maTaiSan: 'briskly',
  idTinhTrang: 3394,
  idLoaiNganChan: 6926,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-20'),
  idMaster: 6553,
  strSearch: 'nephew in opposite',
  idDonVi: 14193,
  soHsCv: 32102,
  soCc: 32504,
  soVaoSo: 19075,
  moTa: 'pheromone',
  loaiNganChan: 10490,
  maXa: 'while',
};

export const sampleWithNewData: NewDanhSachTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
