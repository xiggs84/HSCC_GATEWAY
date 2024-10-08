import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SoCongChungTempDetailComponent } from './so-cong-chung-temp-detail.component';

describe('SoCongChungTemp Management Detail Component', () => {
  let comp: SoCongChungTempDetailComponent;
  let fixture: ComponentFixture<SoCongChungTempDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoCongChungTempDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./so-cong-chung-temp-detail.component').then(m => m.SoCongChungTempDetailComponent),
              resolve: { soCongChungTemp: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SoCongChungTempDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoCongChungTempDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load soCongChungTemp on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SoCongChungTempDetailComponent);

      // THEN
      expect(instance.soCongChungTemp()).toEqual(expect.objectContaining({ id: 123 }));
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
