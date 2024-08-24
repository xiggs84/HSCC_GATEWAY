import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DmDuongSuService } from '../service/dm-duong-su.service';
import { IDmDuongSu } from '../dm-duong-su.model';
import { DmDuongSuFormService } from './dm-duong-su-form.service';

import { DmDuongSuUpdateComponent } from './dm-duong-su-update.component';

describe('DmDuongSu Management Update Component', () => {
  let comp: DmDuongSuUpdateComponent;
  let fixture: ComponentFixture<DmDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmDuongSuFormService: DmDuongSuFormService;
  let dmDuongSuService: DmDuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmDuongSuUpdateComponent],
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
      .overrideTemplate(DmDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmDuongSuFormService = TestBed.inject(DmDuongSuFormService);
    dmDuongSuService = TestBed.inject(DmDuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dmDuongSu: IDmDuongSu = { id: 456 };

      activatedRoute.data = of({ dmDuongSu });
      comp.ngOnInit();

      expect(comp.dmDuongSu).toEqual(dmDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmDuongSu>>();
      const dmDuongSu = { id: 123 };
      jest.spyOn(dmDuongSuFormService, 'getDmDuongSu').mockReturnValue(dmDuongSu);
      jest.spyOn(dmDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmDuongSu }));
      saveSubject.complete();

      // THEN
      expect(dmDuongSuFormService.getDmDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(dmDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmDuongSu>>();
      const dmDuongSu = { id: 123 };
      jest.spyOn(dmDuongSuFormService, 'getDmDuongSu').mockReturnValue({ id: null });
      jest.spyOn(dmDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmDuongSu }));
      saveSubject.complete();

      // THEN
      expect(dmDuongSuFormService.getDmDuongSu).toHaveBeenCalled();
      expect(dmDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmDuongSu>>();
      const dmDuongSu = { id: 123 };
      jest.spyOn(dmDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmDuongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
