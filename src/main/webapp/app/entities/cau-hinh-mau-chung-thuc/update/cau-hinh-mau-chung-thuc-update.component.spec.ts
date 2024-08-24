import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CauHinhMauChungThucService } from '../service/cau-hinh-mau-chung-thuc.service';
import { ICauHinhMauChungThuc } from '../cau-hinh-mau-chung-thuc.model';
import { CauHinhMauChungThucFormService } from './cau-hinh-mau-chung-thuc-form.service';

import { CauHinhMauChungThucUpdateComponent } from './cau-hinh-mau-chung-thuc-update.component';

describe('CauHinhMauChungThuc Management Update Component', () => {
  let comp: CauHinhMauChungThucUpdateComponent;
  let fixture: ComponentFixture<CauHinhMauChungThucUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cauHinhMauChungThucFormService: CauHinhMauChungThucFormService;
  let cauHinhMauChungThucService: CauHinhMauChungThucService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhMauChungThucUpdateComponent],
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
      .overrideTemplate(CauHinhMauChungThucUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CauHinhMauChungThucUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cauHinhMauChungThucFormService = TestBed.inject(CauHinhMauChungThucFormService);
    cauHinhMauChungThucService = TestBed.inject(CauHinhMauChungThucService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cauHinhMauChungThuc: ICauHinhMauChungThuc = { id: 456 };

      activatedRoute.data = of({ cauHinhMauChungThuc });
      comp.ngOnInit();

      expect(comp.cauHinhMauChungThuc).toEqual(cauHinhMauChungThuc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhMauChungThuc>>();
      const cauHinhMauChungThuc = { id: 123 };
      jest.spyOn(cauHinhMauChungThucFormService, 'getCauHinhMauChungThuc').mockReturnValue(cauHinhMauChungThuc);
      jest.spyOn(cauHinhMauChungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhMauChungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhMauChungThuc }));
      saveSubject.complete();

      // THEN
      expect(cauHinhMauChungThucFormService.getCauHinhMauChungThuc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cauHinhMauChungThucService.update).toHaveBeenCalledWith(expect.objectContaining(cauHinhMauChungThuc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhMauChungThuc>>();
      const cauHinhMauChungThuc = { id: 123 };
      jest.spyOn(cauHinhMauChungThucFormService, 'getCauHinhMauChungThuc').mockReturnValue({ id: null });
      jest.spyOn(cauHinhMauChungThucService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhMauChungThuc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhMauChungThuc }));
      saveSubject.complete();

      // THEN
      expect(cauHinhMauChungThucFormService.getCauHinhMauChungThuc).toHaveBeenCalled();
      expect(cauHinhMauChungThucService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhMauChungThuc>>();
      const cauHinhMauChungThuc = { id: 123 };
      jest.spyOn(cauHinhMauChungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhMauChungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cauHinhMauChungThucService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
