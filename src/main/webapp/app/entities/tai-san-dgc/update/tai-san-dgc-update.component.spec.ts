import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { TaiSanService } from 'app/entities/tai-san/service/tai-san.service';
import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { ITinhTrangTaiSan } from 'app/entities/tinh-trang-tai-san/tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from 'app/entities/tinh-trang-tai-san/service/tinh-trang-tai-san.service';
import { ITaiSanDgc } from '../tai-san-dgc.model';
import { TaiSanDgcService } from '../service/tai-san-dgc.service';
import { TaiSanDgcFormService } from './tai-san-dgc-form.service';

import { TaiSanDgcUpdateComponent } from './tai-san-dgc-update.component';

describe('TaiSanDgc Management Update Component', () => {
  let comp: TaiSanDgcUpdateComponent;
  let fixture: ComponentFixture<TaiSanDgcUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taiSanDgcFormService: TaiSanDgcFormService;
  let taiSanDgcService: TaiSanDgcService;
  let taiSanService: TaiSanService;
  let danhMucLoaiTaiSanService: DanhMucLoaiTaiSanService;
  let tinhTrangTaiSanService: TinhTrangTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanDgcUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TaiSanDgcUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaiSanDgcUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taiSanDgcFormService = TestBed.inject(TaiSanDgcFormService);
    taiSanDgcService = TestBed.inject(TaiSanDgcService);
    taiSanService = TestBed.inject(TaiSanService);
    danhMucLoaiTaiSanService = TestBed.inject(DanhMucLoaiTaiSanService);
    tinhTrangTaiSanService = TestBed.inject(TinhTrangTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TaiSan query and add missing value', () => {
      const taiSanDgc: ITaiSanDgc = { id: 456 };
      const taiSan: ITaiSan = { idTaiSan: 8141 };
      taiSanDgc.taiSan = taiSan;

      const taiSanCollection: ITaiSan[] = [{ idTaiSan: 13406 }];
      jest.spyOn(taiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: taiSanCollection })));
      const additionalTaiSans = [taiSan];
      const expectedCollection: ITaiSan[] = [...additionalTaiSans, ...taiSanCollection];
      jest.spyOn(taiSanService, 'addTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSanDgc });
      comp.ngOnInit();

      expect(taiSanService.query).toHaveBeenCalled();
      expect(taiSanService.addTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        taiSanCollection,
        ...additionalTaiSans.map(expect.objectContaining),
      );
      expect(comp.taiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DanhMucLoaiTaiSan query and add missing value', () => {
      const taiSanDgc: ITaiSanDgc = { id: 456 };
      const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = { idLoaiTs: 7349 };
      taiSanDgc.danhMucLoaiTaiSan = danhMucLoaiTaiSan;

      const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [{ idLoaiTs: 25741 }];
      jest.spyOn(danhMucLoaiTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiTaiSanCollection })));
      const additionalDanhMucLoaiTaiSans = [danhMucLoaiTaiSan];
      const expectedCollection: IDanhMucLoaiTaiSan[] = [...additionalDanhMucLoaiTaiSans, ...danhMucLoaiTaiSanCollection];
      jest.spyOn(danhMucLoaiTaiSanService, 'addDanhMucLoaiTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSanDgc });
      comp.ngOnInit();

      expect(danhMucLoaiTaiSanService.query).toHaveBeenCalled();
      expect(danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiTaiSanCollection,
        ...additionalDanhMucLoaiTaiSans.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TinhTrangTaiSan query and add missing value', () => {
      const taiSanDgc: ITaiSanDgc = { id: 456 };
      const tinhTrangTaiSan: ITinhTrangTaiSan = { idTinhTrang: 17476 };
      taiSanDgc.tinhTrangTaiSan = tinhTrangTaiSan;

      const tinhTrangTaiSanCollection: ITinhTrangTaiSan[] = [{ idTinhTrang: 17083 }];
      jest.spyOn(tinhTrangTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: tinhTrangTaiSanCollection })));
      const additionalTinhTrangTaiSans = [tinhTrangTaiSan];
      const expectedCollection: ITinhTrangTaiSan[] = [...additionalTinhTrangTaiSans, ...tinhTrangTaiSanCollection];
      jest.spyOn(tinhTrangTaiSanService, 'addTinhTrangTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSanDgc });
      comp.ngOnInit();

      expect(tinhTrangTaiSanService.query).toHaveBeenCalled();
      expect(tinhTrangTaiSanService.addTinhTrangTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        tinhTrangTaiSanCollection,
        ...additionalTinhTrangTaiSans.map(expect.objectContaining),
      );
      expect(comp.tinhTrangTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const taiSanDgc: ITaiSanDgc = { id: 456 };
      const taiSan: ITaiSan = { idTaiSan: 9719 };
      taiSanDgc.taiSan = taiSan;
      const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = { idLoaiTs: 29684 };
      taiSanDgc.danhMucLoaiTaiSan = danhMucLoaiTaiSan;
      const tinhTrangTaiSan: ITinhTrangTaiSan = { idTinhTrang: 9542 };
      taiSanDgc.tinhTrangTaiSan = tinhTrangTaiSan;

      activatedRoute.data = of({ taiSanDgc });
      comp.ngOnInit();

      expect(comp.taiSansSharedCollection).toContain(taiSan);
      expect(comp.danhMucLoaiTaiSansSharedCollection).toContain(danhMucLoaiTaiSan);
      expect(comp.tinhTrangTaiSansSharedCollection).toContain(tinhTrangTaiSan);
      expect(comp.taiSanDgc).toEqual(taiSanDgc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDgc>>();
      const taiSanDgc = { id: 123 };
      jest.spyOn(taiSanDgcFormService, 'getTaiSanDgc').mockReturnValue(taiSanDgc);
      jest.spyOn(taiSanDgcService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDgc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDgc }));
      saveSubject.complete();

      // THEN
      expect(taiSanDgcFormService.getTaiSanDgc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taiSanDgcService.update).toHaveBeenCalledWith(expect.objectContaining(taiSanDgc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDgc>>();
      const taiSanDgc = { id: 123 };
      jest.spyOn(taiSanDgcFormService, 'getTaiSanDgc').mockReturnValue({ id: null });
      jest.spyOn(taiSanDgcService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDgc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDgc }));
      saveSubject.complete();

      // THEN
      expect(taiSanDgcFormService.getTaiSanDgc).toHaveBeenCalled();
      expect(taiSanDgcService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDgc>>();
      const taiSanDgc = { id: 123 };
      jest.spyOn(taiSanDgcService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDgc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taiSanDgcService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTaiSan', () => {
      it('Should forward to taiSanService', () => {
        const entity = { idTaiSan: 123 };
        const entity2 = { idTaiSan: 456 };
        jest.spyOn(taiSanService, 'compareTaiSan');
        comp.compareTaiSan(entity, entity2);
        expect(taiSanService.compareTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDanhMucLoaiTaiSan', () => {
      it('Should forward to danhMucLoaiTaiSanService', () => {
        const entity = { idLoaiTs: 123 };
        const entity2 = { idLoaiTs: 456 };
        jest.spyOn(danhMucLoaiTaiSanService, 'compareDanhMucLoaiTaiSan');
        comp.compareDanhMucLoaiTaiSan(entity, entity2);
        expect(danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTinhTrangTaiSan', () => {
      it('Should forward to tinhTrangTaiSanService', () => {
        const entity = { idTinhTrang: 123 };
        const entity2 = { idTinhTrang: 456 };
        jest.spyOn(tinhTrangTaiSanService, 'compareTinhTrangTaiSan');
        comp.compareTinhTrangTaiSan(entity, entity2);
        expect(tinhTrangTaiSanService.compareTinhTrangTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
