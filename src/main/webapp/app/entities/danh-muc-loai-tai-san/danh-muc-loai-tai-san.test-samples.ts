import { IDanhMucLoaiTaiSan, NewDanhMucLoaiTaiSan } from './danh-muc-loai-tai-san.model';

export const sampleWithRequiredData: IDanhMucLoaiTaiSan = {
  idLoaiTs: 14169,
};

export const sampleWithPartialData: IDanhMucLoaiTaiSan = {
  idLoaiTs: 11628,
  dienGiai: 'cofactor badly psst',
  trangThai: 9177,
};

export const sampleWithFullData: IDanhMucLoaiTaiSan = {
  idLoaiTs: 19447,
  dienGiai: 'incidentally incidentally',
  trangThai: 9636,
};

export const sampleWithNewData: NewDanhMucLoaiTaiSan = {
  idLoaiTs: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
