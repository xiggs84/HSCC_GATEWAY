import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucLoaiSoCongChung } from 'app/entities/danh-muc-loai-so-cong-chung/danh-muc-loai-so-cong-chung.model';
import { DanhMucLoaiSoCongChungService } from 'app/entities/danh-muc-loai-so-cong-chung/service/danh-muc-loai-so-cong-chung.service';
import { SoCongChungService } from '../service/so-cong-chung.service';
import { ISoCongChung } from '../so-cong-chung.model';
import { SoCongChungFormService } from './so-cong-chung-form.service';

import { SoCongChungUpdateComponent } from './so-cong-chung-update.component';

describe('SoCongChung Management Update Component', () => {
  let comp: SoCongChungUpdateComponent;
  let fixture: ComponentFixture<SoCongChungUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soCongChungFormService: SoCongChungFormService;
  let soCongChungService: SoCongChungService;
  let danhMucLoaiSoCongChungService: DanhMucLoaiSoCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SoCongChungUpdateComponent],
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
      .overrideTemplate(SoCongChungUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoCongChungUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soCongChungFormService = TestBed.inject(SoCongChungFormService);
    soCongChungService = TestBed.inject(SoCongChungService);
    danhMucLoaiSoCongChungService = TestBed.inject(DanhMucLoaiSoCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiSoCongChung query and add missing value', () => {
      const soCongChung: ISoCongChung = { idSo: 'CBA' };
      const danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung = { idLoai: '1bacec0c-c520-4fb7-aeb3-381c5fcdc31e' };
      soCongChung.danhMucLoaiSoCongChung = danhMucLoaiSoCongChung;

      const danhMucLoaiSoCongChungCollection: IDanhMucLoaiSoCongChung[] = [{ idLoai: '1aceb375-ba60-4cff-a8e8-60d5c3f2a2b7' }];
      jest.spyOn(danhMucLoaiSoCongChungService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiSoCongChungCollection })));
      const additionalDanhMucLoaiSoCongChungs = [danhMucLoaiSoCongChung];
      const expectedCollection: IDanhMucLoaiSoCongChung[] = [...additionalDanhMucLoaiSoCongChungs, ...danhMucLoaiSoCongChungCollection];
      jest.spyOn(danhMucLoaiSoCongChungService, 'addDanhMucLoaiSoCongChungToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ soCongChung });
      comp.ngOnInit();

      expect(danhMucLoaiSoCongChungService.query).toHaveBeenCalled();
      expect(danhMucLoaiSoCongChungService.addDanhMucLoaiSoCongChungToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiSoCongChungCollection,
        ...additionalDanhMucLoaiSoCongChungs.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiSoCongChungsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const soCongChung: ISoCongChung = { idSo: 'CBA' };
      const danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung = { idLoai: '4193ffc0-03c9-4ab3-92d0-639a244493d7' };
      soCongChung.danhMucLoaiSoCongChung = danhMucLoaiSoCongChung;

      activatedRoute.data = of({ soCongChung });
      comp.ngOnInit();

      expect(comp.danhMucLoaiSoCongChungsSharedCollection).toContain(danhMucLoaiSoCongChung);
      expect(comp.soCongChung).toEqual(soCongChung);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoCongChung>>();
      const soCongChung = { idSo: 'ABC' };
      jest.spyOn(soCongChungFormService, 'getSoCongChung').mockReturnValue(soCongChung);
      jest.spyOn(soCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soCongChung }));
      saveSubject.complete();

      // THEN
      expect(soCongChungFormService.getSoCongChung).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(soCongChungService.update).toHaveBeenCalledWith(expect.objectContaining(soCongChung));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoCongChung>>();
      const soCongChung = { idSo: 'ABC' };
      jest.spyOn(soCongChungFormService, 'getSoCongChung').mockReturnValue({ idSo: null });
      jest.spyOn(soCongChungService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soCongChung: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soCongChung }));
      saveSubject.complete();

      // THEN
      expect(soCongChungFormService.getSoCongChung).toHaveBeenCalled();
      expect(soCongChungService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoCongChung>>();
      const soCongChung = { idSo: 'ABC' };
      jest.spyOn(soCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soCongChungService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucLoaiSoCongChung', () => {
      it('Should forward to danhMucLoaiSoCongChungService', () => {
        const entity = { idLoai: 'ABC' };
        const entity2 = { idLoai: 'CBA' };
        jest.spyOn(danhMucLoaiSoCongChungService, 'compareDanhMucLoaiSoCongChung');
        comp.compareDanhMucLoaiSoCongChung(entity, entity2);
        expect(danhMucLoaiSoCongChungService.compareDanhMucLoaiSoCongChung).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
