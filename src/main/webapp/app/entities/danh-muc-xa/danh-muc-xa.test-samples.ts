import { IDanhMucXa, NewDanhMucXa } from './danh-muc-xa.model';

export const sampleWithRequiredData: IDanhMucXa = {
  maXa: '2ddce082-628c-41e1-ab55-1863ee25ee32',
};

export const sampleWithPartialData: IDanhMucXa = {
  maXa: 'e5a7e285-302a-4838-8374-fa230eeaf24f',
  tenXa: 'exactly woot enthusiastically',
};

export const sampleWithFullData: IDanhMucXa = {
  maXa: 'ca4117d5-fbe4-41c3-b60e-91d44c881fce',
  tenXa: 'cleverly lovable whereas',
  maHuyen: 'a amid dim',
};

export const sampleWithNewData: NewDanhMucXa = {
  maXa: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
