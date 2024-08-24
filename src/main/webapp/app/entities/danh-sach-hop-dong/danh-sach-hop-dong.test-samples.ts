import dayjs from 'dayjs/esm';

import { IDanhSachHopDong, NewDanhSachHopDong } from './danh-sach-hop-dong.model';

export const sampleWithRequiredData: IDanhSachHopDong = {
  id: 17849,
};

export const sampleWithPartialData: IDanhSachHopDong = {
  id: 19510,
  idHopDong: 5697,
  ngayLapHd: dayjs('2024-08-20'),
  nguoiLapHd: 16287,
  trangThai: 1720,
  idDonVi: 6603,
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 9232,
  idSoCongChung: 7676,
  ngayText: 'dapper ack before',
  ngayThaoTacRutTrich: dayjs('2024-08-20'),
  quyenLaiTl: 'hmph',
};

export const sampleWithFullData: IDanhSachHopDong = {
  id: 6888,
  idHopDong: 28516,
  ngayLapHd: dayjs('2024-08-19'),
  nguoiLapHd: 29546,
  trangThai: 23103,
  idLoaiHd: 17942,
  idDonVi: 30361,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 20789,
  srcHopDong: 'ship delirious creative',
  idSoCongChung: 17506,
  soCongChung: 'briskly fumbling syrup',
  congChungVien: 22547,
  soTienRutTrich: 1935,
  hdThuCong: 14716,
  trangThaiRutTrich: 9939,
  chuKyNgoaiTruSo: 27309,
  strSearch: 'hence excepting turbocharge',
  ngayText: 'consequently triangular entrap',
  ngayRutTrichText: 'impeccable meh at',
  ngayThaoTacRutTrich: dayjs('2024-08-20'),
  thuLaoCongChung: 15737,
  quyenLaiSt: 'fluffy crew',
  soLaiSt: 'patronise',
  quyenLaiTl: 'ack',
  soLaiTl: 'since seldom meanwhile',
  srcKySoPdf: 'psst',
  srcKySoPdfSigned: 'pit',
};

export const sampleWithNewData: NewDanhSachHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
