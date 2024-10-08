import { ICauHinhThongTinLoaiTaiSan, NewCauHinhThongTinLoaiTaiSan } from './cau-hinh-thong-tin-loai-tai-san.model';

export const sampleWithRequiredData: ICauHinhThongTinLoaiTaiSan = {
  id: 20598,
};

export const sampleWithPartialData: ICauHinhThongTinLoaiTaiSan = {
  id: 28232,
  noiDung: 'only',
  idLoaiTs: 312,
  idDonVi: 3522,
  trangThai: 25616,
  xml: 'rush',
};

export const sampleWithFullData: ICauHinhThongTinLoaiTaiSan = {
  id: 5101,
  idCauHinh: 24101,
  noiDung: 'discount',
  javascript: 'display',
  css: 'oddly',
  idLoaiTs: 30647,
  idDonVi: 5035,
  trangThai: 29535,
  xml: 'whispered whenever',
};

export const sampleWithNewData: NewCauHinhThongTinLoaiTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
