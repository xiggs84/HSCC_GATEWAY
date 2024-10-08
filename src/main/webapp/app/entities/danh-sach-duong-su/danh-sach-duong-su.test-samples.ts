import dayjs from 'dayjs/esm';

import { IDanhSachDuongSu, NewDanhSachDuongSu } from './danh-sach-duong-su.model';

export const sampleWithRequiredData: IDanhSachDuongSu = {
  id: 27013,
};

export const sampleWithPartialData: IDanhSachDuongSu = {
  id: 17651,
  tenDuongSu: 'linear far afore',
  idDsGoc: 1692,
  strSearch: 'want',
  idLoaiNganChan: 3382,
};

export const sampleWithFullData: IDanhSachDuongSu = {
  id: 7292,
  tenDuongSu: 'muzzle quaintly',
  diaChi: 'when amongst',
  trangThai: 1,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 4165,
  idDsGoc: 27958,
  idMaster: 'daunt',
  idDonVi: 9022,
  strSearch: 'while',
  soGiayTo: 'till connote',
  idLoaiNganChan: 32527,
};

export const sampleWithNewData: NewDanhSachDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
