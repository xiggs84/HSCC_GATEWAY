import dayjs from 'dayjs/esm';

import { IDuongSu, NewDuongSu } from './duong-su.model';

export const sampleWithRequiredData: IDuongSu = {
  idDuongSu: 5566,
};

export const sampleWithPartialData: IDuongSu = {
  idDuongSu: 28156,
  diaChi: 'besides unethically permit',
  email: 'LuongQuyen_7ko88@gmail.com',
  fax: 'steel',
  trangThai: 1,
  thongTinDs: '../fake-data/blob/hipster.txt',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 31177,
  idMaster: 'abdomen',
  idDonVi: 6933,
  strSearch: 'finally gently',
  soGiayTo: 'definitive colour',
  ghiChu: 'grizzled uproot deeply',
  idLoaiNganChan: 8985,
  syncStatus: 0,
};

export const sampleWithFullData: IDuongSu = {
  idDuongSu: 21952,
  tenDuongSu: 'boiling',
  diaChi: 'yum tragic',
  soDienThoai: 'well if knottily',
  email: 'ThuyDuong65@hotmail.com',
  fax: 'next functional officially',
  website: 'uh-huh',
  trangThai: 1,
  thongTinDs: '../fake-data/blob/hipster.txt',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 24332,
  idDsGoc: 31136,
  idMaster: 'among along diligently',
  idDonVi: 28832,
  strSearch: 'rightfully',
  soGiayTo: 'whose',
  ghiChu: 'whose enrapture',
  idLoaiNganChan: 6153,
  syncStatus: 0,
};

export const sampleWithNewData: NewDuongSu = {
  idDuongSu: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
