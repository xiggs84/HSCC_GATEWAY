import { IDanhMucTinh, NewDanhMucTinh } from './danh-muc-tinh.model';

export const sampleWithRequiredData: IDanhMucTinh = {
  id: 31455,
};

export const sampleWithPartialData: IDanhMucTinh = {
  id: 8463,
  maTinh: 8630,
};

export const sampleWithFullData: IDanhMucTinh = {
  id: 3380,
  maTinh: 19404,
  tenTinh: 'bowl atrophy',
  trangThai: 22600,
};

export const sampleWithNewData: NewDanhMucTinh = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
