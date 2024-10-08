import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CauHinhMauChungThucDetailComponent } from './cau-hinh-mau-chung-thuc-detail.component';

describe('CauHinhMauChungThuc Management Detail Component', () => {
  let comp: CauHinhMauChungThucDetailComponent;
  let fixture: ComponentFixture<CauHinhMauChungThucDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauHinhMauChungThucDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./cau-hinh-mau-chung-thuc-detail.component').then(m => m.CauHinhMauChungThucDetailComponent),
              resolve: { cauHinhMauChungThuc: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CauHinhMauChungThucDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhMauChungThucDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cauHinhMauChungThuc on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CauHinhMauChungThucDetailComponent);

      // THEN
      expect(instance.cauHinhMauChungThuc()).toEqual(expect.objectContaining({ id: 123 }));
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
