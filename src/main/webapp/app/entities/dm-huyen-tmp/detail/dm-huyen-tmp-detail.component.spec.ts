import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DmHuyenTmpDetailComponent } from './dm-huyen-tmp-detail.component';

describe('DmHuyenTmp Management Detail Component', () => {
  let comp: DmHuyenTmpDetailComponent;
  let fixture: ComponentFixture<DmHuyenTmpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmHuyenTmpDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DmHuyenTmpDetailComponent,
              resolve: { dmHuyenTmp: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DmHuyenTmpDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmHuyenTmpDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dmHuyenTmp on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DmHuyenTmpDetailComponent);

      // THEN
      expect(instance.dmHuyenTmp()).toEqual(expect.objectContaining({ id: 123 }));
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
