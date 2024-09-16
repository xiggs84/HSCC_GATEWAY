import { IDanhMucLoaiTaiSan, NewDanhMucLoaiTaiSan } from './danh-muc-loai-tai-san.model';

export const sampleWithRequiredData: IDanhMucLoaiTaiSan = {
  idLoaiTs: 31252,
};

export const sampleWithPartialData: IDanhMucLoaiTaiSan = {
  idLoaiTs: 30082,
  trangThai: 13482,
};

export const sampleWithFullData: IDanhMucLoaiTaiSan = {
  idLoaiTs: 12739,
  dienGiai: 'evenly if',
  trangThai: 20543,
};

export const sampleWithNewData: NewDanhMucLoaiTaiSan = {
  idLoaiTs: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
