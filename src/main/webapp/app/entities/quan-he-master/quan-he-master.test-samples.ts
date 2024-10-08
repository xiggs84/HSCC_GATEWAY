import { IQuanHeMaster, NewQuanHeMaster } from './quan-he-master.model';

export const sampleWithRequiredData: IQuanHeMaster = {
  id: 21691,
};

export const sampleWithPartialData: IQuanHeMaster = {
  id: 4557,
  idDuongSu: 10305,
};

export const sampleWithFullData: IQuanHeMaster = {
  id: 23742,
  idDuongSu: 32542,
  idDuongSuQh: 26873,
};

export const sampleWithNewData: NewQuanHeMaster = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
