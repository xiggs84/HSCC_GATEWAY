import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DmTinhTmpDetailComponent } from './dm-tinh-tmp-detail.component';

describe('DmTinhTmp Management Detail Component', () => {
  let comp: DmTinhTmpDetailComponent;
  let fixture: ComponentFixture<DmTinhTmpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmTinhTmpDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DmTinhTmpDetailComponent,
              resolve: { dmTinhTmp: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DmTinhTmpDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmTinhTmpDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dmTinhTmp on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DmTinhTmpDetailComponent);

      // THEN
      expect(instance.dmTinhTmp()).toEqual(expect.objectContaining({ id: 123 }));
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
