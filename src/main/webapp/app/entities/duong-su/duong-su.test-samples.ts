import dayjs from 'dayjs/esm';

import { IDuongSu, NewDuongSu } from './duong-su.model';

export const sampleWithRequiredData: IDuongSu = {
  id: 21175,
};

export const sampleWithPartialData: IDuongSu = {
  id: 16516,
  idDuongSu: 532,
  tenDuongSu: 'voice yippee',
  diaChi: 'rowdy anenst supposing',
  trangThai: 7594,
  nguoiThaoTac: 16692,
  idTinhTrang: 31710,
  syncStatus: 15907,
};

export const sampleWithFullData: IDuongSu = {
  id: 12837,
  idDuongSu: 12642,
  tenDuongSu: 'rapidly',
  idLoaiDs: 21383,
  diaChi: 'drum excluding delirious',
  trangThai: 8078,
  thongTinDs: 'especially',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 5411,
  idDsGoc: 28975,
  idTinhTrang: 19413,
  idMaster: 'diligently vice before',
  idDonVi: 10690,
  strSearch: 'lest suspiciously',
  soGiayTo: 'beyond mixed',
  idLoaiNganChan: 25497,
  syncStatus: 8876,
};

export const sampleWithNewData: NewDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
