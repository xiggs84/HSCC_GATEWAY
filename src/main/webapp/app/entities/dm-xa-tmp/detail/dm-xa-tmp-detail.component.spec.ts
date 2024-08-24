import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DmXaTmpDetailComponent } from './dm-xa-tmp-detail.component';

describe('DmXaTmp Management Detail Component', () => {
  let comp: DmXaTmpDetailComponent;
  let fixture: ComponentFixture<DmXaTmpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmXaTmpDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DmXaTmpDetailComponent,
              resolve: { dmXaTmp: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DmXaTmpDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmXaTmpDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dmXaTmp on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DmXaTmpDetailComponent);

      // THEN
      expect(instance.dmXaTmp()).toEqual(expect.objectContaining({ id: 123 }));
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
