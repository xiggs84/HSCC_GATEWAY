import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DanhMucDonViDetailComponent } from './danh-muc-don-vi-detail.component';

describe('DanhMucDonVi Management Detail Component', () => {
  let comp: DanhMucDonViDetailComponent;
  let fixture: ComponentFixture<DanhMucDonViDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucDonViDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./danh-muc-don-vi-detail.component').then(m => m.DanhMucDonViDetailComponent),
              resolve: { danhMucDonVi: () => of({ idDonVi: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DanhMucDonViDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucDonViDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load danhMucDonVi on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DanhMucDonViDetailComponent);

      // THEN
      expect(instance.danhMucDonVi()).toEqual(expect.objectContaining({ idDonVi: 123 }));
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
