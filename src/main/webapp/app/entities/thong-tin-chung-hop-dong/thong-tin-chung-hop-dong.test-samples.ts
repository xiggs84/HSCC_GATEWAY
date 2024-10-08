import dayjs from 'dayjs/esm';

import { IThongTinChungHopDong, NewThongTinChungHopDong } from './thong-tin-chung-hop-dong.model';

export const sampleWithRequiredData: IThongTinChungHopDong = {
  id: 1641,
};

export const sampleWithPartialData: IThongTinChungHopDong = {
  id: 803,
  ngayLapHd: dayjs('2024-08-19'),
  idDonVi: 25574,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 22852,
  idHdGoc: 32063,
  srcHopDong: 'brushfire guffaw redevelop',
  nguoiRutTrich: 9254,
  soTienRutTrich: 16115,
  ngayRutTrich: dayjs('2024-08-20'),
  trangThaiRutTrich: 30867,
  chuKyNgoaiTruSo: 8677,
  strSearch: 'winding murky',
  idMaster: 13154,
  thongTinChung: 'save lanai',
};

export const sampleWithFullData: IThongTinChungHopDong = {
  id: 9240,
  idHopDong: 'loose pastel pure',
  ngayLapHd: dayjs('2024-08-20'),
  nguoiLapHd: 19810,
  thongTinVanBan: 'costume through boo',
  trangThai: 431,
  dieuKhoanHd: 'rhinoceros sterilize shovel',
  idDonVi: 988,
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 12145,
  idHdGoc: 28513,
  maHopDong: 'gadzooks save gee',
  srcHopDong: 'where successfully',
  ngayHen: dayjs('2024-08-19'),
  congChungVien: 1670,
  ngayKyHd: dayjs('2024-08-19'),
  nguoiRutTrich: 2620,
  soTienRutTrich: 6172,
  ngayRutTrich: dayjs('2024-08-20'),
  hdThuCong: 29911,
  trangThaiRutTrich: 25230,
  chuKyNgoaiTruSo: 26960,
  strSearch: 'or',
  idMaster: 11208,
  idHdSdHb: 10704,
  srcDmMaster: 'so',
  repRefUnique: 878,
  ngayText: 'conditioner without remorseful',
  thongTinChung: 'phew',
  thongTinChungClob: 'interest proctor plait',
};

export const sampleWithNewData: NewThongTinChungHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
