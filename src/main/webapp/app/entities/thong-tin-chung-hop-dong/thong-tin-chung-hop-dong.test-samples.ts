import dayjs from 'dayjs/esm';

import { IThongTinChungHopDong, NewThongTinChungHopDong } from './thong-tin-chung-hop-dong.model';

export const sampleWithRequiredData: IThongTinChungHopDong = {
  id: 27203,
};

export const sampleWithPartialData: IThongTinChungHopDong = {
  id: 24898,
  nguoiLapHd: 29850,
  thongTinVanBan: 'surrender obedience literature',
  trangThai: 14246,
  idLoaiHd: 11332,
  nguoiThaoTac: 10731,
  srcHopDong: 'howitzer consent',
  ngayHen: dayjs('2024-08-19'),
  soCongChung: 16425,
  soTienRutTrich: 12030,
  hdThuCong: 986,
  trangThaiRutTrich: 5813,
  chuKyNgoaiTruSo: 394,
  strSearch: 'unsteady server whether',
  idHdSdHb: 2992,
  srcDmMaster: 'oh',
  ngayText: 'timer loan',
};

export const sampleWithFullData: IThongTinChungHopDong = {
  id: 15457,
  idHopDong: 10276,
  ngayLapHd: dayjs('2024-08-19'),
  nguoiLapHd: 16767,
  thongTinVanBan: 'astride saffron',
  trangThai: 19932,
  idLoaiHd: 16787,
  dieuKhoanHd: 'daring likewise exhibit',
  idDonVi: 24156,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 1351,
  idHdGoc: 17503,
  maHopDong: 'intentional engrave scented',
  srcHopDong: 'by since battleship',
  ngayHen: dayjs('2024-08-20'),
  idSoCongChung: 25891,
  soCongChung: 11714,
  congChungVien: 5190,
  ngayKyHd: dayjs('2024-08-19'),
  nguoiRutTrich: 4962,
  soTienRutTrich: 28575,
  ngayRutTrich: dayjs('2024-08-19'),
  hdThuCong: 15938,
  trangThaiRutTrich: 2168,
  chuKyNgoaiTruSo: 11829,
  strSearch: 'greedy',
  idMaster: 28070,
  idHdSdHb: 496,
  srcDmMaster: 'for unknown an',
  repRefUnique: 23944,
  ngayText: 'opposite apud',
  thongTinChung: 'consort',
  thongTinChungClob: 'whisk meadow',
};

export const sampleWithNewData: NewThongTinChungHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
