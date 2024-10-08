import { IQuanHeNhanThan, NewQuanHeNhanThan } from './quan-he-nhan-than.model';

export const sampleWithRequiredData: IQuanHeNhanThan = {
  idQuanHe: 28463,
};

export const sampleWithPartialData: IQuanHeNhanThan = {
  idQuanHe: 14601,
};

export const sampleWithFullData: IQuanHeNhanThan = {
  idQuanHe: 27024,
  dienGiai: 'incinerate or',
  idQuanHeDoiUng: 19330,
};

export const sampleWithNewData: NewQuanHeNhanThan = {
  idQuanHe: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
