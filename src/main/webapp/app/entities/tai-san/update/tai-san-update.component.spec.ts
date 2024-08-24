import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TaiSanService } from '../service/tai-san.service';
import { ITaiSan } from '../tai-san.model';
import { TaiSanFormService } from './tai-san-form.service';

import { TaiSanUpdateComponent } from './tai-san-update.component';

describe('TaiSan Management Update Component', () => {
  let comp: TaiSanUpdateComponent;
  let fixture: ComponentFixture<TaiSanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taiSanFormService: TaiSanFormService;
  let taiSanService: TaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanUpdateComponent],
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
      .overrideTemplate(TaiSanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaiSanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taiSanFormService = TestBed.inject(TaiSanFormService);
    taiSanService = TestBed.inject(TaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const taiSan: ITaiSan = { id: 456 };

      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      expect(comp.taiSan).toEqual(taiSan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSan>>();
      const taiSan = { id: 123 };
      jest.spyOn(taiSanFormService, 'getTaiSan').mockReturnValue(taiSan);
      jest.spyOn(taiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSan }));
      saveSubject.complete();

      // THEN
      expect(taiSanFormService.getTaiSan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taiSanService.update).toHaveBeenCalledWith(expect.objectContaining(taiSan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSan>>();
      const taiSan = { id: 123 };
      jest.spyOn(taiSanFormService, 'getTaiSan').mockReturnValue({ id: null });
      jest.spyOn(taiSanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSan }));
      saveSubject.complete();

      // THEN
      expect(taiSanFormService.getTaiSan).toHaveBeenCalled();
      expect(taiSanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSan>>();
      const taiSan = { id: 123 };
      jest.spyOn(taiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taiSanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
