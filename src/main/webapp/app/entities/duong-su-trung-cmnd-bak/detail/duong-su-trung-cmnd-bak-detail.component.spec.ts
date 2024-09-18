import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DuongSuTrungCmndBakDetailComponent } from './duong-su-trung-cmnd-bak-detail.component';

describe('DuongSuTrungCmndBak Management Detail Component', () => {
  let comp: DuongSuTrungCmndBakDetailComponent;
  let fixture: ComponentFixture<DuongSuTrungCmndBakDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuongSuTrungCmndBakDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./duong-su-trung-cmnd-bak-detail.component').then(m => m.DuongSuTrungCmndBakDetailComponent),
              resolve: { duongSuTrungCmndBak: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DuongSuTrungCmndBakDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuongSuTrungCmndBakDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load duongSuTrungCmndBak on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DuongSuTrungCmndBakDetailComponent);

      // THEN
      expect(instance.duongSuTrungCmndBak()).toEqual(expect.objectContaining({ id: 123 }));
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
