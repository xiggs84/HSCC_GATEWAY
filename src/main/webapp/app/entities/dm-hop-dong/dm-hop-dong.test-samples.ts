import dayjs from 'dayjs/esm';

import { IDmHopDong, NewDmHopDong } from './dm-hop-dong.model';

export const sampleWithRequiredData: IDmHopDong = {
  idHopDong: 'a56d5a11-bfe1-4f69-8033-80bb405f3265',
};

export const sampleWithPartialData: IDmHopDong = {
  idHopDong: '304f72c2-83c7-4a7d-b47b-8da37f41d8a9',
  thongTinVanBan: 'hm hence',
  trangThai: 15770,
  idDonVi: 9059,
  idHdGoc: 13218,
  maHopDong: 'likable underneath constant',
  srcHopDong: 'salad',
  ngayHen: dayjs('2024-08-20'),
  ngayKyHd: dayjs('2024-08-19'),
  hdThuCong: 7146,
  chuKyNgoaiTruSo: 22283,
  idMaster: 9435,
  repRefUnique: 21486,
};

export const sampleWithFullData: IDmHopDong = {
  idHopDong: '446470e7-3dfb-40ac-b8d0-d2875e2d7739',
  ngayLapHd: dayjs('2024-08-20'),
  nguoiLapHd: 22892,
  thongTinDuongSu: 'piercing',
  thongTinTaiSan: 'never caption brr',
  thongTinVanBan: 'straight glittering',
  trangThai: 21976,
  dieuKhoanHd: 'favorite who mouse',
  idDonVi: 20569,
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 15519,
  idHdGoc: 32135,
  thongTinChuyenNhuong: 'eek reluctantly',
  maHopDong: 'cannibalize grubby',
  srcHopDong: 'unfolded via emery',
  ngayHen: dayjs('2024-08-19'),
  congChungVien: 29640,
  ngayKyHd: dayjs('2024-08-19'),
  nguoiRutTrich: 19805,
  soTienRutTrich: 30594,
  ngayRutTrich: dayjs('2024-08-20'),
  hdThuCong: 29412,
  trangThaiRutTrich: 3885,
  chuKyNgoaiTruSo: 6459,
  strSearch: 'modulo active',
  idMaster: 4733,
  idHdSdHb: 10859,
  srcDmMaster: 'nor corporation',
  repRefUnique: 17456,
  ngayText: 'slope nautical overcooked',
  ngayNum: 27951,
  ngayThaoTacRutTrich: dayjs('2024-08-19'),
  thuLaoCongChung: 7855,
};

export const sampleWithNewData: NewDmHopDong = {
  idHopDong: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
