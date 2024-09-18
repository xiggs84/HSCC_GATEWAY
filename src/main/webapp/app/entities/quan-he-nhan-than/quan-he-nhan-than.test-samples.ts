import { IQuanHeNhanThan, NewQuanHeNhanThan } from './quan-he-nhan-than.model';

export const sampleWithRequiredData: IQuanHeNhanThan = {
  idQuanHe: 16488,
};

export const sampleWithPartialData: IQuanHeNhanThan = {
  idQuanHe: 18492,
  idQuanHeDoiUng: 30661,
};

export const sampleWithFullData: IQuanHeNhanThan = {
  idQuanHe: 22763,
  dienGiai: 'er bah',
  idQuanHeDoiUng: 19650,
};

export const sampleWithNewData: NewQuanHeNhanThan = {
  idQuanHe: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
