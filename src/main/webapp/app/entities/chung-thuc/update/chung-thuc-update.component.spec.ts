import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ChungThucService } from '../service/chung-thuc.service';
import { IChungThuc } from '../chung-thuc.model';
import { ChungThucFormService } from './chung-thuc-form.service';

import { ChungThucUpdateComponent } from './chung-thuc-update.component';

describe('ChungThuc Management Update Component', () => {
  let comp: ChungThucUpdateComponent;
  let fixture: ComponentFixture<ChungThucUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chungThucFormService: ChungThucFormService;
  let chungThucService: ChungThucService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChungThucUpdateComponent],
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
      .overrideTemplate(ChungThucUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChungThucUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chungThucFormService = TestBed.inject(ChungThucFormService);
    chungThucService = TestBed.inject(ChungThucService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const chungThuc: IChungThuc = { id: 456 };

      activatedRoute.data = of({ chungThuc });
      comp.ngOnInit();

      expect(comp.chungThuc).toEqual(chungThuc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChungThuc>>();
      const chungThuc = { id: 123 };
      jest.spyOn(chungThucFormService, 'getChungThuc').mockReturnValue(chungThuc);
      jest.spyOn(chungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chungThuc }));
      saveSubject.complete();

      // THEN
      expect(chungThucFormService.getChungThuc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(chungThucService.update).toHaveBeenCalledWith(expect.objectContaining(chungThuc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChungThuc>>();
      const chungThuc = { id: 123 };
      jest.spyOn(chungThucFormService, 'getChungThuc').mockReturnValue({ id: null });
      jest.spyOn(chungThucService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chungThuc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chungThuc }));
      saveSubject.complete();

      // THEN
      expect(chungThucFormService.getChungThuc).toHaveBeenCalled();
      expect(chungThucService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChungThuc>>();
      const chungThuc = { id: 123 };
      jest.spyOn(chungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chungThucService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
