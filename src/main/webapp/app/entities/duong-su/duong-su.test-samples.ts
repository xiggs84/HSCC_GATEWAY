import dayjs from 'dayjs/esm';

import { IDuongSu, NewDuongSu } from './duong-su.model';

export const sampleWithRequiredData: IDuongSu = {
  idDuongSu: 27729,
};

export const sampleWithPartialData: IDuongSu = {
  idDuongSu: 17260,
  tenDuongSu: 'whenever now rubric',
  diaChi: 'victorious if',
  soDienThoai: 'juxtapose school',
  trangThai: 0,
  thongTinDs: '../fake-data/blob/hipster.txt',
  ngayThaoTac: dayjs('2024-08-19'),
  idDsGoc: 22976,
  idMaster: 'meh',
  idDonVi: 3045,
  soGiayTo: 'plain given',
  syncStatus: 0,
};

export const sampleWithFullData: IDuongSu = {
  idDuongSu: 516,
  tenDuongSu: 'thrifty',
  loaiDuongSu: 'ToChucTinDung',
  diaChi: 'rediscovery',
  soDienThoai: 'strictly',
  email: 'BaThien.Nguyen@yahoo.com',
  fax: 'explode lest powerfully',
  website: 'competent',
  trangThai: 1,
  thongTinDs: '../fake-data/blob/hipster.txt',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 10747,
  idDsGoc: 23286,
  idMaster: 'when',
  idDonVi: 7172,
  strSearch: 'revere',
  loaiGiayTo: 'Cccd',
  soGiayTo: 'coconut',
  ghiChu: 'gosh',
  idLoaiNganChan: 1718,
  syncStatus: 1,
};

export const sampleWithNewData: NewDuongSu = {
  idDuongSu: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
