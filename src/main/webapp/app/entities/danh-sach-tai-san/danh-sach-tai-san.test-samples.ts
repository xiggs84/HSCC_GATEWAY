import dayjs from 'dayjs/esm';

import { IDanhSachTaiSan, NewDanhSachTaiSan } from './danh-sach-tai-san.model';

export const sampleWithRequiredData: IDanhSachTaiSan = {
  id: 11694,
};

export const sampleWithPartialData: IDanhSachTaiSan = {
  id: 8659,
  ghiChu: 'wretched',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 4580,
  idDuongSu: 18462,
  maTaiSan: 'oof around',
  ngayKtNganChan: dayjs('2024-08-19'),
  strSearch: 'outside',
  idDonVi: 6076,
  soHsCv: 3901,
  soCc: 19691,
  maXa: 'arrogantly daily',
};

export const sampleWithFullData: IDanhSachTaiSan = {
  id: 18492,
  tenTaiSan: 'boo trainer chat',
  trangThai: 2286,
  ghiChu: 'justly whenever',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 8249,
  idDuongSu: 14848,
  idTsGoc: 15715,
  maTaiSan: 'at and recur',
  idLoaiNganChan: 26355,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-20'),
  idMaster: 26332,
  strSearch: 'outside',
  idDonVi: 9099,
  soHsCv: 31013,
  soCc: 9517,
  soVaoSo: 32242,
  moTa: 'boo via',
  loaiNganChan: 11989,
  maXa: 'worm incompatible',
};

export const sampleWithNewData: NewDanhSachTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
