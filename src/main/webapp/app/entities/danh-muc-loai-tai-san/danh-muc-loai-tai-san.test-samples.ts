import { IDanhMucLoaiTaiSan, NewDanhMucLoaiTaiSan } from './danh-muc-loai-tai-san.model';

export const sampleWithRequiredData: IDanhMucLoaiTaiSan = {
  id: 16057,
};

export const sampleWithPartialData: IDanhMucLoaiTaiSan = {
  id: 3353,
  trangThai: 7109,
  searchStr: 'equally where',
};

export const sampleWithFullData: IDanhMucLoaiTaiSan = {
  id: 14924,
  idLoaiTs: 10369,
  dienGiai: 'ew absent geez',
  trangThai: 6119,
  searchStr: 'and',
};

export const sampleWithNewData: NewDanhMucLoaiTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
