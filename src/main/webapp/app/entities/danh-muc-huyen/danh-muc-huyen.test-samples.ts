import { IDanhMucHuyen, NewDanhMucHuyen } from './danh-muc-huyen.model';

export const sampleWithRequiredData: IDanhMucHuyen = {
  id: 32626,
};

export const sampleWithPartialData: IDanhMucHuyen = {
  id: 8130,
  maHuyen: 4389,
};

export const sampleWithFullData: IDanhMucHuyen = {
  id: 12530,
  maHuyen: 26495,
  tenHuyen: 'always attached mystify',
  maTinh: 27713,
  trangThai: 31670,
};

export const sampleWithNewData: NewDanhMucHuyen = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
