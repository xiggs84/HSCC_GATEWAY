import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CauHinhMauHopDongService } from '../service/cau-hinh-mau-hop-dong.service';
import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';
import { CauHinhMauHopDongFormService } from './cau-hinh-mau-hop-dong-form.service';

import { CauHinhMauHopDongUpdateComponent } from './cau-hinh-mau-hop-dong-update.component';

describe('CauHinhMauHopDong Management Update Component', () => {
  let comp: CauHinhMauHopDongUpdateComponent;
  let fixture: ComponentFixture<CauHinhMauHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cauHinhMauHopDongFormService: CauHinhMauHopDongFormService;
  let cauHinhMauHopDongService: CauHinhMauHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhMauHopDongUpdateComponent],
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
      .overrideTemplate(CauHinhMauHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CauHinhMauHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cauHinhMauHopDongFormService = TestBed.inject(CauHinhMauHopDongFormService);
    cauHinhMauHopDongService = TestBed.inject(CauHinhMauHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cauHinhMauHopDong: ICauHinhMauHopDong = { id: 456 };

      activatedRoute.data = of({ cauHinhMauHopDong });
      comp.ngOnInit();

      expect(comp.cauHinhMauHopDong).toEqual(cauHinhMauHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhMauHopDong>>();
      const cauHinhMauHopDong = { id: 123 };
      jest.spyOn(cauHinhMauHopDongFormService, 'getCauHinhMauHopDong').mockReturnValue(cauHinhMauHopDong);
      jest.spyOn(cauHinhMauHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhMauHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhMauHopDong }));
      saveSubject.complete();

      // THEN
      expect(cauHinhMauHopDongFormService.getCauHinhMauHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cauHinhMauHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(cauHinhMauHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhMauHopDong>>();
      const cauHinhMauHopDong = { id: 123 };
      jest.spyOn(cauHinhMauHopDongFormService, 'getCauHinhMauHopDong').mockReturnValue({ id: null });
      jest.spyOn(cauHinhMauHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhMauHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhMauHopDong }));
      saveSubject.complete();

      // THEN
      expect(cauHinhMauHopDongFormService.getCauHinhMauHopDong).toHaveBeenCalled();
      expect(cauHinhMauHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhMauHopDong>>();
      const cauHinhMauHopDong = { id: 123 };
      jest.spyOn(cauHinhMauHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhMauHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cauHinhMauHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
