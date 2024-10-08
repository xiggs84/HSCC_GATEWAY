import dayjs from 'dayjs/esm';

import { IHopDongCongChung, NewHopDongCongChung } from './hop-dong-cong-chung.model';

export const sampleWithRequiredData: IHopDongCongChung = {
  idHopDong: '98eb0a48-b02b-40be-8ac1-7bdd7553135f',
};

export const sampleWithPartialData: IHopDongCongChung = {
  idHopDong: 'a85566a9-6e25-4165-b475-55f29e04b830',
  thongTinDuongSu: 'main ironclad bolt',
  thongTinTaiSan: 'times underneath breathe',
  thongTinVanBan: 'past aggression',
  trangThai: 21373,
  nguoiThaoTac: 32007,
  thongTinChuyenNhuong: 'storm sift mmm',
  ngayHen: dayjs('2024-08-20'),
  congChungVien: 16849,
  nguoiRutTrich: 30052,
  ngayRutTrich: dayjs('2024-08-19'),
  hdThuCong: 19226,
  trangThaiRutTrich: 11247,
  idMaster: 27681,
  ngayText: 'putrid',
  ngayThaoTacRutTrich: dayjs('2024-08-20'),
  soLaiSt: 'perfectly retail flickering',
  quyenLaiTl: 'interface during',
  soLaiTl: 'hike yahoo petrify',
  srcKySoPdf: 'occur',
};

export const sampleWithFullData: IHopDongCongChung = {
  idHopDong: 'c2a12906-f6fe-4fe1-9545-a6a0817f8b6a',
  ngayLapHd: dayjs('2024-08-19'),
  nguoiLapHd: 5627,
  thongTinDuongSu: 'instead spring ephemera',
  thongTinTaiSan: 'revascularisation port relationship',
  thongTinVanBan: 'architecture knight',
  trangThai: 27658,
  dieuKhoanHd: 'elm fully',
  idDonVi: 19810,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 31365,
  idHdGoc: 28200,
  thongTinChuyenNhuong: 'however',
  maHopDong: 'forenenst meanwhile research',
  srcHopDong: 'kosher the putt',
  ngayHen: dayjs('2024-08-19'),
  congChungVien: 21820,
  ngayKyHd: dayjs('2024-08-20'),
  nguoiRutTrich: 11959,
  soTienRutTrich: 19065,
  ngayRutTrich: dayjs('2024-08-19'),
  hdThuCong: 29218,
  trangThaiRutTrich: 1640,
  chuKyNgoaiTruSo: 4966,
  strSearch: 'abnormally passivise how',
  idMaster: 12482,
  idHdSdHb: 3363,
  srcDmMaster: 'complicated possible helplessly',
  repRefUnique: 7009,
  ngayText: 'for',
  ngayNum: 11657,
  ngayThaoTacRutTrich: dayjs('2024-08-20'),
  thuLaoCongChung: 12272,
  quyenLaiSt: 'angrily and',
  soLaiSt: 'ah reword until',
  quyenLaiTl: 'phew underneath',
  soLaiTl: 'foolishly angle evenly',
  srcKySoPdf: 'if calmly when',
  srcKySoPdfSigned: 'ill-fated',
  syncStatus: 17509,
  ngayRutTrichText: 'gee',
};

export const sampleWithNewData: NewHopDongCongChung = {
  idHopDong: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
