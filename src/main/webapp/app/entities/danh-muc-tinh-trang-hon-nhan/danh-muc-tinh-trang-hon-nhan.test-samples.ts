import { IDanhMucTinhTrangHonNhan, NewDanhMucTinhTrangHonNhan } from './danh-muc-tinh-trang-hon-nhan.model';

export const sampleWithRequiredData: IDanhMucTinhTrangHonNhan = {
  id: 26691,
};

export const sampleWithPartialData: IDanhMucTinhTrangHonNhan = {
  id: 24671,
  dienGiai: 'phew',
  trangThai: 9565,
};

export const sampleWithFullData: IDanhMucTinhTrangHonNhan = {
  id: 1287,
  idTinhTrang: 6250,
  dienGiai: 'aboard gallivant',
  trangThai: 9879,
};

export const sampleWithNewData: NewDanhMucTinhTrangHonNhan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
