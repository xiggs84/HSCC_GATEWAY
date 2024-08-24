import dayjs from 'dayjs/esm';

import { IDmLoaiHd, NewDmLoaiHd } from './dm-loai-hd.model';

export const sampleWithRequiredData: IDmLoaiHd = {
  id: 3229,
};

export const sampleWithPartialData: IDmLoaiHd = {
  id: 22500,
  idLoaiHd: 28867,
  idVaiTro1: 29124,
  srcHopDong: 'plus',
  idDonVi: 5221,
  trangThai: 21871,
  nguoiThaoTac: 2644,
  srcLoiChung: 'offensively',
  loaiSuaDoi: 17829,
  loaiHuyBo: 22763,
  trangThaiDuyet: 6248,
  srcCv: 'furnace cast ha',
  dgTen: 'supposing other inasmuch',
};

export const sampleWithFullData: IDmLoaiHd = {
  id: 6981,
  idLoaiHd: 562,
  dienGiai: 'prettify menu',
  idVaiTro1: 10813,
  idVaiTro2: 32020,
  fileHopDong: 'um prudent',
  srcHopDong: 'except',
  dieuKhoan: 'indolent',
  idDonVi: 12566,
  trangThai: 14425,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 2347,
  srcLoiChung: 'torment horrible',
  idNhom: 441,
  fileLoiChung: 'into frankly ack',
  chuyenTaiSan: 25997,
  loaiSuaDoi: 16796,
  loaiHuyBo: 26452,
  trangThaiDuyet: 30800,
  idPhanLoaiHopDong: 8838,
  srcCv: 'leash another',
  srcTb: 'blindly',
  srcTtpc: 'swanling',
  dgTen: 'ah',
  nhomTen: 12784,
  idVaiTro3: 13288,
};

export const sampleWithNewData: NewDmLoaiHd = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
