import { IDmHuyenTmp, NewDmHuyenTmp } from './dm-huyen-tmp.model';

export const sampleWithRequiredData: IDmHuyenTmp = {
  id: 4852,
};

export const sampleWithPartialData: IDmHuyenTmp = {
  id: 12910,
  tenHuyen: 'affectionate shameful',
};

export const sampleWithFullData: IDmHuyenTmp = {
  id: 1306,
  maHuyen: 9898,
  tenHuyen: 'following near whoever',
  maTinh: 23270,
};

export const sampleWithNewData: NewDmHuyenTmp = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
