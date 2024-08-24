import dayjs from 'dayjs/esm';

import { IDmDuongSu, NewDmDuongSu } from './dm-duong-su.model';

export const sampleWithRequiredData: IDmDuongSu = {
  id: 12550,
};

export const sampleWithPartialData: IDmDuongSu = {
  id: 26636,
  idDuongSu: 20347,
  tenDuongSu: 'finally crazy wisteria',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 8633,
  idMaster: 'whoever',
  soGiayTo: 'gee sure-footed',
  idLoaiNganChan: 31399,
};

export const sampleWithFullData: IDmDuongSu = {
  id: 22070,
  idDuongSu: 24974,
  tenDuongSu: 'surprisingly',
  idLoaiDs: 3059,
  diaChi: 'separate woot provided',
  trangThai: 4467,
  thongTinDs: 'sightsee tennis',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 16900,
  idDsGoc: 7384,
  idTinhTrang: 7739,
  idMaster: 'frankly',
  idDonVi: 5676,
  strSearch: 'whoever off',
  soGiayTo: 'promptly',
  idLoaiNganChan: 17884,
};

export const sampleWithNewData: NewDmDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
