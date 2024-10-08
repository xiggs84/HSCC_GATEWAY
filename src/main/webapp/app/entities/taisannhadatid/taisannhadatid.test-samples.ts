import { ITaisannhadatid, NewTaisannhadatid } from './taisannhadatid.model';

export const sampleWithRequiredData: ITaisannhadatid = {
  idTaiSan: 26040,
};

export const sampleWithPartialData: ITaisannhadatid = {
  idTaiSan: 1901,
};

export const sampleWithFullData: ITaisannhadatid = {
  idTaiSan: 28043,
  thongTinTs: 'trade ancient eek',
};

export const sampleWithNewData: NewTaisannhadatid = {
  idTaiSan: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
