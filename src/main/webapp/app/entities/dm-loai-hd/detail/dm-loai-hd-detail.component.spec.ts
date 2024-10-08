import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DmLoaiHdDetailComponent } from './dm-loai-hd-detail.component';

describe('DmLoaiHd Management Detail Component', () => {
  let comp: DmLoaiHdDetailComponent;
  let fixture: ComponentFixture<DmLoaiHdDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmLoaiHdDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./dm-loai-hd-detail.component').then(m => m.DmLoaiHdDetailComponent),
              resolve: { dmLoaiHd: () => of({ idLoaiHd: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DmLoaiHdDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmLoaiHdDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dmLoaiHd on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DmLoaiHdDetailComponent);

      // THEN
      expect(instance.dmLoaiHd()).toEqual(expect.objectContaining({ idLoaiHd: 'ABC' }));
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
