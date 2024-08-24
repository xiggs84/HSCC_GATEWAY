import { ICanBoQuyen, NewCanBoQuyen } from './can-bo-quyen.model';

export const sampleWithRequiredData: ICanBoQuyen = {
  id: 23949,
};

export const sampleWithPartialData: ICanBoQuyen = {
  id: 10534,
  idQuyen: 5131,
};

export const sampleWithFullData: ICanBoQuyen = {
  id: 423,
  idCanBo: 7294,
  idQuyen: 5410,
  idDonVi: 13715,
};

export const sampleWithNewData: NewCanBoQuyen = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
