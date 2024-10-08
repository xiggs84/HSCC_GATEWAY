import dayjs from 'dayjs/esm';

import { IDanhSachHopDong, NewDanhSachHopDong } from './danh-sach-hop-dong.model';

export const sampleWithRequiredData: IDanhSachHopDong = {
  idHopDong: '8614d52b-1fd1-40bb-95c3-616a522e1683',
};

export const sampleWithPartialData: IDanhSachHopDong = {
  idHopDong: 'b5c87db6-8512-4fc5-92fc-e51d966708f9',
  ngayLapHd: dayjs('2024-08-20'),
  nguoiLapHd: 28140,
  idDonVi: 19107,
  srcHopDong: 'scornful',
  congChungVien: 30646,
  hdThuCong: 13586,
  trangThaiRutTrich: 4576,
  strSearch: 'orderly abnormally smile',
  ngayThaoTacRutTrich: dayjs('2024-08-20'),
  thuLaoCongChung: 13416,
  soLaiSt: 'though indeed inasmuch',
  quyenLaiTl: 'per hen eve',
  soLaiTl: 'silly robust',
  srcKySoPdf: 'darling composed',
};

export const sampleWithFullData: IDanhSachHopDong = {
  idHopDong: '2b61f84d-9d7d-4556-b5e0-64f25a04d22d',
  ngayLapHd: dayjs('2024-08-19'),
  nguoiLapHd: 16641,
  trangThai: 24740,
  idDonVi: 23327,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 32371,
  srcHopDong: 'dose wrongly',
  congChungVien: 22211,
  soTienRutTrich: 22349,
  hdThuCong: 27521,
  trangThaiRutTrich: 14176,
  chuKyNgoaiTruSo: 15442,
  strSearch: 'who inwardly',
  ngayText: 'truthful',
  ngayRutTrichText: 'whether till eek',
  ngayThaoTacRutTrich: dayjs('2024-08-19'),
  thuLaoCongChung: 12430,
  quyenLaiSt: 'apropos glamorous the',
  soLaiSt: 'a towards instead',
  quyenLaiTl: 'sedately athwart',
  soLaiTl: 'quarrelsomely',
  srcKySoPdf: 'lucky',
  srcKySoPdfSigned: 'headrest husky',
};

export const sampleWithNewData: NewDanhSachHopDong = {
  idHopDong: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
