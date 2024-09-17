import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICapQuanLy } from 'app/entities/cap-quan-ly/cap-quan-ly.model';
import { CapQuanLyService } from 'app/entities/cap-quan-ly/service/cap-quan-ly.service';
import { ILoaiDonVi } from 'app/entities/loai-don-vi/loai-don-vi.model';
import { LoaiDonViService } from 'app/entities/loai-don-vi/service/loai-don-vi.service';
import { INhiemVu } from 'app/entities/nhiem-vu/nhiem-vu.model';
import { NhiemVuService } from 'app/entities/nhiem-vu/service/nhiem-vu.service';
import { IDanhMucDonVi } from '../danh-muc-don-vi.model';
import { DanhMucDonViService } from '../service/danh-muc-don-vi.service';
import { DanhMucDonViFormService } from './danh-muc-don-vi-form.service';

import { DanhMucDonViUpdateComponent } from './danh-muc-don-vi-update.component';

describe('DanhMucDonVi Management Update Component', () => {
  let comp: DanhMucDonViUpdateComponent;
  let fixture: ComponentFixture<DanhMucDonViUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucDonViFormService: DanhMucDonViFormService;
  let danhMucDonViService: DanhMucDonViService;
  let capQuanLyService: CapQuanLyService;
  let loaiDonViService: LoaiDonViService;
  let nhiemVuService: NhiemVuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucDonViUpdateComponent],
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
      .overrideTemplate(DanhMucDonViUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucDonViUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucDonViFormService = TestBed.inject(DanhMucDonViFormService);
    danhMucDonViService = TestBed.inject(DanhMucDonViService);
    capQuanLyService = TestBed.inject(CapQuanLyService);
    loaiDonViService = TestBed.inject(LoaiDonViService);
    nhiemVuService = TestBed.inject(NhiemVuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CapQuanLy query and add missing value', () => {
      const danhMucDonVi: IDanhMucDonVi = { idDonVi: 456 };
      const capQuanLy: ICapQuanLy = { idCapQl: '700f7c59-a029-45c9-bd18-b75fa8458c78' };
      danhMucDonVi.capQuanLy = capQuanLy;

      const capQuanLyCollection: ICapQuanLy[] = [{ idCapQl: '7ae2212c-ebea-44e1-a40a-452155a990b0' }];
      jest.spyOn(capQuanLyService, 'query').mockReturnValue(of(new HttpResponse({ body: capQuanLyCollection })));
      const additionalCapQuanLies = [capQuanLy];
      const expectedCollection: ICapQuanLy[] = [...additionalCapQuanLies, ...capQuanLyCollection];
      jest.spyOn(capQuanLyService, 'addCapQuanLyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(capQuanLyService.query).toHaveBeenCalled();
      expect(capQuanLyService.addCapQuanLyToCollectionIfMissing).toHaveBeenCalledWith(
        capQuanLyCollection,
        ...additionalCapQuanLies.map(expect.objectContaining),
      );
      expect(comp.capQuanLiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LoaiDonVi query and add missing value', () => {
      const danhMucDonVi: IDanhMucDonVi = { idDonVi: 456 };
      const loaiDonVi: ILoaiDonVi = { idLoaiDv: 'a45709bf-a4ea-47b1-837d-b8fa19c5d96b' };
      danhMucDonVi.loaiDonVi = loaiDonVi;

      const loaiDonViCollection: ILoaiDonVi[] = [{ idLoaiDv: '183cc300-e276-468b-829f-a272b7ba78a0' }];
      jest.spyOn(loaiDonViService, 'query').mockReturnValue(of(new HttpResponse({ body: loaiDonViCollection })));
      const additionalLoaiDonVis = [loaiDonVi];
      const expectedCollection: ILoaiDonVi[] = [...additionalLoaiDonVis, ...loaiDonViCollection];
      jest.spyOn(loaiDonViService, 'addLoaiDonViToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(loaiDonViService.query).toHaveBeenCalled();
      expect(loaiDonViService.addLoaiDonViToCollectionIfMissing).toHaveBeenCalledWith(
        loaiDonViCollection,
        ...additionalLoaiDonVis.map(expect.objectContaining),
      );
      expect(comp.loaiDonVisSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NhiemVu query and add missing value', () => {
      const danhMucDonVi: IDanhMucDonVi = { idDonVi: 456 };
      const nhiemVu: INhiemVu = { idNhiemVu: '1daafaa3-a7d7-4f2e-bbed-7ee900687040' };
      danhMucDonVi.nhiemVu = nhiemVu;

      const nhiemVuCollection: INhiemVu[] = [{ idNhiemVu: 'f882ab5c-5ada-4bd2-9d87-1a3fc7967d0f' }];
      jest.spyOn(nhiemVuService, 'query').mockReturnValue(of(new HttpResponse({ body: nhiemVuCollection })));
      const additionalNhiemVus = [nhiemVu];
      const expectedCollection: INhiemVu[] = [...additionalNhiemVus, ...nhiemVuCollection];
      jest.spyOn(nhiemVuService, 'addNhiemVuToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(nhiemVuService.query).toHaveBeenCalled();
      expect(nhiemVuService.addNhiemVuToCollectionIfMissing).toHaveBeenCalledWith(
        nhiemVuCollection,
        ...additionalNhiemVus.map(expect.objectContaining),
      );
      expect(comp.nhiemVusSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhMucDonVi: IDanhMucDonVi = { idDonVi: 456 };
      const capQuanLy: ICapQuanLy = { idCapQl: '1b2b0bbe-e960-4200-ad08-b1b336528a65' };
      danhMucDonVi.capQuanLy = capQuanLy;
      const loaiDonVi: ILoaiDonVi = { idLoaiDv: 'b7530989-7d2c-420e-8fb9-c07e9c8e50bb' };
      danhMucDonVi.loaiDonVi = loaiDonVi;
      const nhiemVu: INhiemVu = { idNhiemVu: 'c81b286b-c28b-4eee-ac2d-4475af344e17' };
      danhMucDonVi.nhiemVu = nhiemVu;

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(comp.capQuanLiesSharedCollection).toContain(capQuanLy);
      expect(comp.loaiDonVisSharedCollection).toContain(loaiDonVi);
      expect(comp.nhiemVusSharedCollection).toContain(nhiemVu);
      expect(comp.danhMucDonVi).toEqual(danhMucDonVi);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDonVi>>();
      const danhMucDonVi = { idDonVi: 123 };
      jest.spyOn(danhMucDonViFormService, 'getDanhMucDonVi').mockReturnValue(danhMucDonVi);
      jest.spyOn(danhMucDonViService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDonVi }));
      saveSubject.complete();

      // THEN
      expect(danhMucDonViFormService.getDanhMucDonVi).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucDonViService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucDonVi));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDonVi>>();
      const danhMucDonVi = { idDonVi: 123 };
      jest.spyOn(danhMucDonViFormService, 'getDanhMucDonVi').mockReturnValue({ idDonVi: null });
      jest.spyOn(danhMucDonViService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDonVi: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDonVi }));
      saveSubject.complete();

      // THEN
      expect(danhMucDonViFormService.getDanhMucDonVi).toHaveBeenCalled();
      expect(danhMucDonViService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDonVi>>();
      const danhMucDonVi = { idDonVi: 123 };
      jest.spyOn(danhMucDonViService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucDonViService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCapQuanLy', () => {
      it('Should forward to capQuanLyService', () => {
        const entity = { idCapQl: 'ABC' };
        const entity2 = { idCapQl: 'CBA' };
        jest.spyOn(capQuanLyService, 'compareCapQuanLy');
        comp.compareCapQuanLy(entity, entity2);
        expect(capQuanLyService.compareCapQuanLy).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLoaiDonVi', () => {
      it('Should forward to loaiDonViService', () => {
        const entity = { idLoaiDv: 'ABC' };
        const entity2 = { idLoaiDv: 'CBA' };
        jest.spyOn(loaiDonViService, 'compareLoaiDonVi');
        comp.compareLoaiDonVi(entity, entity2);
        expect(loaiDonViService.compareLoaiDonVi).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareNhiemVu', () => {
      it('Should forward to nhiemVuService', () => {
        const entity = { idNhiemVu: 'ABC' };
        const entity2 = { idNhiemVu: 'CBA' };
        jest.spyOn(nhiemVuService, 'compareNhiemVu');
        comp.compareNhiemVu(entity, entity2);
        expect(nhiemVuService.compareNhiemVu).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
