import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DonViScanQrDetailComponent } from './don-vi-scan-qr-detail.component';

describe('DonViScanQr Management Detail Component', () => {
  let comp: DonViScanQrDetailComponent;
  let fixture: ComponentFixture<DonViScanQrDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonViScanQrDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DonViScanQrDetailComponent,
              resolve: { donViScanQr: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DonViScanQrDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonViScanQrDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load donViScanQr on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DonViScanQrDetailComponent);

      // THEN
      expect(instance.donViScanQr()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
