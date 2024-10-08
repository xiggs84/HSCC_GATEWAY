import dayjs from 'dayjs/esm';

import { IDanhSachTaiSan, NewDanhSachTaiSan } from './danh-sach-tai-san.model';

export const sampleWithRequiredData: IDanhSachTaiSan = {
  id: 27239,
};

export const sampleWithPartialData: IDanhSachTaiSan = {
  id: 3871,
  tenTaiSan: 'hmph absent sniveling',
  trangThai: 13853,
  nguoiThaoTac: 31106,
  ngayKtNganChan: dayjs('2024-08-20'),
  strSearch: 'an distant',
  idDonVi: 3101,
  moTa: 'lest failing',
  maXa: 'purple abide',
};

export const sampleWithFullData: IDanhSachTaiSan = {
  id: 5516,
  tenTaiSan: 'pace once systematize',
  trangThai: 25148,
  ghiChu: 'near nibble',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 18612,
  idDuongSu: 23824,
  idTsGoc: 32074,
  maTaiSan: 'insidious although frost',
  idLoaiNganChan: 8565,
  ngayBdNganChan: dayjs('2024-08-20'),
  ngayKtNganChan: dayjs('2024-08-20'),
  idMaster: 7121,
  strSearch: 'far',
  idDonVi: 21843,
  soHsCv: 6760,
  soCc: 14162,
  soVaoSo: 24531,
  moTa: 'kiddingly ultimately',
  loaiNganChan: 15904,
  maXa: 'mid oh that',
};

export const sampleWithNewData: NewDanhSachTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
