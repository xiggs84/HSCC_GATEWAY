import { IDanhMucLoaiDuongSu, NewDanhMucLoaiDuongSu } from './danh-muc-loai-duong-su.model';

export const sampleWithRequiredData: IDanhMucLoaiDuongSu = {
  id: 31954,
};

export const sampleWithPartialData: IDanhMucLoaiDuongSu = {
  id: 9331,
  trangThai: 32193,
  strSearch: 'oh fascinate oof',
};

export const sampleWithFullData: IDanhMucLoaiDuongSu = {
  id: 8461,
  idLoaiDs: 29709,
  dienGiai: 'however yet',
  trangThai: 7737,
  strSearch: 'vivaciously sociable validity',
};

export const sampleWithNewData: NewDanhMucLoaiDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
