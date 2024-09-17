import dayjs from 'dayjs/esm';

import { IDanhMucDonVi, NewDanhMucDonVi } from './danh-muc-don-vi.model';

export const sampleWithRequiredData: IDanhMucDonVi = {
  idDonVi: 25519,
};

export const sampleWithPartialData: IDanhMucDonVi = {
  idDonVi: 4511,
  tenDonVi: 'properly',
  ngayKhaiBao: dayjs('2024-08-20'),
  hoaDonDt: 18563,
  maDonViIgate: 'unnaturally',
  qrScan: 28263,
  verifyIdCard: 10685,
  isElastic: 22754,
  apikeyFace: 'why retort apud',
  verifyCodeCccd: 'adapter maelstrom',
  idNhiemVu: 'occasional lower',
  idCapQl: 'corn snuck',
};

export const sampleWithFullData: IDanhMucDonVi = {
  idDonVi: 21301,
  tenDonVi: 'start otter cashew',
  diaChi: 'per',
  nguoiDaiDien: 'next humongous',
  soDienThoai: 'cautiously',
  idDonViQl: 13630,
  ngayKhaiBao: dayjs('2024-08-20'),
  trangThai: 8716,
  soNha: 'pine',
  maSoThue: 'oof thump while',
  hoaDonDt: 21420,
  maDonViIgate: 'silently',
  maCoQuanIgate: 'personalise gripping',
  kySo: 19967,
  qrScan: 21913,
  verifyIdCard: 5506,
  isVerifyFace: 32595,
  isElastic: 27227,
  apikeyCccd: 'sarcastic rally running',
  apikeyFace: 'misspend mobility',
  verifyCodeCccd: 'atop',
  usernameElastic: 'interview piercing',
  passwordElastic: 'prestige broadly crossly',
  idNhiemVu: 'plaintiff dock',
  idLoaiDv: 'improvement',
  idCapQl: 'unto ew whereas',
};

export const sampleWithNewData: NewDanhMucDonVi = {
  idDonVi: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
