import dayjs from 'dayjs/esm';

import { IDanhMucDonVi, NewDanhMucDonVi } from './danh-muc-don-vi.model';

export const sampleWithRequiredData: IDanhMucDonVi = {
  id: 5676,
};

export const sampleWithPartialData: IDanhMucDonVi = {
  id: 6673,
  idDonVi: 30591,
  nguoiDaiDien: 'remarkable',
  soDienThoai: 'disconnect jack',
  idDonViQl: 26879,
  loaiDonVi: 22971,
  trangThai: 2871,
  idPhuongXa: 501,
  soNha: 'minion stipple the',
  maSoThue: 'phew',
  idCapQl: 27298,
  maDonViIgate: 'before',
  qrScan: 27648,
  verifyIdCard: 5262,
  isElastic: 4001,
  apikeyCccd: 'fragment photosynthesize leading',
  apikeyFace: 'blah',
  verifyCodeCccd: 'likewise',
  usernameElastic: 'gadzooks decade',
};

export const sampleWithFullData: IDanhMucDonVi = {
  id: 28993,
  idDonVi: 2861,
  tenDonVi: 'and',
  diaChi: 'but belated strive',
  nguoiDaiDien: 'unimportant',
  soDienThoai: 'fast than',
  idDonViQl: 24535,
  loaiDonVi: 14531,
  ngayKhaiBao: dayjs('2024-08-19'),
  trangThai: 24397,
  idTinh: 31699,
  idHuyen: 32370,
  idPhuongXa: 6073,
  soNha: 'patiently by indolent',
  maSoThue: 'towards',
  idCapQl: 11699,
  loaiNhiemVu: 10595,
  hoaDonDt: 32351,
  maDonViIgate: 'sprinkle',
  maCoQuanIgate: 'patiently slim',
  capDonVi: 13213,
  kySo: 16606,
  qrScan: 985,
  verifyIdCard: 15064,
  isVerifyFace: 11419,
  isElastic: 7838,
  apikeyCccd: 'personality',
  apikeyFace: 'decimal powerful',
  verifyCodeCccd: 'whose patiently',
  usernameElastic: 'abaft',
  passwordElastic: 'compress',
};

export const sampleWithNewData: NewDanhMucDonVi = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
