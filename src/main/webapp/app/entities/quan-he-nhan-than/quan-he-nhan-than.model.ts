export interface IQuanHeNhanThan {
  idQuanHe: number;
  dienGiai?: string | null;
  idQuanHeDoiUng?: number | null;
}

export type NewQuanHeNhanThan = Omit<IQuanHeNhanThan, 'idQuanHe'> & { idQuanHe: null };
