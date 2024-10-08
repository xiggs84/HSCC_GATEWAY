import dayjs from 'dayjs/esm';

import { IDmDuongSu, NewDmDuongSu } from './dm-duong-su.model';

export const sampleWithRequiredData: IDmDuongSu = {
  idDuongSu: 17546,
};

export const sampleWithPartialData: IDmDuongSu = {
  idDuongSu: 29824,
  tenDuongSu: 'neatly beside injustice',
  diaChi: 'grateful',
  trangThai: 0,
  thongTinDs: 'whirlwind finally upside-down',
  nguoiThaoTac: 27055,
  idDsGoc: 27903,
  strSearch: 'yippee',
};

export const sampleWithFullData: IDmDuongSu = {
  idDuongSu: 1637,
  tenDuongSu: 'qua turbulent',
  diaChi: 'tick gosh',
  trangThai: 0,
  thongTinDs: 'barring unto psst',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 15479,
  idDsGoc: 7204,
  idMaster: 'rotten',
  idDonVi: 17102,
  strSearch: 'lest',
  soGiayTo: 'boo yowza',
  idLoaiNganChan: 15447,
};

export const sampleWithNewData: NewDmDuongSu = {
  idDuongSu: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
