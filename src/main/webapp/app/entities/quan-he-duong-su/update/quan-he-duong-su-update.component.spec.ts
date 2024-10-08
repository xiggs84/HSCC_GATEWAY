import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDuongSu } from 'app/entities/duong-su/duong-su.model';
import { DuongSuService } from 'app/entities/duong-su/service/duong-su.service';
import { QuanHeDuongSuService } from '../service/quan-he-duong-su.service';
import { IQuanHeDuongSu } from '../quan-he-duong-su.model';
import { QuanHeDuongSuFormService } from './quan-he-duong-su-form.service';

import { QuanHeDuongSuUpdateComponent } from './quan-he-duong-su-update.component';

describe('QuanHeDuongSu Management Update Component', () => {
  let comp: QuanHeDuongSuUpdateComponent;
  let fixture: ComponentFixture<QuanHeDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quanHeDuongSuFormService: QuanHeDuongSuFormService;
  let quanHeDuongSuService: QuanHeDuongSuService;
  let duongSuService: DuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuanHeDuongSuUpdateComponent],
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
      .overrideTemplate(QuanHeDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuanHeDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quanHeDuongSuFormService = TestBed.inject(QuanHeDuongSuFormService);
    quanHeDuongSuService = TestBed.inject(QuanHeDuongSuService);
    duongSuService = TestBed.inject(DuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DuongSu query and add missing value', () => {
      const quanHeDuongSu: IQuanHeDuongSu = { idQuanHe: 456 };
      const duongSu: IDuongSu = { idDuongSu: 16937 };
      quanHeDuongSu.duongSu = duongSu;

      const duongSuCollection: IDuongSu[] = [{ idDuongSu: 4338 }];
      jest.spyOn(duongSuService, 'query').mockReturnValue(of(new HttpResponse({ body: duongSuCollection })));
      const additionalDuongSus = [duongSu];
      const expectedCollection: IDuongSu[] = [...additionalDuongSus, ...duongSuCollection];
      jest.spyOn(duongSuService, 'addDuongSuToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quanHeDuongSu });
      comp.ngOnInit();

      expect(duongSuService.query).toHaveBeenCalled();
      expect(duongSuService.addDuongSuToCollectionIfMissing).toHaveBeenCalledWith(
        duongSuCollection,
        ...additionalDuongSus.map(expect.objectContaining),
      );
      expect(comp.duongSusSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const quanHeDuongSu: IQuanHeDuongSu = { idQuanHe: 456 };
      const duongSu: IDuongSu = { idDuongSu: 12881 };
      quanHeDuongSu.duongSu = duongSu;

      activatedRoute.data = of({ quanHeDuongSu });
      comp.ngOnInit();

      expect(comp.duongSusSharedCollection).toContain(duongSu);
      expect(comp.quanHeDuongSu).toEqual(quanHeDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeDuongSu>>();
      const quanHeDuongSu = { idQuanHe: 123 };
      jest.spyOn(quanHeDuongSuFormService, 'getQuanHeDuongSu').mockReturnValue(quanHeDuongSu);
      jest.spyOn(quanHeDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quanHeDuongSu }));
      saveSubject.complete();

      // THEN
      expect(quanHeDuongSuFormService.getQuanHeDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quanHeDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(quanHeDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeDuongSu>>();
      const quanHeDuongSu = { idQuanHe: 123 };
      jest.spyOn(quanHeDuongSuFormService, 'getQuanHeDuongSu').mockReturnValue({ idQuanHe: null });
      jest.spyOn(quanHeDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quanHeDuongSu }));
      saveSubject.complete();

      // THEN
      expect(quanHeDuongSuFormService.getQuanHeDuongSu).toHaveBeenCalled();
      expect(quanHeDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeDuongSu>>();
      const quanHeDuongSu = { idQuanHe: 123 };
      jest.spyOn(quanHeDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quanHeDuongSuService.update).toHaveBeenCalled();
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
