import dayjs from 'dayjs/esm';

import { IDuongSuTrungCmnd, NewDuongSuTrungCmnd } from './duong-su-trung-cmnd.model';

export const sampleWithRequiredData: IDuongSuTrungCmnd = {
  id: 4564,
};

export const sampleWithPartialData: IDuongSuTrungCmnd = {
  id: 23277,
  tenDuongSu: 'vice',
  thongTinDs: 'behest malinger finally',
  nguoiThaoTac: 23740,
  strSearch: 'inside',
  idDuongSuMin: 32652,
};

export const sampleWithFullData: IDuongSuTrungCmnd = {
  id: 18548,
  tenDuongSu: 'the vaguely drat',
  diaChi: 'party',
  trangThai: 0,
  thongTinDs: 'mill tightly upward',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 24007,
  idDsGoc: 18654,
  idMaster: 'besides',
  idDonVi: 23229,
  strSearch: 'which',
  soGiayTo: 'ridge viciously sweaty',
  idDuongSuMin: 22034,
  idMasterMin: 8977,
  idDuongSuMax: 9211,
  idMasterMax: 11979,
};

export const sampleWithNewData: NewDuongSuTrungCmnd = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
