import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DmLoaiHdService } from '../service/dm-loai-hd.service';
import { IDmLoaiHd } from '../dm-loai-hd.model';
import { DmLoaiHdFormService } from './dm-loai-hd-form.service';

import { DmLoaiHdUpdateComponent } from './dm-loai-hd-update.component';

describe('DmLoaiHd Management Update Component', () => {
  let comp: DmLoaiHdUpdateComponent;
  let fixture: ComponentFixture<DmLoaiHdUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmLoaiHdFormService: DmLoaiHdFormService;
  let dmLoaiHdService: DmLoaiHdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmLoaiHdUpdateComponent],
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
      .overrideTemplate(DmLoaiHdUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmLoaiHdUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmLoaiHdFormService = TestBed.inject(DmLoaiHdFormService);
    dmLoaiHdService = TestBed.inject(DmLoaiHdService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dmLoaiHd: IDmLoaiHd = { id: 456 };

      activatedRoute.data = of({ dmLoaiHd });
      comp.ngOnInit();

      expect(comp.dmLoaiHd).toEqual(dmLoaiHd);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmLoaiHd>>();
      const dmLoaiHd = { id: 123 };
      jest.spyOn(dmLoaiHdFormService, 'getDmLoaiHd').mockReturnValue(dmLoaiHd);
      jest.spyOn(dmLoaiHdService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmLoaiHd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmLoaiHd }));
      saveSubject.complete();

      // THEN
      expect(dmLoaiHdFormService.getDmLoaiHd).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmLoaiHdService.update).toHaveBeenCalledWith(expect.objectContaining(dmLoaiHd));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmLoaiHd>>();
      const dmLoaiHd = { id: 123 };
      jest.spyOn(dmLoaiHdFormService, 'getDmLoaiHd').mockReturnValue({ id: null });
      jest.spyOn(dmLoaiHdService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmLoaiHd: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmLoaiHd }));
      saveSubject.complete();

      // THEN
      expect(dmLoaiHdFormService.getDmLoaiHd).toHaveBeenCalled();
      expect(dmLoaiHdService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmLoaiHd>>();
      const dmLoaiHd = { id: 123 };
      jest.spyOn(dmLoaiHdService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmLoaiHd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmLoaiHdService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
