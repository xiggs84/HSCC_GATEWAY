import dayjs from 'dayjs/esm';

import { IHopDongCongChung, NewHopDongCongChung } from './hop-dong-cong-chung.model';

export const sampleWithRequiredData: IHopDongCongChung = {
  id: 16662,
};

export const sampleWithPartialData: IHopDongCongChung = {
  id: 9302,
  ngayLapHd: dayjs('2024-08-19'),
  thongTinTaiSan: 'forbear joyously',
  thongTinVanBan: 'humble or duffel',
  ngayThaoTac: dayjs('2024-08-19'),
  idHdGoc: 15095,
  thongTinChuyenNhuong: 'pfft blade ha',
  maHopDong: 'past aboard',
  srcHopDong: 'narrow flick',
  ngayHen: dayjs('2024-08-19'),
  soCongChung: 'criteria',
  congChungVien: 30510,
  nguoiRutTrich: 28425,
  soTienRutTrich: 7751,
  ngayRutTrich: dayjs('2024-08-20'),
  chuKyNgoaiTruSo: 17173,
  idHdSdHb: 20907,
  repRefUnique: 25178,
  ngayText: 'why unless trample',
  ngayNum: 30834,
  thuLaoCongChung: 25873,
  soLaiSt: 'fortunate uh-huh if',
  srcKySoPdf: 'limping',
  syncStatus: 19308,
};

export const sampleWithFullData: IHopDongCongChung = {
  id: 10542,
  idHopDong: 7832,
  ngayLapHd: dayjs('2024-08-20'),
  nguoiLapHd: 31851,
  thongTinDuongSu: 'rundown schnitzel gleefully',
  thongTinTaiSan: 'save ha',
  thongTinVanBan: 'how purvey half',
  trangThai: 5430,
  idLoaiHd: 12091,
  dieuKhoanHd: 'an',
  idDonVi: 29778,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 5184,
  idHdGoc: 1456,
  thongTinChuyenNhuong: 'but',
  maHopDong: 'apropos careful',
  srcHopDong: 'worth',
  ngayHen: dayjs('2024-08-19'),
  idSoCongChung: 13048,
  soCongChung: 'once',
  congChungVien: 6543,
  ngayKyHd: dayjs('2024-08-19'),
  nguoiRutTrich: 31094,
  soTienRutTrich: 30192,
  ngayRutTrich: dayjs('2024-08-19'),
  hdThuCong: 26097,
  trangThaiRutTrich: 20485,
  chuKyNgoaiTruSo: 4051,
  strSearch: 'oddly than announcement',
  idMaster: 27103,
  idHdSdHb: 8402,
  srcDmMaster: 'too eaves',
  repRefUnique: 10677,
  ngayText: 'though because',
  ngayNum: 14889,
  ngayThaoTacRutTrich: dayjs('2024-08-20'),
  thuLaoCongChung: 7868,
  quyenLaiSt: 'disgust foolishly',
  soLaiSt: 'reorganization',
  quyenLaiTl: 'superficial rave seed',
  soLaiTl: 'mmm gosh',
  srcKySoPdf: 'when',
  srcKySoPdfSigned: 'outside when',
  syncStatus: 29394,
  ngayRutTrichText: 'lasagna aha gosh',
};

export const sampleWithNewData: NewHopDongCongChung = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
