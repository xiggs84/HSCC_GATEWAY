import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { HopDongCongChungService } from '../service/hop-dong-cong-chung.service';
import { IHopDongCongChung } from '../hop-dong-cong-chung.model';
import { HopDongCongChungFormService } from './hop-dong-cong-chung-form.service';

import { HopDongCongChungUpdateComponent } from './hop-dong-cong-chung-update.component';

describe('HopDongCongChung Management Update Component', () => {
  let comp: HopDongCongChungUpdateComponent;
  let fixture: ComponentFixture<HopDongCongChungUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let hopDongCongChungFormService: HopDongCongChungFormService;
  let hopDongCongChungService: HopDongCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HopDongCongChungUpdateComponent],
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
      .overrideTemplate(HopDongCongChungUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HopDongCongChungUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    hopDongCongChungFormService = TestBed.inject(HopDongCongChungFormService);
    hopDongCongChungService = TestBed.inject(HopDongCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const hopDongCongChung: IHopDongCongChung = { id: 456 };

      activatedRoute.data = of({ hopDongCongChung });
      comp.ngOnInit();

      expect(comp.hopDongCongChung).toEqual(hopDongCongChung);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHopDongCongChung>>();
      const hopDongCongChung = { id: 123 };
      jest.spyOn(hopDongCongChungFormService, 'getHopDongCongChung').mockReturnValue(hopDongCongChung);
      jest.spyOn(hopDongCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hopDongCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hopDongCongChung }));
      saveSubject.complete();

      // THEN
      expect(hopDongCongChungFormService.getHopDongCongChung).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(hopDongCongChungService.update).toHaveBeenCalledWith(expect.objectContaining(hopDongCongChung));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHopDongCongChung>>();
      const hopDongCongChung = { id: 123 };
      jest.spyOn(hopDongCongChungFormService, 'getHopDongCongChung').mockReturnValue({ id: null });
      jest.spyOn(hopDongCongChungService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hopDongCongChung: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hopDongCongChung }));
      saveSubject.complete();

      // THEN
      expect(hopDongCongChungFormService.getHopDongCongChung).toHaveBeenCalled();
      expect(hopDongCongChungService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHopDongCongChung>>();
      const hopDongCongChung = { id: 123 };
      jest.spyOn(hopDongCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hopDongCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(hopDongCongChungService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
