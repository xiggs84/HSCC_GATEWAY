import { IQuanHeMaster, NewQuanHeMaster } from './quan-he-master.model';

export const sampleWithRequiredData: IQuanHeMaster = {
  id: 29330,
};

export const sampleWithPartialData: IQuanHeMaster = {
  id: 7424,
  idDuongSu: 12293,
  idDuongSuQh: 2634,
};

export const sampleWithFullData: IQuanHeMaster = {
  id: 15117,
  idDuongSu: 17981,
  idDuongSuQh: 27184,
};

export const sampleWithNewData: NewQuanHeMaster = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
