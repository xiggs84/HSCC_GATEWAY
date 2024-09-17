import { IDanhMucHuyen, NewDanhMucHuyen } from './danh-muc-huyen.model';

export const sampleWithRequiredData: IDanhMucHuyen = {
  maHuyen: '5817b4dc-7512-4138-9941-426894772238',
};

export const sampleWithPartialData: IDanhMucHuyen = {
  maHuyen: '5a62b391-c242-4da2-bc59-72021142e712',
  tenHuyen: 'anxiously great',
  maTinh: 'gee',
};

export const sampleWithFullData: IDanhMucHuyen = {
  maHuyen: '12114b64-82e4-48d6-8340-2a0b9095eea1',
  tenHuyen: 'tinted wowee journalism',
  maTinh: 'excepting planet curve',
};

export const sampleWithNewData: NewDanhMucHuyen = {
  maHuyen: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
