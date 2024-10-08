import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ChungThucDetailComponent } from './chung-thuc-detail.component';

describe('ChungThuc Management Detail Component', () => {
  let comp: ChungThucDetailComponent;
  let fixture: ComponentFixture<ChungThucDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChungThucDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./chung-thuc-detail.component').then(m => m.ChungThucDetailComponent),
              resolve: { chungThuc: () => of({ idChungThuc: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ChungThucDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChungThucDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load chungThuc on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ChungThucDetailComponent);

      // THEN
      expect(instance.chungThuc()).toEqual(expect.objectContaining({ idChungThuc: 'ABC' }));
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
