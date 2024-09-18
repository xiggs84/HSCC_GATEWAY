import { ICauHinhThongTinDuongSu, NewCauHinhThongTinDuongSu } from './cau-hinh-thong-tin-duong-su.model';

export const sampleWithRequiredData: ICauHinhThongTinDuongSu = {
  idCauHinh: 711,
};

export const sampleWithPartialData: ICauHinhThongTinDuongSu = {
  idCauHinh: 15250,
  javascript: 'across mmm',
  idDonVi: 15395,
};

export const sampleWithFullData: ICauHinhThongTinDuongSu = {
  idCauHinh: 25125,
  noiDung: 'cereal',
  javascript: 'beyond along transport',
  css: 'however thoroughly',
  idLoaiDs: 4125,
  idDonVi: 7116,
  trangThai: 0,
};

export const sampleWithNewData: NewCauHinhThongTinDuongSu = {
  idCauHinh: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
