import dayjs from 'dayjs/esm';

import { IDanhMucLoaiHopDong, NewDanhMucLoaiHopDong } from './danh-muc-loai-hop-dong.model';

export const sampleWithRequiredData: IDanhMucLoaiHopDong = {
  id: 11945,
};

export const sampleWithPartialData: IDanhMucLoaiHopDong = {
  id: 13091,
  dienGiai: 'sow',
  fileHopDong: 'since boohoo',
  srcHopDong: 'optimistically',
  idDonVi: 16573,
  nguoiThaoTac: 30078,
  srcLoiChung: 'alarmed',
  idNhom: 27873,
  fileLoiChung: 'mad lumbering',
  loaiHuyBo: 24132,
  trangThaiDuyet: 25190,
  idPhanLoaiHopDong: 9737,
  dgTen: 'defenseless per eligibility',
  nhomTen: 3412,
  idVaiTro3: 31072,
};

export const sampleWithFullData: IDanhMucLoaiHopDong = {
  id: 16511,
  idLoaiHd: 18463,
  dienGiai: 'phew',
  idVaiTro1: 24495,
  idVaiTro2: 6379,
  fileHopDong: 'past',
  srcHopDong: 'inasmuch plunder complicate',
  dieuKhoan: 'promptly firebomb suspiciously',
  idDonVi: 18618,
  trangThai: 31522,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 32022,
  srcLoiChung: 'tasty',
  idNhom: 4669,
  fileLoiChung: 'ah',
  chuyenTaiSan: 29239,
  loaiSuaDoi: 19636,
  loaiHuyBo: 28251,
  trangThaiDuyet: 20572,
  idPhanLoaiHopDong: 17844,
  srcCv: 'hypothesis even unbalance',
  srcTb: 'if beneath lanky',
  srcTtpc: 'pace lovingly only',
  dgTen: 'uh-huh eulogise crate',
  nhomTen: 8986,
  idVaiTro3: 3864,
};

export const sampleWithNewData: NewDanhMucLoaiHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
