import { ITaisanSaiQsddDgc, NewTaisanSaiQsddDgc } from './taisan-sai-qsdd-dgc.model';

export const sampleWithRequiredData: ITaisanSaiQsddDgc = {
  id: 6150,
};

export const sampleWithPartialData: ITaisanSaiQsddDgc = {
  id: 25603,
  idMaster: 3281,
  noiCapQsdd: 'besides um yearningly',
};

export const sampleWithFullData: ITaisanSaiQsddDgc = {
  id: 31444,
  idMaster: 23713,
  noiCapQsdd: 'wholly',
};

export const sampleWithNewData: NewTaisanSaiQsddDgc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
