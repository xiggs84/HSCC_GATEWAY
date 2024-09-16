import { ITaisanSaiDgc, NewTaisanSaiDgc } from './taisan-sai-dgc.model';

export const sampleWithRequiredData: ITaisanSaiDgc = {
  id: 16238,
};

export const sampleWithPartialData: ITaisanSaiDgc = {
  id: 30874,
};

export const sampleWithFullData: ITaisanSaiDgc = {
  id: 31233,
  idMaster: 18136,
  thongTinTs: 'llama gosh',
  thongTinTsDung: 'phooey',
};

export const sampleWithNewData: NewTaisanSaiDgc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
