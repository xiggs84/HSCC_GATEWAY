import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { DmTaiSanService } from '../service/dm-tai-san.service';
import { IDmTaiSan } from '../dm-tai-san.model';
import { DmTaiSanFormService } from './dm-tai-san-form.service';

import { DmTaiSanUpdateComponent } from './dm-tai-san-update.component';

describe('DmTaiSan Management Update Component', () => {
  let comp: DmTaiSanUpdateComponent;
  let fixture: ComponentFixture<DmTaiSanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmTaiSanFormService: DmTaiSanFormService;
  let dmTaiSanService: DmTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmTaiSanUpdateComponent],
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
      .overrideTemplate(DmTaiSanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmTaiSanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmTaiSanFormService = TestBed.inject(DmTaiSanFormService);
    dmTaiSanService = TestBed.inject(DmTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dmTaiSan: IDmTaiSan = { idTaiSan: 456 };

      activatedRoute.data = of({ dmTaiSan });
      comp.ngOnInit();

      expect(comp.dmTaiSan).toEqual(dmTaiSan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmTaiSan>>();
      const dmTaiSan = { idTaiSan: 123 };
      jest.spyOn(dmTaiSanFormService, 'getDmTaiSan').mockReturnValue(dmTaiSan);
      jest.spyOn(dmTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmTaiSan }));
      saveSubject.complete();

      // THEN
      expect(dmTaiSanFormService.getDmTaiSan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmTaiSanService.update).toHaveBeenCalledWith(expect.objectContaining(dmTaiSan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmTaiSan>>();
      const dmTaiSan = { idTaiSan: 123 };
      jest.spyOn(dmTaiSanFormService, 'getDmTaiSan').mockReturnValue({ idTaiSan: null });
      jest.spyOn(dmTaiSanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmTaiSan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmTaiSan }));
      saveSubject.complete();

      // THEN
      expect(dmTaiSanFormService.getDmTaiSan).toHaveBeenCalled();
      expect(dmTaiSanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmTaiSan>>();
      const dmTaiSan = { idTaiSan: 123 };
      jest.spyOn(dmTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmTaiSanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
