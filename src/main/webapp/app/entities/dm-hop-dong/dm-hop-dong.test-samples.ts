import dayjs from 'dayjs/esm';

import { IDmHopDong, NewDmHopDong } from './dm-hop-dong.model';

export const sampleWithRequiredData: IDmHopDong = {
  id: 12079,
};

export const sampleWithPartialData: IDmHopDong = {
  id: 11594,
  thongTinVanBan: 'force an er',
  idDonVi: 10483,
  idSoCongChung: 13842,
  soCongChung: 'since individuate stealthily',
  congChungVien: 32128,
  ngayKyHd: dayjs('2024-08-19'),
  ngayRutTrich: dayjs('2024-08-20'),
  hdThuCong: 19137,
  trangThaiRutTrich: 30499,
  chuKyNgoaiTruSo: 7399,
  strSearch: 'whoa salesman patent',
  idHdSdHb: 18504,
  thuLaoCongChung: 30883,
};

export const sampleWithFullData: IDmHopDong = {
  id: 29851,
  idHopDong: 7936,
  ngayLapHd: dayjs('2024-08-19'),
  nguoiLapHd: 26954,
  thongTinDuongSu: 'offensively really',
  thongTinTaiSan: 'joey',
  thongTinVanBan: 'potentially thankfully lest',
  trangThai: 7722,
  idLoaiHd: 10967,
  dieuKhoanHd: 'which deadly standard',
  idDonVi: 12712,
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 15616,
  idHdGoc: 9941,
  thongTinChuyenNhuong: 'meow disgusting',
  maHopDong: 'bud monthly',
  srcHopDong: 'modulo awake',
  ngayHen: dayjs('2024-08-19'),
  idSoCongChung: 22314,
  soCongChung: 'dill seriously',
  congChungVien: 2943,
  ngayKyHd: dayjs('2024-08-20'),
  nguoiRutTrich: 18314,
  soTienRutTrich: 16822,
  ngayRutTrich: dayjs('2024-08-19'),
  hdThuCong: 8520,
  trangThaiRutTrich: 17697,
  chuKyNgoaiTruSo: 23951,
  strSearch: 'ha hence',
  idMaster: 8889,
  idHdSdHb: 32726,
  srcDmMaster: 'throughout gracefully whoever',
  repRefUnique: 23165,
  ngayText: 'majestic ha',
  ngayNum: 6279,
  ngayThaoTacRutTrich: dayjs('2024-08-20'),
  thuLaoCongChung: 17050,
};

export const sampleWithNewData: NewDmHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
