import { IDmXaTmp, NewDmXaTmp } from './dm-xa-tmp.model';

export const sampleWithRequiredData: IDmXaTmp = {
  id: 6679,
};

export const sampleWithPartialData: IDmXaTmp = {
  id: 17849,
  tenXa: 'scarce',
};

export const sampleWithFullData: IDmXaTmp = {
  id: 25762,
  maXa: 14653,
  tenXa: 'furthermore why',
  maHuyen: 32595,
};

export const sampleWithNewData: NewDmXaTmp = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
