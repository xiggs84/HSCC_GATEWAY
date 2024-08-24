import { IDmTinhTmp, NewDmTinhTmp } from './dm-tinh-tmp.model';

export const sampleWithRequiredData: IDmTinhTmp = {
  id: 16017,
};

export const sampleWithPartialData: IDmTinhTmp = {
  id: 2888,
};

export const sampleWithFullData: IDmTinhTmp = {
  id: 6470,
  maTinh: 152,
  tenTinh: 'oof nearly',
};

export const sampleWithNewData: NewDmTinhTmp = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
