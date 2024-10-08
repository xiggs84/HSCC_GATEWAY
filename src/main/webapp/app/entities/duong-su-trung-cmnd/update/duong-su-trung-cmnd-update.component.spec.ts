import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDuongSu } from 'app/entities/duong-su/duong-su.model';
import { DuongSuService } from 'app/entities/duong-su/service/duong-su.service';
import { DuongSuTrungCmndService } from '../service/duong-su-trung-cmnd.service';
import { IDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';
import { DuongSuTrungCmndFormService } from './duong-su-trung-cmnd-form.service';

import { DuongSuTrungCmndUpdateComponent } from './duong-su-trung-cmnd-update.component';

describe('DuongSuTrungCmnd Management Update Component', () => {
  let comp: DuongSuTrungCmndUpdateComponent;
  let fixture: ComponentFixture<DuongSuTrungCmndUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let duongSuTrungCmndFormService: DuongSuTrungCmndFormService;
  let duongSuTrungCmndService: DuongSuTrungCmndService;
  let duongSuService: DuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DuongSuTrungCmndUpdateComponent],
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
      .overrideTemplate(DuongSuTrungCmndUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DuongSuTrungCmndUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    duongSuTrungCmndFormService = TestBed.inject(DuongSuTrungCmndFormService);
    duongSuTrungCmndService = TestBed.inject(DuongSuTrungCmndService);
    duongSuService = TestBed.inject(DuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DuongSu query and add missing value', () => {
      const duongSuTrungCmnd: IDuongSuTrungCmnd = { id: 456 };
      const duongSu: IDuongSu = { idDuongSu: 9969 };
      duongSuTrungCmnd.duongSu = duongSu;

      const duongSuCollection: IDuongSu[] = [{ idDuongSu: 1523 }];
      jest.spyOn(duongSuService, 'query').mockReturnValue(of(new HttpResponse({ body: duongSuCollection })));
      const additionalDuongSus = [duongSu];
      const expectedCollection: IDuongSu[] = [...additionalDuongSus, ...duongSuCollection];
      jest.spyOn(duongSuService, 'addDuongSuToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ duongSuTrungCmnd });
      comp.ngOnInit();

      expect(duongSuService.query).toHaveBeenCalled();
      expect(duongSuService.addDuongSuToCollectionIfMissing).toHaveBeenCalledWith(
        duongSuCollection,
        ...additionalDuongSus.map(expect.objectContaining),
      );
      expect(comp.duongSusSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const duongSuTrungCmnd: IDuongSuTrungCmnd = { id: 456 };
      const duongSu: IDuongSu = { idDuongSu: 1277 };
      duongSuTrungCmnd.duongSu = duongSu;

      activatedRoute.data = of({ duongSuTrungCmnd });
      comp.ngOnInit();

      expect(comp.duongSusSharedCollection).toContain(duongSu);
      expect(comp.duongSuTrungCmnd).toEqual(duongSuTrungCmnd);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSuTrungCmnd>>();
      const duongSuTrungCmnd = { id: 123 };
      jest.spyOn(duongSuTrungCmndFormService, 'getDuongSuTrungCmnd').mockReturnValue(duongSuTrungCmnd);
      jest.spyOn(duongSuTrungCmndService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSuTrungCmnd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSuTrungCmnd }));
      saveSubject.complete();

      // THEN
      expect(duongSuTrungCmndFormService.getDuongSuTrungCmnd).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(duongSuTrungCmndService.update).toHaveBeenCalledWith(expect.objectContaining(duongSuTrungCmnd));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSuTrungCmnd>>();
      const duongSuTrungCmnd = { id: 123 };
      jest.spyOn(duongSuTrungCmndFormService, 'getDuongSuTrungCmnd').mockReturnValue({ id: null });
      jest.spyOn(duongSuTrungCmndService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSuTrungCmnd: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSuTrungCmnd }));
      saveSubject.complete();

      // THEN
      expect(duongSuTrungCmndFormService.getDuongSuTrungCmnd).toHaveBeenCalled();
      expect(duongSuTrungCmndService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSuTrungCmnd>>();
      const duongSuTrungCmnd = { id: 123 };
      jest.spyOn(duongSuTrungCmndService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSuTrungCmnd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(duongSuTrungCmndService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDuongSu', () => {
      it('Should forward to duongSuService', () => {
        const entity = { idDuongSu: 123 };
        const entity2 = { idDuongSu: 456 };
        jest.spyOn(duongSuService, 'compareDuongSu');
        comp.compareDuongSu(entity, entity2);
        expect(duongSuService.compareDuongSu).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
