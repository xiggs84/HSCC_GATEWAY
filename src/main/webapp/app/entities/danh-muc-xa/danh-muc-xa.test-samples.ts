import { IDanhMucXa, NewDanhMucXa } from './danh-muc-xa.model';

export const sampleWithRequiredData: IDanhMucXa = {
  id: 11607,
};

export const sampleWithPartialData: IDanhMucXa = {
  id: 28893,
  tenXa: 'field knowledgeably',
  maHuyen: 16235,
  trangThai: 22337,
};

export const sampleWithFullData: IDanhMucXa = {
  id: 12782,
  maXa: 28519,
  tenXa: 'concerning',
  maHuyen: 5005,
  trangThai: 29719,
};

export const sampleWithNewData: NewDanhMucXa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
