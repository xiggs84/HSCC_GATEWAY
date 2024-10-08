import dayjs from 'dayjs/esm';

import { IDuongSu, NewDuongSu } from './duong-su.model';

export const sampleWithRequiredData: IDuongSu = {
  idDuongSu: 15173,
};

export const sampleWithPartialData: IDuongSu = {
  idDuongSu: 17565,
  soDienThoai: 'via hiccup',
  fax: 'drat entire detail',
  trangThai: 1,
  nguoiThaoTac: 23606,
  idDsGoc: 29019,
  idMaster: 'bus',
  idDonVi: 29993,
  ghiChu: 'lighthearted brr',
  idLoaiNganChan: 13225,
  syncStatus: 1,
};

export const sampleWithFullData: IDuongSu = {
  idDuongSu: 4387,
  tenDuongSu: 'geez newsprint',
  diaChi: 'chaise',
  soDienThoai: 'how outrageous',
  email: 'ThanhXuan_Hoang@yahoo.com',
  fax: 'ramen if with',
  website: 'toward above',
  trangThai: 1,
  thongTinDs: '../fake-data/blob/hipster.txt',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 2181,
  idDsGoc: 18387,
  idMaster: 'mmm seat flavour',
  idDonVi: 14515,
  strSearch: 'implementation',
  soGiayTo: 'urgently',
  ghiChu: 'shoe-horn psst',
  idLoaiNganChan: 1980,
  syncStatus: 1,
};

export const sampleWithNewData: NewDuongSu = {
  idDuongSu: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
