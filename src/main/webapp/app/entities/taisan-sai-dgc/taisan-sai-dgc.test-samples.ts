import { ITaisanSaiDgc, NewTaisanSaiDgc } from './taisan-sai-dgc.model';

export const sampleWithRequiredData: ITaisanSaiDgc = {
  id: 4348,
};

export const sampleWithPartialData: ITaisanSaiDgc = {
  id: 17284,
  idMaster: 2269,
  thongTinTsDung: 'up during in',
};

export const sampleWithFullData: ITaisanSaiDgc = {
  id: 25165,
  idMaster: 16743,
  thongTinTs: 'slick lest',
  thongTinTsDung: 'simvastatin',
};

export const sampleWithNewData: NewTaisanSaiDgc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
