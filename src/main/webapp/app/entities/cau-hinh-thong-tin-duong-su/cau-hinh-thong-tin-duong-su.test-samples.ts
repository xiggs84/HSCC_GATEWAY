import { ICauHinhThongTinDuongSu, NewCauHinhThongTinDuongSu } from './cau-hinh-thong-tin-duong-su.model';

export const sampleWithRequiredData: ICauHinhThongTinDuongSu = {
  idCauHinh: 3935,
};

export const sampleWithPartialData: ICauHinhThongTinDuongSu = {
  idCauHinh: 11902,
  javascript: 'silently till',
  idLoaiDs: 21646,
  idDonVi: 9847,
};

export const sampleWithFullData: ICauHinhThongTinDuongSu = {
  idCauHinh: 15329,
  noiDung: 'towards',
  javascript: 'forthright',
  css: 'readmit',
  idLoaiDs: 12451,
  idDonVi: 5692,
  trangThai: 0,
};

export const sampleWithNewData: NewCauHinhThongTinDuongSu = {
  idCauHinh: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
