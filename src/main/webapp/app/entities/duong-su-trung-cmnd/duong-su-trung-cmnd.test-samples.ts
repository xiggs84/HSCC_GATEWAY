import dayjs from 'dayjs/esm';

import { IDuongSuTrungCmnd, NewDuongSuTrungCmnd } from './duong-su-trung-cmnd.model';

export const sampleWithRequiredData: IDuongSuTrungCmnd = {
  id: 8616,
};

export const sampleWithPartialData: IDuongSuTrungCmnd = {
  id: 26899,
  diaChi: 'gadzooks given',
  trangThai: 1,
  thongTinDs: 'kludge sugary sparerib',
  idDuongSuMin: 17275,
  idDuongSuMax: 11411,
  idMasterMax: 10953,
};

export const sampleWithFullData: IDuongSuTrungCmnd = {
  id: 18332,
  tenDuongSu: 'over matter',
  diaChi: 'plumb',
  trangThai: 1,
  thongTinDs: 'flustered',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 18632,
  idDsGoc: 6619,
  idMaster: 'woeful plus off',
  idDonVi: 13387,
  strSearch: 'mmm immobilize',
  soGiayTo: 'what assessment',
  idDuongSuMin: 13533,
  idMasterMin: 6015,
  idDuongSuMax: 32434,
  idMasterMax: 7951,
};

export const sampleWithNewData: NewDuongSuTrungCmnd = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
