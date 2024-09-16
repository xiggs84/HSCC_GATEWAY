import { ICauHinhThongTinLoaiTaiSan, NewCauHinhThongTinLoaiTaiSan } from './cau-hinh-thong-tin-loai-tai-san.model';

export const sampleWithRequiredData: ICauHinhThongTinLoaiTaiSan = {
  id: 16391,
};

export const sampleWithPartialData: ICauHinhThongTinLoaiTaiSan = {
  id: 28624,
  javascript: 'now hornet fully',
  css: 'but',
  idLoaiTs: 20603,
  idDonVi: 1278,
  trangThai: 32405,
  xml: 'that group',
};

export const sampleWithFullData: ICauHinhThongTinLoaiTaiSan = {
  id: 22533,
  idCauHinh: 1714,
  noiDung: 'around boo solemnly',
  javascript: 'degrease because dental',
  css: 'dimly',
  idLoaiTs: 454,
  idDonVi: 26938,
  trangThai: 1162,
  xml: 'constant clear string',
};

export const sampleWithNewData: NewCauHinhThongTinLoaiTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
