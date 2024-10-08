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
      const loaiDuongSu: ILoaiDuongSu = { idLoaiDuongSu: '11d2e7c5-63e3-41ad-9ce7-95234d54085b' };
      duongSu.loaiDuongSu = loaiDuongSu;

      const loaiDuongSuCollection: ILoaiDuongSu[] = [{ idLoaiDuongSu: '54bface3-843f-4ecf-b152-73ef0582f35f' }];
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
      const loaiGiayTo: ILoaiGiayTo = { idLoaiGiayTo: '44c4cfa7-fe79-4a33-a675-3302d00415dc' };
      duongSu.loaiGiayTo = loaiGiayTo;

      const loaiGiayToCollection: ILoaiGiayTo[] = [{ idLoaiGiayTo: 'e931c262-bf72-4949-aba5-6b5bb4c2cd75' }];
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
      const loaiDuongSu: ILoaiDuongSu = { idLoaiDuongSu: 'a331906e-763c-44ac-a7d3-aff9027ac941' };
      duongSu.loaiDuongSu = loaiDuongSu;
      const loaiGiayTo: ILoaiGiayTo = { idLoaiGiayTo: 'fa721456-6b90-49f4-9025-fa9cd5cc7c54' };
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
