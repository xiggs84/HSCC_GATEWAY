import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DonViScanQrService } from '../service/don-vi-scan-qr.service';
import { IDonViScanQr } from '../don-vi-scan-qr.model';
import { DonViScanQrFormService } from './don-vi-scan-qr-form.service';

import { DonViScanQrUpdateComponent } from './don-vi-scan-qr-update.component';

describe('DonViScanQr Management Update Component', () => {
  let comp: DonViScanQrUpdateComponent;
  let fixture: ComponentFixture<DonViScanQrUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let donViScanQrFormService: DonViScanQrFormService;
  let donViScanQrService: DonViScanQrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DonViScanQrUpdateComponent],
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
      .overrideTemplate(DonViScanQrUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DonViScanQrUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    donViScanQrFormService = TestBed.inject(DonViScanQrFormService);
    donViScanQrService = TestBed.inject(DonViScanQrService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const donViScanQr: IDonViScanQr = { id: 456 };

      activatedRoute.data = of({ donViScanQr });
      comp.ngOnInit();

      expect(comp.donViScanQr).toEqual(donViScanQr);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDonViScanQr>>();
      const donViScanQr = { id: 123 };
      jest.spyOn(donViScanQrFormService, 'getDonViScanQr').mockReturnValue(donViScanQr);
      jest.spyOn(donViScanQrService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ donViScanQr });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: donViScanQr }));
      saveSubject.complete();

      // THEN
      expect(donViScanQrFormService.getDonViScanQr).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(donViScanQrService.update).toHaveBeenCalledWith(expect.objectContaining(donViScanQr));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDonViScanQr>>();
      const donViScanQr = { id: 123 };
      jest.spyOn(donViScanQrFormService, 'getDonViScanQr').mockReturnValue({ id: null });
      jest.spyOn(donViScanQrService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ donViScanQr: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: donViScanQr }));
      saveSubject.complete();

      // THEN
      expect(donViScanQrFormService.getDonViScanQr).toHaveBeenCalled();
      expect(donViScanQrService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDonViScanQr>>();
      const donViScanQr = { id: 123 };
      jest.spyOn(donViScanQrService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ donViScanQr });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(donViScanQrService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
