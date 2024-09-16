import dayjs from 'dayjs/esm';

import { IDanhMucDonVi, NewDanhMucDonVi } from './danh-muc-don-vi.model';

export const sampleWithRequiredData: IDanhMucDonVi = {
  idDonVi: 8787,
};

export const sampleWithPartialData: IDanhMucDonVi = {
  idDonVi: 16061,
  ngayKhaiBao: dayjs('2024-08-20'),
  hoaDonDt: 3444,
  loaiDonVi: 'SO_TU_PHAP',
  isElastic: 8094,
  verifyCodeCccd: 'monthly bumpy',
};

export const sampleWithFullData: IDanhMucDonVi = {
  idDonVi: 11128,
  tenDonVi: 'psst arm',
  diaChi: 'meh quaver',
  nguoiDaiDien: 'incidentally linear unlike',
  soDienThoai: 'to in',
  idDonViQl: 4551,
  ngayKhaiBao: dayjs('2024-08-20'),
  trangThai: 24240,
  soNha: 'curve but',
  maSoThue: 'often reassign optimistically',
  capQuanLy: 'CAP_PHONG',
  loaiNhiemVu: 'CHUNG_THUC',
  hoaDonDt: 3580,
  maDonViIgate: 'physically pfft instead',
  maCoQuanIgate: 'nor sans enchanting',
  loaiDonVi: 'SO_TU_PHAP',
  kySo: 5911,
  qrScan: 7492,
  verifyIdCard: 16789,
  isVerifyFace: 31727,
  isElastic: 22259,
  apikeyCccd: 'rigidly snail opposite',
  apikeyFace: 'monstrous appreciate excluding',
  verifyCodeCccd: 'anti forenenst midst',
  usernameElastic: 'monthly',
  passwordElastic: 'gosh before',
};

export const sampleWithNewData: NewDanhMucDonVi = {
  idDonVi: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
