import { ITaisanSaiQsddDgc, NewTaisanSaiQsddDgc } from './taisan-sai-qsdd-dgc.model';

export const sampleWithRequiredData: ITaisanSaiQsddDgc = {
  id: 7255,
};

export const sampleWithPartialData: ITaisanSaiQsddDgc = {
  id: 29511,
};

export const sampleWithFullData: ITaisanSaiQsddDgc = {
  id: 30986,
  idMaster: 28415,
  noiCapQsdd: 'yippee progress',
};

export const sampleWithNewData: NewTaisanSaiQsddDgc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
