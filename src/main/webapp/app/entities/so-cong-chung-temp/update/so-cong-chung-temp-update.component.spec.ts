import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { SoCongChungTempService } from '../service/so-cong-chung-temp.service';
import { ISoCongChungTemp } from '../so-cong-chung-temp.model';
import { SoCongChungTempFormService } from './so-cong-chung-temp-form.service';

import { SoCongChungTempUpdateComponent } from './so-cong-chung-temp-update.component';

describe('SoCongChungTemp Management Update Component', () => {
  let comp: SoCongChungTempUpdateComponent;
  let fixture: ComponentFixture<SoCongChungTempUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soCongChungTempFormService: SoCongChungTempFormService;
  let soCongChungTempService: SoCongChungTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SoCongChungTempUpdateComponent],
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
      .overrideTemplate(SoCongChungTempUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoCongChungTempUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soCongChungTempFormService = TestBed.inject(SoCongChungTempFormService);
    soCongChungTempService = TestBed.inject(SoCongChungTempService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const soCongChungTemp: ISoCongChungTemp = { id: 456 };

      activatedRoute.data = of({ soCongChungTemp });
      comp.ngOnInit();

      expect(comp.soCongChungTemp).toEqual(soCongChungTemp);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoCongChungTemp>>();
      const soCongChungTemp = { id: 123 };
      jest.spyOn(soCongChungTempFormService, 'getSoCongChungTemp').mockReturnValue(soCongChungTemp);
      jest.spyOn(soCongChungTempService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soCongChungTemp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soCongChungTemp }));
      saveSubject.complete();

      // THEN
      expect(soCongChungTempFormService.getSoCongChungTemp).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(soCongChungTempService.update).toHaveBeenCalledWith(expect.objectContaining(soCongChungTemp));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoCongChungTemp>>();
      const soCongChungTemp = { id: 123 };
      jest.spyOn(soCongChungTempFormService, 'getSoCongChungTemp').mockReturnValue({ id: null });
      jest.spyOn(soCongChungTempService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soCongChungTemp: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soCongChungTemp }));
      saveSubject.complete();

      // THEN
      expect(soCongChungTempFormService.getSoCongChungTemp).toHaveBeenCalled();
      expect(soCongChungTempService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoCongChungTemp>>();
      const soCongChungTemp = { id: 123 };
      jest.spyOn(soCongChungTempService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soCongChungTemp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soCongChungTempService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
