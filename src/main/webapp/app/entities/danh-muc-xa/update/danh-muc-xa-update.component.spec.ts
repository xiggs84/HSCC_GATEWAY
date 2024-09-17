import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { DanhMucXaService } from '../service/danh-muc-xa.service';
import { IDanhMucXa } from '../danh-muc-xa.model';
import { DanhMucXaFormService } from './danh-muc-xa-form.service';

import { DanhMucXaUpdateComponent } from './danh-muc-xa-update.component';

describe('DanhMucXa Management Update Component', () => {
  let comp: DanhMucXaUpdateComponent;
  let fixture: ComponentFixture<DanhMucXaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucXaFormService: DanhMucXaFormService;
  let danhMucXaService: DanhMucXaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucXaUpdateComponent],
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
      .overrideTemplate(DanhMucXaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucXaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucXaFormService = TestBed.inject(DanhMucXaFormService);
    danhMucXaService = TestBed.inject(DanhMucXaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucXa: IDanhMucXa = { maXa: 'CBA' };

      activatedRoute.data = of({ danhMucXa });
      comp.ngOnInit();

      expect(comp.danhMucXa).toEqual(danhMucXa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucXa>>();
      const danhMucXa = { maXa: 'ABC' };
      jest.spyOn(danhMucXaFormService, 'getDanhMucXa').mockReturnValue(danhMucXa);
      jest.spyOn(danhMucXaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucXa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucXa }));
      saveSubject.complete();

      // THEN
      expect(danhMucXaFormService.getDanhMucXa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucXaService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucXa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucXa>>();
      const danhMucXa = { maXa: 'ABC' };
      jest.spyOn(danhMucXaFormService, 'getDanhMucXa').mockReturnValue({ maXa: null });
      jest.spyOn(danhMucXaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucXa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucXa }));
      saveSubject.complete();

      // THEN
      expect(danhMucXaFormService.getDanhMucXa).toHaveBeenCalled();
      expect(danhMucXaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucXa>>();
      const danhMucXa = { maXa: 'ABC' };
      jest.spyOn(danhMucXaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucXa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucXaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
