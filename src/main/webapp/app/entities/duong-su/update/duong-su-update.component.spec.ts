import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ILoaiDuongSu } from 'app/entities/loai-duong-su/loai-duong-su.model';
import { LoaiDuongSuService } from 'app/entities/loai-duong-su/service/loai-duong-su.service';
import { ILoaiGiayTo } from 'app/entities/loai-giay-to/loai-giay-to.model';
import { LoaiGiayToService } from 'app/entities/loai-giay-to/service/loai-giay-to.service';
import { IDuongSu } from '../duong-su.model';
import { DuongSuService } from '../service/duong-su.service';
import { DuongSuFormService } from './duong-su-form.service';

import { DuongSuUpdateComponent } from './duong-su-update.component';

describe('DuongSu Management Update Component', () => {
  let comp: DuongSuUpdateComponent;
  let fixture: ComponentFixture<DuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let duongSuFormService: DuongSuFormService;
  let duongSuService: DuongSuService;
  let loaiDuongSuService: LoaiDuongSuService;
  let loaiGiayToService: LoaiGiayToService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DuongSuUpdateComponent],
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
      .overrideTemplate(DuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    duongSuFormService = TestBed.inject(DuongSuFormService);
    duongSuService = TestBed.inject(DuongSuService);
    loaiDuongSuService = TestBed.inject(LoaiDuongSuService);
    loaiGiayToService = TestBed.inject(LoaiGiayToService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call LoaiDuongSu query and add missing value', () => {
      const duongSu: IDuongSu = { idDuongSu: 456 };
      const loaiDuongSu: ILoaiDuongSu = { idLoaiDuongSu: 'ff5493e6-491f-4d27-aebf-2f1f1da24362' };
      duongSu.loaiDuongSu = loaiDuongSu;

      const loaiDuongSuCollection: ILoaiDuongSu[] = [{ idLoaiDuongSu: '1f59cfdf-6e01-419f-b29f-5b50c4ad2927' }];
      jest.spyOn(loaiDuongSuService, 'query').mockReturnValue(of(new HttpResponse({ body: loaiDuongSuCollection })));
      const additionalLoaiDuongSus = [loaiDuongSu];
      const expectedCollection: ILoaiDuongSu[] = [...additionalLoaiDuongSus, ...loaiDuongSuCollection];
      jest.spyOn(loaiDuongSuService, 'addLoaiDuongSuToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      expect(loaiDuongSuService.query).toHaveBeenCalled();
      expect(loaiDuongSuService.addLoaiDuongSuToCollectionIfMissing).toHaveBeenCalledWith(
        loaiDuongSuCollection,
        ...additionalLoaiDuongSus.map(expect.objectContaining),
      );
      expect(comp.loaiDuongSusSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LoaiGiayTo query and add missing value', () => {
      const duongSu: IDuongSu = { idDuongSu: 456 };
      const loaiGiayTo: ILoaiGiayTo = { idLoaiGiayTo: 'd2944d49-2e6d-4e15-9fec-39096a3c7575' };
      duongSu.loaiGiayTo = loaiGiayTo;

      const loaiGiayToCollection: ILoaiGiayTo[] = [{ idLoaiGiayTo: '4abe667f-cadd-4d4a-8079-b4ed388ddab2' }];
      jest.spyOn(loaiGiayToService, 'query').mockReturnValue(of(new HttpResponse({ body: loaiGiayToCollection })));
      const additionalLoaiGiayTos = [loaiGiayTo];
      const expectedCollection: ILoaiGiayTo[] = [...additionalLoaiGiayTos, ...loaiGiayToCollection];
      jest.spyOn(loaiGiayToService, 'addLoaiGiayToToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      expect(loaiGiayToService.query).toHaveBeenCalled();
      expect(loaiGiayToService.addLoaiGiayToToCollectionIfMissing).toHaveBeenCalledWith(
        loaiGiayToCollection,
        ...additionalLoaiGiayTos.map(expect.objectContaining),
      );
      expect(comp.loaiGiayTosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const duongSu: IDuongSu = { idDuongSu: 456 };
      const loaiDuongSu: ILoaiDuongSu = { idLoaiDuongSu: '0b52a6b1-fe6b-4fc8-9621-f842f546263e' };
      duongSu.loaiDuongSu = loaiDuongSu;
      const loaiGiayTo: ILoaiGiayTo = { idLoaiGiayTo: '2770bff0-f17d-4db8-bd92-88a0daac94e5' };
      duongSu.loaiGiayTo = loaiGiayTo;

      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      expect(comp.loaiDuongSusSharedCollection).toContain(loaiDuongSu);
      expect(comp.loaiGiayTosSharedCollection).toContain(loaiGiayTo);
      expect(comp.duongSu).toEqual(duongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSu>>();
      const duongSu = { idDuongSu: 123 };
      jest.spyOn(duongSuFormService, 'getDuongSu').mockReturnValue(duongSu);
      jest.spyOn(duongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSu }));
      saveSubject.complete();

      // THEN
      expect(duongSuFormService.getDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(duongSuService.update).toHaveBeenCalledWith(expect.objectContaining(duongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSu>>();
      const duongSu = { idDuongSu: 123 };
      jest.spyOn(duongSuFormService, 'getDuongSu').mockReturnValue({ idDuongSu: null });
      jest.spyOn(duongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSu }));
      saveSubject.complete();

      // THEN
      expect(duongSuFormService.getDuongSu).toHaveBeenCalled();
      expect(duongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSu>>();
      const duongSu = { idDuongSu: 123 };
      jest.spyOn(duongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(duongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareLoaiDuongSu', () => {
      it('Should forward to loaiDuongSuService', () => {
        const entity = { idLoaiDuongSu: 'ABC' };
        const entity2 = { idLoaiDuongSu: 'CBA' };
        jest.spyOn(loaiDuongSuService, 'compareLoaiDuongSu');
        comp.compareLoaiDuongSu(entity, entity2);
        expect(loaiDuongSuService.compareLoaiDuongSu).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLoaiGiayTo', () => {
      it('Should forward to loaiGiayToService', () => {
        const entity = { idLoaiGiayTo: 'ABC' };
        const entity2 = { idLoaiGiayTo: 'CBA' };
        jest.spyOn(loaiGiayToService, 'compareLoaiGiayTo');
        comp.compareLoaiGiayTo(entity, entity2);
        expect(loaiGiayToService.compareLoaiGiayTo).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
