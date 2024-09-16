import { ITaisannhadatid, NewTaisannhadatid } from './taisannhadatid.model';

export const sampleWithRequiredData: ITaisannhadatid = {
  idTaiSan: 1693,
};

export const sampleWithPartialData: ITaisannhadatid = {
  idTaiSan: 18517,
  thongTinTs: 'quicker fog',
};

export const sampleWithFullData: ITaisannhadatid = {
  idTaiSan: 15261,
  thongTinTs: 'winnow caress',
};

export const sampleWithNewData: NewTaisannhadatid = {
  idTaiSan: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
